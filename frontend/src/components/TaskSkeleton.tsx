export default function TaskSkeleton() {
  return (
    <div className="rounded-2xl bg-white/70 p-5 shadow animate-pulse space-y-4">
      <div className="h-5 w-2/3 rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-5/6 rounded bg-gray-200" />

      <div className="flex items-center justify-between pt-2">
        <div className="h-8 w-24 rounded bg-gray-200" />
        <div className="h-5 w-12 rounded bg-gray-200" />
      </div>
    </div>
  );
}
