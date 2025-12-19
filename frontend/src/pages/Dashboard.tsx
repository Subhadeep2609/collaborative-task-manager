import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../api/task.api";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { Search, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

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

  const fetchTasks = async () => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTaskStatus(id, status);
      toast.success("Task updated");
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  // 🔥 Filtered tasks
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

  // 📊 Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;
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
            <h1 className="text-4xl font-bold text-gray-900">
              My Tasks
            </h1>
            <p className="mt-1 text-gray-600">
              Manage, track and complete your work efficiently
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition"
            >
              + New Task
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl p-5 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-green-100/70 backdrop-blur-xl p-5 shadow hover:shadow-lg transition">
            <p className="text-sm text-green-700">Completed</p>
            <p className="mt-1 text-3xl font-bold text-green-800">
              {completedTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-100/70 backdrop-blur-xl p-5 shadow hover:shadow-lg transition">
            <p className="text-sm text-yellow-700">In Progress</p>
            <p className="mt-1 text-3xl font-bold text-yellow-800">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-blue-100/70 backdrop-blur-xl p-5 shadow hover:shadow-lg transition">
            <p className="text-sm text-blue-700">Pending</p>
            <p className="mt-1 text-3xl font-bold text-blue-800">
              {pendingTasks}
            </p>
          </div>
        </div>

        {/* 🔍 Filters Bar */}
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
              className="w-full rounded-xl border border-gray-300 bg-white px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="text-center text-gray-600">
            Loading tasks...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTasks.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-14 text-center backdrop-blur-xl">
            <p className="text-xl font-semibold text-gray-800">
              No matching tasks
            </p>
            <p className="mt-2 text-gray-500">
              Try adjusting your filters 🔍
            </p>
          </div>
        )}

        {/* Task Grid */}
        {!loading && filteredTasks.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
