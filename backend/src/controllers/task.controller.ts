import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createTaskDto, updateTaskDto } from "../dtos/task.dto";
import * as taskService from "../services/task.service";

/**
 * Create task
 */
export const createTask = async (
  req: AuthRequest<{}, {}, any>,
  res: Response
) => {
  const data = createTaskDto.parse(req.body);

  const task = await taskService.createTaskService(req.userId!, data);

  res.status(201).json(task);
};

/**
 * Get all tasks for user
 */
export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  const tasks = await taskService.getTasksService(req.userId!);
  res.json(tasks);
};

/**
 * Update task (status / assignee)
 */
export const updateTask = async (
  req: AuthRequest<{ id: string }, {}, any>,
  res: Response
) => {
  const data = updateTaskDto.parse(req.body);

  const task = await taskService.updateTaskService(
    req.userId!,
    req.params.id,
    data
  );

  res.json(task);
};

/**
 * Delete task
 */
export const deleteTask = async (
  req: AuthRequest<{ id: string }>,
  res: Response
) => {
  await taskService.deleteTaskService(req.userId!, req.params.id);
  res.status(204).send();
};

/**
 * Dashboard (creator OR assignee)
 */
export const dashboard = async (
  req: AuthRequest,
  res: Response
) => {
  const data = await taskService.getDashboardService(req.userId!);
  res.json(data);
};
