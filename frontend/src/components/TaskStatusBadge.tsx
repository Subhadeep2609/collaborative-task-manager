export default function TaskStatusBadge({ status }: { status: string }) {
  const color =
    status === "TODO"
      ? "bg-gray-200 text-gray-700"
      : status === "IN_PROGRESS"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800";

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
      {status.replace("_", " ")}
    </span>
  );
}
