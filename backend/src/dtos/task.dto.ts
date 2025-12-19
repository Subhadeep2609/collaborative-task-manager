import { z } from "zod";

export const createTaskDto = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),

  // 🔥 THIS WAS MISSING
  assignedToId: z.string().uuid().optional(),
});

export const updateTaskDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),

  // 🔥 ALSO REQUIRED HERE
  assignedToId: z.string().uuid().optional(),
});
