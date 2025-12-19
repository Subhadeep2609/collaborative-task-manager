import * as taskRepo from "../repositories/task.repository";
import { io } from "../server";
import { getUserSocket } from "../sockets";

/**
 * Create a new task
 */
export const createTaskService = async (userId: string, data: any) => {
  const task = await taskRepo.createTask({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    priority: data.priority,
    status: data.status,

    // 🔒 creator is always logged-in user
    creatorId: userId,

    // ✅ assignee comes EXACTLY from frontend
    assignedToId: data.assignedToId,
  });

  io.emit("taskCreated", task);
  return task;
};

/**
 * Get tasks visible to a user
 */
export const getTasksService = async (userId: string) => {
  return taskRepo.getTasksByUser(userId);
};

/**
 * Update task (status / reassignment)
 * 🔒 Only creator can reassign (repo enforces)
 */
export const updateTaskService = async (
  userId: string,
  taskId: string,
  data: any
) => {
  const task = await taskRepo.updateTask(taskId, userId, data);

  io.emit("taskUpdated", task);

  // 🔔 Notify new assignee (if reassigned)
  if (data.assignedToId && data.assignedToId !== userId) {
    const socketId = getUserSocket(data.assignedToId);
    if (socketId) {
      io.to(socketId).emit("taskAssigned", {
        taskId: task.id,
        message: `You have been assigned a task: ${task.title}`,
      });
    }
  }

  return task;
};

/**
 * Delete task (creator only)
 */
export const deleteTaskService = async (userId: string, taskId: string) => {
  const task = await taskRepo.deleteTask(taskId, userId);
  io.emit("taskDeleted", task.id);
  return task;
};

/**
 * Dashboard (creator OR assignee)
 */
export const getDashboardService = async (userId: string) => {
  return taskRepo.getDashboardTasks(userId);
};
