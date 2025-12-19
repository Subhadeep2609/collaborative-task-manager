import { Trash2, CalendarDays, MessageSquare } from "lucide-react";
import { useState } from "react";
import CommentList from "./CommentList";

interface TaskCardProps {
  task: any;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const priorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-green-100 text-green-700";
  }
};

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="group relative rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {task.description}
      </p>

      {/* Meta */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
        <CalendarDays size={14} />
        <span>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <div className="flex items-center gap-4">
          {/* Toggle Comments */}
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition text-sm"
          >
            <MessageSquare size={16} />
            {showComments ? "Hide" : "Comments"}
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1 text-red-500 opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2 size={16} />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-5 border-t border-gray-200 pt-4">
          <CommentList taskId={task.id} />
        </div>
      )}
    </div>
  );
}
