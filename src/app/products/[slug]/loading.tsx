export default function ProductDetailLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />

        <div className="flex flex-col gap-4">
          <div>
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="mt-1 h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
