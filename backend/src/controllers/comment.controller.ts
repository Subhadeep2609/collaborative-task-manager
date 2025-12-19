import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import { AuthRequest } from "../middleware/auth.middleware";
import { io } from "../server";

export const addComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const { taskId } = req.params;

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

  // 🔥 REALTIME EVENT
  io.to(`task-${taskId}`).emit("comment:new", comment);

  res.status(201).json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const comments = await prisma.comment.findMany({
    where: { taskId },
    include: {
      user: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  res.json(comments);
};
