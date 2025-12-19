import { useEffect, useState } from "react";
import {
  Trash2,
  CalendarDays,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../context/auth.context";
import { getUsers } from "../api/user.api";
import CommentList from "./CommentList";

interface TaskCardProps {
  task: any;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onAssigneeChange?: (id: string, assignedToId: string) => void;
}

const priorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-100 text-red-700 border-red-200";
    case "HIGH":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-green-100 text-green-700 border-green-200";
  }
};

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
  onAssigneeChange,
}: TaskCardProps) {
  const { user } = useAuth();
  const isCreator = user?.id === task.creator?.id;

  const [users, setUsers] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);

  // Fetch users only if creator
  useEffect(() => {
    if (!isCreator) return;

    getUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, [isCreator]);

  return (
    <div className="group rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <CalendarDays size={14} />
        <span>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Assignee */}
      <div className="mt-4">
        <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
          <Users size={14} /> Assignee
        </label>

        {isCreator && onAssigneeChange ? (
          <select
            value={task.assignee?.id ?? ""}
            onChange={(e) =>
              onAssigneeChange(task.id, e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {users
              .filter((u) => u.id !== task.creator.id)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
          </select>
        ) : (
          <p className="text-sm font-medium text-gray-800">
            {task.assignee?.name ?? "Unassigned"}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value)
          }
          className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-1 text-red-500 opacity-0 group-hover:opacity-100 transition"
        >
          <Trash2 size={16} />
          <span className="text-sm">Delete</span>
        </button>
      </div>

      {/* Comments Toggle */}
      <button
        onClick={() => setShowComments((prev) => !prev)}
        className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:underline self-start"
      >
        <MessageSquare size={16} />
        {showComments ? "Hide comments" : "Show comments"}
        {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Comments */}
      {showComments && (
        <div className="mt-3 border-t border-gray-200 pt-3">
          <CommentList taskId={task.id} />
        </div>
      )}
    </div>
  );
}
