import prisma from "../prisma/prismaClient";

/**
 * Create task assigned to a user
 */
export const createTask = (data: any) => {
  return prisma.task.create({
    data,
  });
};

/**
 * Get tasks only for logged-in user
 */
export const getTasksByUser = (userId: string) => {
  return prisma.task.findMany({
    where: {
      assignedToId: userId,
    },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Update task ONLY if it belongs to user
 */
export const updateTask = (
  taskId: string,
  userId: string,
  data: any
) => {
  return prisma.task.updateMany({
    where: {
      id: taskId,
      assignedToId: userId,
    },
    data,
  });
};

/**
 * Delete task ONLY if it belongs to user
 */
export const deleteTask = (taskId: string, userId: string) => {
  return prisma.task.deleteMany({
    where: {
      id: taskId,
      assignedToId: userId,
    },
  });
};

/**
 * Dashboard summary tasks
 */
export const getDashboardTasks = (userId: string) => {
  return prisma.task.findMany({
    where: {
      assignedToId: userId,
    },
    orderBy: { createdAt: "desc" },
  });
};
