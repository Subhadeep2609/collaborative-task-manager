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

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const { logout } = useAuth();
  const navigate = useNavigate();

  /* ---------------- Fetch Tasks ---------------- */
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- Create ---------------- */
  const handleCreate = async (data: any) => {
    try {
      await createTask(data);
      toast.success("Task created successfully");
      setShowModal(false);
      fetchTasks();
    } catch {
      toast.error("Failed to create task");
    }
  };

  /* ---------------- Status Change ---------------- */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTaskStatus(id, status);
      toast.success("Status updated");
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ---------------- Assignee Change ---------------- */
  const handleAssigneeChange = async (
    id: string,
    assignedToId: string
  ) => {
    try {
      await updateTask(id, { assignedToId });
      toast.success("Assignee updated");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to update assignee");
      console.error(err);
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
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

/* ---------------- Small UI Helper ---------------- */
function Stat({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className={`rounded-2xl bg-${color}-100/70 p-5 shadow`}>
      <p className="text-sm">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
