import { z } from "zod";

/**
 * Create Task DTO
 * - Frontend sends only title & description
 * - Backend injects assignedToId
 * - Defaults handled by Prisma / backend
 */
export const createTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),

  // Optional fields (can be added later)
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z
    .enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"])
    .optional(),
});

/**
 * Update Task DTO
 * - Partial update allowed
 */
export const updateTaskDto = createTaskDto.partial();
