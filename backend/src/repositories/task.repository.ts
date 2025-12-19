import prisma from "../prisma/prismaClient";

/**
 * Create task with creator + assignee
 */
export const createTask = (data: any) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      priority: data.priority,
      status: data.status,

      creator: {
        connect: { id: data.creatorId },
      },

      assignee: {
        connect: { id: data.assignedToId },
      },
    },
  });
};

/**
 * Fetch tasks for logged-in user
 */
export const getTasksByUser = (userId: string) => {
  return prisma.task.findMany({
    where: { assignedToId: userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTask = (taskId: string, userId: string, data: any) => {
  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = (taskId: string, userId: string) => {
  return prisma.task.delete({
    where: { id: taskId },
  });
};

export const getDashboardTasks = (userId: string) => {
  return prisma.task.findMany({
    where: { assignedToId: userId },
    orderBy: { createdAt: "desc" },
  });
};
