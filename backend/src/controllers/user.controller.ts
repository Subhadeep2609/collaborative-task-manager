import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(users);
};