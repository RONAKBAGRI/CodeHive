"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, {
    snippetId: snippetId as Id<"snippets">,
  });

  const comments = useQuery(api.snippets.getComments, {
    snippetId: snippetId as Id<"snippets">,
  });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-800 to-gray-600 text-white">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side: Header + Comments */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Header / Description */}
            <div className="bg-[#1f1f1f]/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-5">
                  <div className="size-14 sm:size-16 flex items-center justify-center rounded-xl bg-white/10 p-2">
                    <img
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                      {snippet.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mt-2 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>{snippet.userName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(snippet._creationTime).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>{comments?.length} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="bg-white/10 text-sm px-4 py-1.5 rounded-lg text-gray-300 font-medium">
                  {snippet.language}
                </span>
              </div>
            </div>

            {/* Comments / Discussion */}
            <Comments snippetId={snippet._id} />
          </div>

          {/* Right Side: Code Editor */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-white/10 bg-[#2c2c2c]/80 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#1e1e1e]/60">
              <div className="flex items-center gap-2 text-gray-400">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Source Code</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <Editor
              height="700px"
              language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
              value={snippet.code}
              theme="vs-dark"
              beforeMount={defineMonacoThemes}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                readOnly: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default SnippetDetailPage;
