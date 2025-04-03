export function Loading({ className = "" }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`animate-spin rounded-full h-8 w-8 border-b-2 border-primary ${className}`}
      ></div>
    </div>
  );
}
