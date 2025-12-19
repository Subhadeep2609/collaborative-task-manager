import prisma from "../prisma/prismaClient";

/**
 * Create task with creator + optional assignee
 */
export const createTask = (data: any) => {
  const {
    creatorId,
    assignedToId,
    title,
    description,
    dueDate,
    priority,
    status,
  } = data;

  // ✅ validate assignee properly
  const hasValidAssignee =
    typeof assignedToId === "string" &&
    assignedToId.length > 0 &&
    assignedToId !== creatorId;

  return prisma.task.create({
    data: {
      title,
      description,
      dueDate: dueDate ?? new Date(),
      priority,
      status,

      // creator is ALWAYS logged-in user
      creator: {
        connect: { id: creatorId },
      },

      // assignee ONLY if explicitly selected
      ...(hasValidAssignee
        ? {
            assignee: {
              connect: { id: assignedToId },
            },
          }
        : {}),
    },
    include: {
      creator: true,
      assignee: true,
    },
  });
};

/**
 * Tasks visible to user
 */
export const getTasksByUser = (userId: string) => {
  return prisma.task.findMany({
    where: {
      OR: [{ creatorId: userId }, { assignedToId: userId }],
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
    orderBy: { dueDate: "asc" },
  });
};

/**
 * Dashboard tasks
 */
export const getDashboardTasks = (userId: string) => {
  return prisma.task.findMany({
    where: {
      OR: [{ creatorId: userId }, { assignedToId: userId }],
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
    orderBy: { dueDate: "asc" },
  });
};

/**
 * Update task (creator OR assignee)
 */
export const updateTask = (taskId: string, userId: string, data: any) => {
  return prisma.task.update({
    where: {
      id: taskId,
      OR: [{ creatorId: userId }, { assignedToId: userId }],
    },
    data,
  });
};

/**
 * Delete task (creator only)
 */
export const deleteTask = (taskId: string, userId: string) => {
  return prisma.task.delete({
    where: {
      id: taskId,
      creatorId: userId,
    },
  });
};
