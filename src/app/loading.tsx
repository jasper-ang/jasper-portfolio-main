export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        {/* Main loading spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Loading</span>
          <span className="loading loading-dots loading-sm"></span>
        </div>
      </div>
    </div>
  );
}
