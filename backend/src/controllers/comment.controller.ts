import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as commentService from "../services/comment.service";

export const addComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const { taskId } = req.params;

  if (!content) {
    return res.status(400).json({ message: "Comment content required" });
  }

  const comment = await commentService.addCommentService(
    taskId,
    req.userId!,
    content
  );

  res.status(201).json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const comments = await commentService.getCommentsService(taskId);
  res.json(comments);
};
