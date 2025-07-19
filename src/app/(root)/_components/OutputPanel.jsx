"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning, input, setInput } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [isInputCopied, setIsInputCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleInputCopy = async () => {
    if (!input) return;
    await navigator.clipboard.writeText(input);
    setIsInputCopied(true);
    setTimeout(() => setIsInputCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-4">
      <div className="relative bg-[#252018] rounded-xl p-4 ring-1 ring-gray-800/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#2e271e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-300">Input</span>
          </div>
          {input && (
            <button
              onClick={handleInputCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#2e271e] 
              rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
            >
              {isInputCopied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full bg-[#2e261e]/50 backdrop-blur-sm border border-[#313244] 
          rounded-xl p-4 h-32 font-mono text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
          placeholder="Enter input for your program..."
          spellCheck={false}
        />
      </div>

      <div className="relative bg-[#252018] rounded-xl p-4 ring-1 ring-gray-800/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#2e271e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-300">Output</span>
          </div>

          {hasContent && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#2e271e] 
              rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>

        <div className="relative">
          <div
            className="relative bg-[#2e261e]/50 backdrop-blur-sm border border-[#313244] 
            rounded-xl p-4 h-[410px] overflow-auto font-mono text-sm"
          >
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Execution Successful</span>
                </div>
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-center">Run your code to see the output here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;