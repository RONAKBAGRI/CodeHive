import { create } from "zustand";
import * as monaco from "monaco-editor";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "cpp",
      fontSize: 16,
      theme: "vs-dark",
      input: "",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "cpp";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || "16";
  const savedInput = localStorage.getItem("editor-input") || "";

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
    input: savedInput,
  };
};

interface CodeEditorState {
  language: string;
  theme: string;
  fontSize: number;
  editor: monaco.editor.IStandaloneCodeEditor | null;
  output: string;
  isRunning: boolean;
  error: string | null;
  input: string;
  executionResult: { 
    code: string; 
    output: string; 
    error: string | null;
    input: string;
  } | null;

  getCode: () => string;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  setLanguage: (language: string) => void;
  setInput: (input: string) => void;
  runCode: () => Promise<void>;
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    setInput: (input: string) => {
      localStorage.setItem("editor-input", input);
      set({ input });
    },

    runCode: async () => {
      const { language, getCode, input } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const apiUrl = `${process.env.NEXT_PUBLIC_PISTON_API_BASE_URL}/execute`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
            stdin: input, // Added input support
          }),
        });

        const data = await response.json();

        if (data.message) {
          set({ 
            error: data.message, 
            executionResult: { 
              code, 
              output: "", 
              error: data.message,
              input 
            } 
          });
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          const compileError = data.compile.stderr || data.compile.output;
          set({
            error: compileError,
            executionResult: { 
              code, 
              output: "", 
              error: compileError,
              input 
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const runError = data.run.stderr || data.run.output;
          set({
            error: runError,
            executionResult: { 
              code, 
              output: "", 
              error: runError,
              input 
            },
          });
          return;
        }

        const output = data.run.output;
        set({
          output: output.trim(),
          error: null,
          executionResult: { 
            code, 
            output: output.trim(), 
            error: null,
            input 
          },
        });
      } catch {
        set({
          error: "Error running code",
          executionResult: { 
            code, 
            output: "", 
            error: "Error running code",
            input 
          },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;