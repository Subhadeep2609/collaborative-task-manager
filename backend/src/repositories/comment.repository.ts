import prisma from "../prisma/prismaClient";

export const createComment = (data: {
  content: string;
  taskId: string;
  userId: string;
}) => {
  return prisma.comment.create({
    data,
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
  });
};

export const getCommentsByTask = (taskId: string) => {
  return prisma.comment.findMany({
    where: { taskId },
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};
