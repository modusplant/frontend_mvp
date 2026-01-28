"use client";

import { useState } from "react";
import { Comment } from "@/lib/types/comment";
import { useAuthStore } from "@/lib/store/authStore";
import { formatRelativeTime } from "@/lib/utils/formatTime";
import { Heart, MessageSquare, EllipsisVertical } from "lucide-react";
import { useCommentLike } from "@/lib/hooks/comment/useCommentLike";
import { useCommentMutations } from "@/lib/hooks/comment/useCommentMutations";
import CommentInput from "./commentInput";
import ProfileImage from "@/components/_common/profileImage";
import Dropdown from "@/components/_common/dropdown";

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onUpdate: () => void;
}

export default function CommentItem({
  comment,
  postId,
  onUpdate,
}: CommentItemProps) {
  const { user, isAuthenticated } = useAuthStore();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isMyComment = isAuthenticated && user?.nickname === comment.nickname;

  // 들여쓰기 계산 (depth * 32px)
  const indentClass = comment.depth ? `ml-${comment.depth * 8}` : "";

  // 좋아요 훅
  const { likeCount, isLiked, isLiking, handleLike } = useCommentLike({
    postId,
    commentPath: comment.path,
    initialLikeCount: comment.likeCount,
    initialIsLiked: comment.isLiked,
  });

  // 삭제 훅
  const { deleteComment, isDeleting } = useCommentMutations({
    postId,
    onSuccess: onUpdate,
  });

  const handleDelete = () => {
    deleteComment({ commentPath: comment.path });
  };

  return (
    <>
      {comment.isDeleted ? (
        // 삭제된 댓글
        <div className="text-neutral-60 py-4 text-sm">삭제된 댓글입니다</div>
      ) : (
        <div className="mt-6 flex gap-4">
          <div className="relative h-7.5 w-7.5">
            <ProfileImage imageSrc={comment.profileImagePath} />
          </div>

          <div className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-neutral-10 text-[17px] font-semibold">
                {comment.nickname}
              </span>

              {isMyComment && (
                <Dropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  trigger={
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
                      aria-label="댓글 옵션"
                    >
                      <EllipsisVertical className="text-neutral-60 h-4 w-4" />
                    </button>
                  }
                  items={[
                    {
                      label: "삭제",
                      onClick: handleDelete,
                      disabled: isDeleting,
                    },
                  ]}
                  position="right"
                  width="w-24"
                />
              )}
            </div>

            {/* 댓글 내용 */}
            <p className="text-neutral-20 mb-2 text-[16px] leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>

            {/* 액션 버튼 */}
            <div className="text-neutral-60 flex items-center gap-4 text-sm">
              <span>{formatRelativeTime(comment.createdAt)}</span>
              <button
                onClick={handleLike}
                disabled={isLiking}
                className="group flex cursor-pointer gap-1"
              >
                <Heart
                  className={`h-4 w-4 transition-all ${
                    isLiked ? "" : "group-hover:fill-neutral-90"
                  }`}
                  color={isLiked ? "red" : "#919191"}
                  fill={isLiked ? "red" : "none"}
                />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-neutral-60 hover:text-primary-50 flex items-center gap-1 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                답글 쓰기
              </button>
            </div>

            {/* 답글 작성 입력창 */}
            {showReplyForm && (
              <div className="mt-4">
                <CommentInput
                  postId={postId}
                  parentPath={comment.path}
                  siblingCount={comment.children?.length || 0}
                  onSuccess={() => {
                    setShowReplyForm(false);
                    onUpdate();
                  }}
                  onCancel={() => setShowReplyForm(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 답글 렌더링 (재귀) */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-4 ml-14 space-y-4">
          {comment.children.map((childComment) => (
            <CommentItem
              key={childComment.path}
              comment={childComment}
              postId={postId}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </>
  );
}
