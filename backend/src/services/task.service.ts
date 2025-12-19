import * as taskRepo from "../repositories/task.repository";
import { io } from "../server";

export const createTaskService = async (
  creatorId: string,
  data: any
) => {
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
    io.emit("taskAssigned", {
      taskId: task.id,
      assignedToId: data.assignedToId,
    });
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
