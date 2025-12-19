import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../api/task.api";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
    await createTask(data);
    setShowModal(false);
    fetchTasks();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateTaskStatus(id, status);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

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

          <button
            onClick={() => setShowModal(true)}
            className="w-fit rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition"
          >
            + New Task
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-600">
            Loading tasks...
          </div>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-14 text-center backdrop-blur-xl">
            <p className="text-xl font-semibold text-gray-800">
              No tasks created yet
            </p>
            <p className="mt-2 text-gray-500">
              Click <span className="font-semibold">+ New Task</span> to get started 🚀
            </p>
          </div>
        )}

        {/* Task Grid */}
        {!loading && tasks.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
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
