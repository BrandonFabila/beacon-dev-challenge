export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-9 w-40 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-36 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-9 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 sm:max-w-xs" />
        <div className="h-10 w-44 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-10 w-44 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl border border-gray-200 bg-white"
          >
            <div className="aspect-square animate-pulse rounded-t-xl bg-gray-200" />
            <div className="p-4">
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="mb-3 h-3 w-1/3 animate-pulse rounded bg-gray-200" />
              <div className="mb-3 h-5 w-28 animate-pulse rounded-full bg-gray-200" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
