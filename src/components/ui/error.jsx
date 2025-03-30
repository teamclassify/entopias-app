export function Error({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <p className="text-red-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
