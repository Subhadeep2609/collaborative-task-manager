import { api } from "./axios";

/**
 * Get all tasks for dashboard
 */
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

/**
 * Create a task
 */
export const createTask = async (data: {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  assignedToId?: string;
}) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

/**
 * Update ONLY task status (used by status dropdown)
 */
export const updateTaskStatus = async (
  id: string,
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"
) => {
  const res = await api.put(`/tasks/${id}`, { status });
  return res.data;
};

/**
 * ✅ Update task (assignee / status / future fields)
 * Used when changing assignee
 */
export const updateTask = async (
  id: string,
  data: {
    status?: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
    assignedToId?: string;
    priority?: string;
    dueDate?: string;
  }
) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

/**
 * Delete task
 */
export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
