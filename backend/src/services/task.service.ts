import * as taskRepo from "../repositories/task.repository";
import { io } from "../server";
import { getUserSocket } from "../sockets";

export const createTaskService = async (creatorId: string, data: any) => {
  const task = await taskRepo.createTask({
    ...data,
    creatorId,
    dueDate: new Date(data.dueDate),
  });

  // Real-time update
  io.emit("taskCreated", task);

  return task;
};

export const getTasksService = async () => {
  return taskRepo.getAllTasks();
};

export const updateTaskService = async (id: string, data: any) => {
  const task = await taskRepo.updateTask(id, data);

  io.emit("taskUpdated", task);

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

export const deleteTaskService = async (id: string) => {
  const task = await taskRepo.deleteTask(id);
  io.emit("taskDeleted", task.id);
  return task;
};

export const getDashboardService = async (userId: string) => {
  return taskRepo.getDashboardTasks(userId);
};
