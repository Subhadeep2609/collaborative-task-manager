import { useState } from "react";

export default function CreateTaskModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (data: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  const submit = () => {
    onCreate({
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Create Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border rounded px-3 py-2"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded px-3 py-2"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded px-2 py-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-2"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
