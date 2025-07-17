"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess, mobile = false }: { hasAccess: boolean; mobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('right');
  const mounted = useMounted();
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

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
      const dropdownWidth = 180; // Width of mobile dropdown
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

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "cpp") return;
    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  if (mobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-2 rounded-lg bg-gray-700/50 hover:bg-blue-500/10 border ${currentLanguageObj.id === language ? "border-orange-400/50" : "border-gray-800"} transition-all duration-300`}
        >
          <div className="size-5">
            <Image
              src={currentLanguageObj.logoPath}
              alt="language"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </div>
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
                  ? Math.max(16, (buttonRef.current?.getBoundingClientRect().right || 0) - 180)
                  : Math.max(16, buttonRef.current?.getBoundingClientRect().left || 0),
                width: Math.min(180, window.innerWidth - 32), // Responsive width
                maxHeight: '280px',
                overflowY: 'auto',
              }}
            >
              {Object.values(LANGUAGE_CONFIG).map((lang) => {
                const isLocked = !hasAccess && lang.id !== "cpp";
                return (
                  <motion.button
                    key={lang.id}
                    onClick={() => handleLanguageSelect(lang.id)}
                    disabled={isLocked}
                    className={`relative w-full flex items-center gap-3 px-3 py-2.5 ${isLocked ? "opacity-50" : "hover:bg-[#262637]"} ${language === lang.id ? "bg-orange-500/10 text-yellow-400" : "text-gray-300"}`}
                  >
                    <div className="size-5 flex-shrink-0">
                      <Image
                        src={lang.logoPath}
                        alt="language"
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm truncate">{lang.label}</span>
                    {isLocked ? (
                      <Lock className="w-3 h-3 text-gray-500 flex-shrink-0" />
                    ) : (
                      language === lang.id && <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    )}
                  </motion.button>
                );
              })}
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
        className={`relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-blue-500/10 border border-gray-800 hover:border-orange-400/50 transition-all duration-300 shadow-lg overflow-hidden ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={currentLanguageObj.logoPath}
            alt="programming language logo"
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>
        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentLanguageObj.label}
        </span>
        <ChevronDownIcon className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300 ${isOpen ? "rotate-180" : ""}`} />
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
              maxWidth: 'calc(100vw - 32px)', // Prevent horizontal overflow
            }}
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Language</p>
            </div>
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden hidescroll">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                const isLocked = !hasAccess && lang.id !== "cpp";
                return (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group px-2"
                  >
                    <button
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${language === lang.id ? "bg-orange-500/10 text-yellow-400" : "text-gray-300"} ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}`}
                      onClick={() => handleLanguageSelect(lang.id)}
                      disabled={isLocked}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform flex-shrink-0 ${language === lang.id ? "bg-orange-500/10" : "bg-gray-800/50"}`}>
                        <Image
                          width={24}
                          height={24}
                          src={lang.logoPath}
                          alt={`${lang.label} logo`}
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>
                      <span className="flex-1 text-left group-hover:text-white transition-colors truncate">
                        {lang.label}
                      </span>
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      ) : (
                        language === lang.id && <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse flex-shrink-0" />
                      )}
                      {language === lang.id && (
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
export default LanguageSelector;