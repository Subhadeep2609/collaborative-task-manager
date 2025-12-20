import { useEffect, useState } from "react";
import {  connectSocket } from "../lib/socket";
import { getTaskComments, addComment } from "../api/comment.api";
import toast from "react-hot-toast";

export default function CommentList({ taskId }: { taskId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const socket = connectSocket();

    // join room
    socket.emit("join-task", taskId);

    // initial fetch
    getTaskComments(taskId).then(setComments);

    // realtime listener
    socket.on("comment:new", (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socket.emit("leave-task", taskId);
      socket.off("comment:new");
    };
  }, [taskId]);

  const handleAdd = async () => {
    if (!text.trim()) return;

    try {
      await addComment(taskId, text);
      setText("");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold">Comments</h4>

      {comments.length === 0 && (
        <p className="text-xs text-gray-500">No comments yet</p>
      )}

      {comments.map((c) => (
        <div key={c.id} className="rounded-lg bg-gray-100 p-2 text-sm">
          <span className="font-semibold">{c.user.name}:</span>{" "}
          {c.content}
        </div>
      ))}

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-md border px-3 py-1 text-sm"
        />
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
