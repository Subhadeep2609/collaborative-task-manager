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

    // 🔒 Always creator = logged-in user
    creatorId: userId,

    // ✅ Assignee logic (explicit)
    assignedToId: data.assignedToId
      ? data.assignedToId
      : userId, // default → self
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
 * Update task (status / assignment)
 */
export const updateTaskService = async (
  userId: string,
  taskId: string,
  data: any
) => {
  const task = await taskRepo.updateTask(taskId, userId, {
    ...data,
    assignedToId: data.assignedToId ?? undefined,
  });

  io.emit("taskUpdated", task);

  // 🔔 Notify newly assigned user
  if (data.assignedToId && data.assignedToId !== userId) {
    const socketId = getUserSocket(data.assignedToId);
    if (socketId) {
      io.to(socketId).emit("taskAssigned", {
        taskId: task.id,
        message: "A new task has been assigned to you",
      });
    }
  }

  return task;
};

/**
 * Delete task
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
