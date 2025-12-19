import { api } from "./axios";

export const getTaskComments = async (taskId: string) => {
  const res = await api.get(`/comments/task/${taskId}`);
  return res.data;
};

export const addComment = async (
  taskId: string,
  content: string
) => {
  const res = await api.post(`/comments/task/${taskId}`, { content });
  return res.data;
};
