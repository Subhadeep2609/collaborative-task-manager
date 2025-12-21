import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createTaskDto, updateTaskDto } from "../dtos/task.dto";
import * as taskService from "../services/task.service";

/**
 * Create task
 */
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const data = createTaskDto.parse(req.body);

  const task = await taskService.createTaskService(req.userId!, data);
  res.status(201).json(task);
};

/**
 * Get tasks for logged-in user
 */
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  const tasks = await taskService.getTasksService(req.userId!);
  res.json(tasks);
};

/**
 * Update task (status / assignee)
 */
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const data = updateTaskDto.parse(req.body);
  const taskId = req.params.id as string;

  const task = await taskService.updateTaskService(
    req.userId!,
    taskId,
    data
  );

  res.json(task);
};

/**
 * Delete task
 */
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const taskId = req.params.id as string;

  await taskService.deleteTaskService(req.userId!, taskId);
  res.status(204).send();
};

/**
 * Dashboard tasks (creator OR assignee)
 */
export const dashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await taskService.getDashboardService(req.userId!);
  res.json(data);
};