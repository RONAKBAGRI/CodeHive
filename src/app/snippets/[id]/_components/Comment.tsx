import { Trash2Icon, UserIcon } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import CommentContent from "./CommentContent";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  isDeleting: boolean;
  currentUserId?: string;
}

function Comment({ comment, currentUserId, isDeleting, onDelete }: CommentProps) {
  return (
    <div className="group">
      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all">
        <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2d2d2d] flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-[#a0a0a0]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[#f1f1f1] font-medium truncate">{comment.userName}</span>
              <span className="block text-sm text-[#a0a0a0]">
                {new Date(comment._creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          {comment.userId === currentUserId && (
            <button
              onClick={() => onDelete(comment._id)}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
              title="Delete comment"
            >
              <Trash2Icon className="w-4 h-4 text-red-400" />
            </button>
          )}
        </div>

        <CommentContent content={comment.content} />
      </div>
    </div>
  );
}

export default Comment;
