"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun, ChevronDownIcon } from "lucide-react";
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

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  if (mobile) {
    return (
      <div className="relative isolate" ref={dropdownRef}>
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
              {THEMES.map((t) => {
                const isSelected = theme === t.id;
                
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeSelect(t.id)}
                    className={`
                      relative w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-200
                      ${isSelected 
                        ? "bg-orange-500/10 text-yellow-400" 
                        : "text-gray-300"
                      }
                      hover:bg-[#513e28] hover:text-white cursor-pointer
                    `}
                  >
                    <div className="size-5 flex-shrink-0">
                      {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                    </div>
                    <span className="text-sm truncate">{t.label}</span>
                    <div className="size-3 rounded-full border border-gray-600 flex-shrink-0" style={{ background: t.color }} />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative isolate" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 
          bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 
          hover:border-orange-400/50 transition-all duration-300 shadow-lg
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-400/10 before:to-red-500/10 
          before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity
        "
      >
        <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors relative" />
        <span className="relative text-gray-200 min-w-[80px] text-left hover:text-white transition-colors">
          {currentTheme?.label}
        </span>
        <div className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors" style={{ background: currentTheme?.color }} />
        <ChevronDownIcon className={`
          relative size-4 text-gray-400 transition-all duration-300 hover:text-gray-300
          ${isOpen ? "rotate-180" : ""}
        `} />
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
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Theme</p>
            </div>
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden hidescroll">
              {THEMES.map((t, index) => {
                const isSelected = theme === t.id;
                
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative px-2"
                  >
                    <button
                      className={`
                        relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                        transition-all duration-200 group
                        ${isSelected 
                          ? "bg-orange-500/10 text-yellow-400" 
                          : "text-gray-300"
                        }
                        hover:bg-[#513e28] hover:text-white cursor-pointer
                        ${!isSelected 
                          ? "hover:before:opacity-100" 
                          : ""
                        }
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-orange-400/10 before:to-red-500/10 before:rounded-lg 
                        before:opacity-0 before:transition-opacity
                      `}
                      onClick={() => handleThemeSelect(t.id)}
                    >
                      <div className={`
                        relative size-8 rounded-lg p-1.5 transition-all duration-200 flex-shrink-0
                        ${isSelected 
                          ? "bg-orange-500/10" 
                          : "bg-gray-800/50"
                        }
                        group-hover:scale-110
                      `}>
                        <div className="w-full h-full object-contain relative z-10 flex items-center justify-center">
                          {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                        </div>
                      </div>
                      <span className="flex-1 text-left transition-colors truncate relative z-10">
                        {t.label}
                      </span>
                      <div className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors flex-shrink-0 z-10" style={{ background: t.color }} />
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 border-2 border-orange-500/30 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSelector;