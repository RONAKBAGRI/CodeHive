const CardSkeleton = () => (
  <div className="relative group">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-[#313244]/50 hover:border-[#313244] transition-all duration-300 overflow-hidden h-[280px]">
      <div className="p-6 space-y-4">
        {/* Header shimmer */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#44403c] animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-5 bg-[#44403c] rounded-lg animate-pulse" />
              <div className="w-20 h-4 bg-[#44403c] rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="w-10 h-10 bg-[#44403c] rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-[#44403c] rounded-lg animate-pulse" />
          <div className="w-1/2 h-5 bg-[#44403c] rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2 bg-[#1e1e1e]/40 rounded-lg p-4">
          <div className="w-full h-4 bg-[#44403c] rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-[#44403c] rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-[#44403c] rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-800 to-gray-600">
      {/* Ambient warm background glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute top-[20%] -right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="w-56 h-8 bg-[#5c3a20] rounded-full mx-auto animate-pulse" />
          <div className="w-[28rem] h-12 bg-[#5c3a20] rounded-xl mx-auto animate-pulse" />
          <div className="w-72 h-6 bg-[#5c3a20] rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Search & Filter Bar Skeleton */}
        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search */}
          <div className="relative">
            <div className="w-full h-14 bg-[#422812]/80 rounded-xl border border-[#6c4f32] animate-pulse" />
          </div>

          {/* Language filter chips */}
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-[#5c3a20] rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Grid of Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
