import prisma from "../prisma/prismaClient";

export const createTask = (data: any) => {
  return prisma.task.create({ data });
};

export const getAllTasks = () => {
  return prisma.task.findMany({
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
    orderBy: { dueDate: "asc" },
  });
};

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

export const updateTask = (id: string, data: any) => {
  return prisma.task.update({ where: { id }, data });
};

export const deleteTask = (id: string) => {
  return prisma.task.delete({ where: { id } });
};

export const getDashboardTasks = (userId: string) => {
  const now = new Date();

  return prisma.task.findMany({
    where: {
      OR: [
        { assignedToId: userId },
        { creatorId: userId },
        { dueDate: { lt: now }, status: { not: "COMPLETED" } },
      ],
    },
    orderBy: { dueDate: "asc" },
  });
};
