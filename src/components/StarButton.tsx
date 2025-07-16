import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";
import { useState } from "react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Single query to get both star status and count
  const starData = useQuery(api.snippets.getSnippetStarStatus, { snippetId });
  const toggleStar = useMutation(api.snippets.starSnippet);

  const handleClick = async () => {
    if (!isSignedIn || isLoading) return;
    setIsLoading(true);
    try {
      await toggleStar({ snippetId });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (starData === undefined) {
    return (
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-400"
        disabled
      >
        <Star className="w-4 h-4 fill-none" />
        <span className="text-xs">...</span>
      </button>
    );
  }

  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all
        ${
          starData.hasUserStarred
            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
            : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Star className={`w-4 h-4 ${starData.hasUserStarred ? "fill-yellow-500" : "fill-none"}`} />
      <span className={`text-xs font-medium ${starData.hasUserStarred ? "text-yellow-500" : "text-gray-400"}`}>
        {starData.starCount ?? 0}
      </span>
    </button>
  );
}

export default StarButton;