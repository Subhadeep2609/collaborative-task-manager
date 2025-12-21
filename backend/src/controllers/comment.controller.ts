import { Response } from "express";
import prisma from "../prisma/prismaClient";
import { AuthRequest } from "../middleware/auth.middleware";
import { io } from "../server";

/**
 * Add comment to a task
 */
export const addComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body as { content: string };
  const { taskId } = req.params as { taskId: string };

  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
      userId: req.userId!,
    },
    include: {
      user: { select: { id: true, name: true } },
    },
  });

  // 🔥 realtime update
  io.to(`task-${taskId}`).emit("comment:new", comment);

  res.status(201).json(comment);
};

/**
 * Get comments of a task
 */
export const getComments = async (req: AuthRequest, res: Response) => {
  const { taskId } = req.params as { taskId: string };

  const comments = await prisma.comment.findMany({
    where: { taskId },
    include: {
      user: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  res.json(comments);
};
