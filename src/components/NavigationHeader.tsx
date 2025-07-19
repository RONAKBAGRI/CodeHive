"use client";

import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="relative z-50 mx-auto p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0 bg-[#0a0a0f]/80 backdrop-blur-xl p-4 lg:p-6 mb-4 border border-gray-800/50 rounded-lg">
        {/* Logo and Snippets */}
        <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-normal">
          <Link
            href="/"
            className="flex items-center gap-3 group relative transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
          >
            <img
              src="/logo3.png"
              alt="logo"
              className="w-8 h-8 lg:w-10 lg:h-10 transition-all duration-300"
            />
            <div className="flex flex-col transition-all duration-300">
              <span className="block text-base lg:text-lg font-semibold text-white transition-all duration-300 group-hover:font-extrabold">
                CodeHive
              </span>
              <span className="block text-xs text-orange-400/60 font-medium transition-all duration-300 group-hover:font-semibold">
                Real-time Code Editor
              </span>
            </div>
          </Link>

          {/* Desktop Snippets Button */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 hover:border-orange-400/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </nav>
        </div>

        {/* Mobile Snippets Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Link
            href="/snippets"
            className="relative group flex items-center gap-2 px-3 py-1 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 hover:border-orange-400/50 transition-all duration-300 shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
            <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors sm:hidden">
              Snippets
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto justify-between lg:justify-normal">
          <SignedOut>
            <Link
              href="/pricing"
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="hidden lg:inline text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          </SignedOut>

          <div className="pl-2 lg:pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
