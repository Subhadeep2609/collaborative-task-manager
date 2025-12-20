import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../api/task.api";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { Search, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import TaskSkeleton from "../components/TaskSkeleton";
import { connectSocket, disconnectSocket, getSocket } from "../lib/socket";
import { useRef } from "react";


export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const { user } = useAuth();
  const authUserRef = useRef<string | null>(null);

  useEffect(() => {
    authUserRef.current = user?.id ?? null;
  }, [user]);

  /* ---------------- Initial Fetch ---------------- */
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Socket Setup (Order 6) ---------------- */
  useEffect(() => {
    fetchTasks();

    const socket = connectSocket();

    // ✅ Task created
    socket.on("taskCreated", (task) => {
      setTasks((prev) => {
        const userId = authUserRef.current;

        // ✅ show ONLY if user is creator or assignee
        if (task.creatorId !== userId && task.assignedToId !== userId) {
          return prev;
        }

        // prevent duplicates
        if (prev.some((t) => t.id === task.id)) {
          return prev;
        }

        return [task, ...prev];
      });
    });

    // ✅ Task updated
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) => {
        const userId = authUserRef.current;

        const isRelevant =
          updatedTask.creatorId === userId ||
          updatedTask.assignedToId === userId;

        // ❌ remove task if no longer relevant
        if (!isRelevant) {
          return prev.filter((t) => t.id !== updatedTask.id);
        }

        // ✅ update if exists
        if (prev.some((t) => t.id === updatedTask.id)) {
          return prev.map((t) => (t.id === updatedTask.id ? updatedTask : t));
        }

        // ✅ insert if newly assigned
        return [updatedTask, ...prev];
      });
    });

    // ✅ Task deleted
    socket.on("taskDeleted", (taskId: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      disconnectSocket();
    };
  }, []);

  /* ---------------- Create ---------------- */
  const handleCreate = async (data: any) => {
    try {
      await createTask(data);
      toast.success("Task created successfully");
      setShowModal(false);
      // 🔥 no fetch — socket will handle
    } catch {
      toast.error("Failed to create task");
    }
  };

  /* ---------------- Status Change ---------------- */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTaskStatus(id, status);
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ---------------- Assignee Change ---------------- */
  const handleAssigneeChange = async (id: string, assignedToId: string) => {
    try {
      await updateTask(id, { assignedToId });
      toast.success("Assignee updated");
    } catch {
      toast.error("Failed to update assignee");
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  /* ---------------- Logout ---------------- */
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  /* ---------------- Filtering ---------------- */
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  /* ---------------- Stats ---------------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const pendingTasks = tasks.filter(
    (t) => t.status === "TODO" || t.status === "REVIEW"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Tasks</h1>
            <p className="mt-1 text-gray-600">
              Manage, track and complete your work efficiently
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition"
            >
              + New Task
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Total Tasks" value={totalTasks} />
          <Stat label="Completed" value={completedTasks} color="green" />
          <Stat label="In Progress" value={inProgressTasks} color="yellow" />
          <Stat label="Pending" value={pendingTasks} color="blue" />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white/60 p-4 backdrop-blur-xl shadow sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border px-10 py-2.5 text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border px-4 py-2.5 text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border px-4 py-2.5 text-sm"
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <TaskSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredTasks.length === 0 && (
          <div className="rounded-3xl border border-dashed bg-white/60 p-14 text-center">
            <p className="text-xl font-semibold">No matching tasks</p>
          </div>
        )}

        {/* Tasks */}
        {!loading && filteredTasks.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onAssigneeChange={handleAssigneeChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

/* ---------------- Stat Card ---------------- */
function Stat({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colors: any = {
    gray: "bg-gray-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
  };

  return (
    <div className={`rounded-2xl ${colors[color]} p-5 shadow`}>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
