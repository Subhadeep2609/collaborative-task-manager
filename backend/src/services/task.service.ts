import * as taskRepo from "../repositories/task.repository";
import { io } from "../server";
import { getUserSocket } from "../sockets";

export const createTaskService = async (userId: string, data: any) => {
  const task = await taskRepo.createTask({
    ...data,
    assignedToId: userId, // ✅ correct FK
  });

  // Real-time update (safe broadcast)
  io.emit("taskCreated", task);

  return task;
};

export const getTasksService = async (userId: string) => {
  return taskRepo.getTasksByUser(userId);
};

export const updateTaskService = async (
  userId: string,
  taskId: string,
  data: any
) => {
  const task = await taskRepo.updateTask(taskId, userId, data);

  io.emit("taskUpdated", task);

  // Notify newly assigned user (if reassigned)
  if (data.assignedToId) {
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

export const deleteTaskService = async (userId: string, taskId: string) => {
  const task = await taskRepo.deleteTask(taskId, userId);

  io.emit("taskDeleted", task.id);

  return task;
};

export const getDashboardService = async (userId: string) => {
  return taskRepo.getDashboardTasks(userId);
};
