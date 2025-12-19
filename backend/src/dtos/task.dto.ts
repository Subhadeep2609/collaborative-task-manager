import { z } from "zod";

export const createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string(),
  dueDate: z.string().datetime(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),
  assignedToId: z.string(),
});

export const updateTaskDto = createTaskDto.partial();
