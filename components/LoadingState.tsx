'use client';

interface LoadingStateProps {
  count?: number;
  message?: string;
}

export function LoadingState({ count = 3, message }: LoadingStateProps) {
  return (
    <div className="space-y-6">
      {message && <p className="text-center text-gray-400">{message}</p>}
      <div className="grid gap-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="card !p-4 border-gray-800 overflow-hidden animate-pulse">
            <div className="flex flex-col h-full space-y-2">
              <div className="flex justify-between items-center mb-2">
                <div className="h-6 bg-gray-700 rounded w-3/5" />
                <div className="h-4 bg-gray-700 rounded-full w-16" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
              </div>
              <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-800">
                <div className="flex space-x-3">
                  <div className="h-3 w-14 bg-gray-700 rounded-full" />
                  <div className="h-3 w-14 bg-gray-700 rounded-full" />
                </div>
                <div className="h-3 w-12 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
