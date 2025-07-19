function ProfileHeaderSkeleton() {
  return (
    <div className="relative mb-8 bg-gray-700/50 rounded-2xl p-8 border border-gray-800/50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />

      {/* Profile Section */}
      <div className="relative flex items-center gap-8">
        {/* Profile Image Skeleton */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="w-24 h-24 rounded-full border-4 border-gray-800/50 bg-gray-800/80 animate-pulse relative z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-full z-20 animate-pulse shadow-lg" />
        </div>

        {/* User Info Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-800/80 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800/80 rounded-full animate-pulse" />
            <div className="h-5 w-40 bg-gray-800/80 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden p-6 border border-gray-800/50"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${
              i === 1 ? "from-purple-800 to-blue-500" :
              i === 2 ? "from-yellow-500 to-gray-700" :
              "from-purple-500 to-pink-500"
            } opacity-10`} />

            <div className="relative space-y-4">
              {/* Top part */}
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-800/80 rounded animate-pulse" />
                  <div className="h-8 w-16 bg-gray-800/80 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-800/80 rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-xl animate-pulse" style={{
                  backgroundColor: i === 1 ? '#3b82f6' : i === 2 ? '#facc15' : '#a855f7',
                  opacity: 0.3,
                }} />
              </div>

              {/* Metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800/50">
                <div className="w-4 h-4 bg-gray-800/80 rounded-full animate-pulse" />
                <div className="h-4 w-16 bg-gray-800/80 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-800/80 rounded animate-pulse" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeaderSkeleton;
