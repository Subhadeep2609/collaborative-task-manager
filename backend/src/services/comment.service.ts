import * as commentRepo from "../repositories/comment.repository";

export const addCommentService = async (
  taskId: string,
  userId: string,
  content: string
) => {
  return commentRepo.createComment({
    taskId,
    userId,
    content,
  });
};

export const getCommentsService = async (taskId: string) => {
  return commentRepo.getCommentsByTask(taskId);
};
