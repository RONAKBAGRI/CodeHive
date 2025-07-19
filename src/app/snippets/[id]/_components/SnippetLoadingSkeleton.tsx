"use client";

import NavigationHeader from "@/components/NavigationHeader";

function SnippetLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-800 to-gray-600 text-white">
      <NavigationHeader />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side: Description + Comments */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Skeleton Header / Description */}
            <div className="bg-[#433725] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-14 sm:size-16 rounded-xl bg-[#ffffff08] animate-pulse" />
                  <div>
                    <div className="h-8 w-48 bg-[#ffffff08] rounded-lg animate-pulse mb-2" />
                    <div className="flex gap-4">
                      <div className="h-5 w-24 bg-[#ffffff08] rounded animate-pulse" />
                      <div className="h-5 w-24 bg-[#ffffff08] rounded animate-pulse" />
                      <div className="h-5 w-24 bg-[#ffffff08] rounded animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-[#ffffff08] rounded animate-pulse" />
              </div>
            </div>

            {/* Skeleton Comments */}
            <div className="bg-[#433725] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="h-6 w-32 bg-[#ffffff08] rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#ffffff08] animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-[#ffffff08] rounded animate-pulse" />
                      <div className="h-16 bg-[#ffffff08] rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Code Editor */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#382f1b] shadow-lg backdrop-blur animate-pulse">
            <div className="h-12 bg-[#1e1e1e]/60 border-b border-white/10 px-6" />
            <div className="h-[700px] bg-[#2c2c2c]/80" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default SnippetLoadingSkeleton;
