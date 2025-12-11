import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { MyComment } from "@/lib/types/comment";
import { formatDate } from "@/lib/utils/formatTime";

interface MyCommentItemProps {
  comment: MyComment;
}

export default function MyCommentItem({ comment }: MyCommentItemProps) {
  const { content, createdAt, postTitle, postId, totalCommentsInPost } =
    comment;

  return (
    <Link
      href={`/community/${postId}`}
      className="border-surface-stroke hover:bg-surface-99 block rounded-[10px] border bg-neutral-100 p-5 transition-colors"
    >
      <div className="space-y-3">
        {/* 댓글 내용 */}
        <p className="text-body-regular-16 text-neutral-20 line-clamp-2">
          {content}
        </p>

        {/* 게시글 제목 */}
        <div className="text-body-regular-14 text-neutral-60 flex items-center gap-2">
          <span>게시글:</span>
          <span className="text-neutral-20 truncate font-semibold">
            {postTitle}
          </span>
        </div>

        {/* 하단 메타 정보 */}
        <div className="flex items-center justify-between">
          <span className="text-body-regular-14 text-neutral-60">
            {formatDate(createdAt)}
          </span>

          <div className="text-body-regular-14 text-neutral-60 flex items-center gap-1">
            <MessageSquare size={16} />
            <span>{totalCommentsInPost}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
