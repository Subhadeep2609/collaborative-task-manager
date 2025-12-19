import { useEffect, useState } from "react";
import { getTaskComments, addComment } from "../api/comment.api";
import toast from "react-hot-toast";

interface Props {
  taskId: string;
}

export default function CommentList({ taskId }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const data = await getTaskComments(taskId);
      setComments(data);
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAdd = async () => {
    if (!content.trim()) return;

    try {
      const newComment = await addComment(taskId, content);
      setComments((prev) => [...prev, newComment]);
      setContent("");
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">Comments</h4>

      {loading ? (
        <p className="text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet</p>
      ) : (
        <div className="space-y-2">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl bg-gray-50 px-3 py-2 text-sm"
            >
              <p className="text-gray-800">{c.content}</p>
              <p className="mt-1 text-xs text-gray-500">
                — {c.user.name},{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment */}
      <div className="flex gap-2 pt-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
