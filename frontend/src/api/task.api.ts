import { api } from "./axios";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
  const res = await api.patch(`/tasks/${id}`, { status });
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
