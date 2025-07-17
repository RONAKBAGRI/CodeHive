"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector({ mobile = false }: { mobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('right');
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate dropdown position to prevent overflow
  useEffect(() => {
    if (isOpen && buttonRef.current && mobile) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 200; // Width of mobile dropdown
      const viewportWidth = window.innerWidth;
      const padding = 16; // Safe padding from edges
      
      const spaceOnRight = viewportWidth - buttonRect.right - padding;
      const spaceOnLeft = buttonRect.left - padding;
      
      // If there's not enough space on the right, position it to the left
      // But also check if there's enough space on the left
      if (spaceOnRight < dropdownWidth && spaceOnLeft >= dropdownWidth) {
        setDropdownPosition('left');
      } else {
        setDropdownPosition('right');
      }
    }
  }, [isOpen, mobile]);

  if (!mounted) return null;

  if (mobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-2 rounded-lg bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 hover:border-orange-400/50 transition-all duration-300"
        >
          <Palette className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed bg-[#2e261e]/90 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
              style={{
                top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 'auto',
                left: dropdownPosition === 'right' 
                  ? Math.max(16, (buttonRef.current?.getBoundingClientRect().right || 0) - 200)
                  : Math.max(16, buttonRef.current?.getBoundingClientRect().left || 0),
                width: Math.min(200, window.innerWidth - 32), // Responsive width
                maxHeight: '280px',
                overflowY: 'auto',
              }}
            >
              {THEMES.map((t) => (
                <motion.button
                  key={t.id}
                  className={`
                    relative w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#513e28] transition-all
                    ${theme === t.id ? "bg-orange-500/10 text-yellow-400" : "text-gray-300"}
                  `}
                  onClick={() => setTheme(t.id)}
                >
                  <div className={`size-6 rounded-md ${theme === t.id ? "bg-orange-500/10" : "bg-gray-800/50"}`}>
                    {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                  </div>
                  <span className="text-sm">{t.label}</span>
                  <div className="size-3 rounded-full border border-gray-600" style={{ background: t.color }} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 hover:border-orange-400/50 transition-all duration-300 shadow-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
        <span className="text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentTheme?.label}
        </span>
        <div className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors" style={{ background: currentTheme?.color }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#2e261e]/90 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
            style={{
              maxWidth: 'calc(100vw - 32px)', // Prevent overflow
            }}
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">Select Theme</p>
            </div>
            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#513e28] transition-all duration-200 ${theme === t.id ? "bg-orange-500/10 text-yellow-400" : "text-gray-300"}`}
                onClick={() => setTheme(t.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <div className={`flex items-center justify-center size-8 rounded-lg ${theme === t.id ? "bg-orange-500/10 text-yellow-400" : "bg-gray-800/50 text-gray-400"} group-hover:scale-110 transition-all duration-200`}>
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>
                <span className="flex-1 text-left group-hover:text-white transition-colors">
                  {t.label}
                </span>
                <div className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors" style={{ background: t.color }} />
                {theme === t.id && (
                  <motion.div className="absolute inset-0 border-2 border-orange-500/30 rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSelector;