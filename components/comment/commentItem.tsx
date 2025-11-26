"use client";

import { useState } from "react";
import { Comment } from "@/lib/types";
import { commentApi } from "@/lib/api/comment";
import { useAuthStore } from "@/lib/store/authStore";
import { formatRelativeTime } from "@/lib/utils/formatTime";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import CommentForm from "./commentForm";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [isLiking, setIsLiking] = useState(false);

  const isMyComment = isAuthenticated && user?.nickname === comment.nickname;

  // 들여쓰기 계산 (depth * 32px)
  const indentClass = comment.depth ? `ml-${comment.depth * 8}` : "";

  const handleDelete = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await commentApi.deleteComment(postId, comment.path);
      onUpdate();
    } catch (error) {
      window.alert("댓글 삭제에 실패했습니다.");
      setIsDeleting(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !user) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    setIsLiking(true);

    try {
      if (isLiked) {
        // 좋아요 취소
        await commentApi.unlikeComment(user.id, postId, comment.path);
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        // 좋아요
        await commentApi.likeComment(user.id, postId, comment.path);
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("댓글 좋아요 처리 실패:", error);
      window.alert("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className={`${indentClass} border-l-2 border-transparent pl-4`}>
      {comment.isDeleted ? (
        // 삭제된 댓글
        <div className="text-neutral-60 py-4 text-sm">삭제된 댓글입니다</div>
      ) : (
        <div className="bg-surface-99 rounded-lg p-4">
          {/* 작성자 정보 */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-neutral-20 font-medium">
                {comment.nickname}
              </span>
              <span className="text-neutral-60 text-sm">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>

            {isMyComment && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-neutral-60 hover:text-system-alert flex items-center gap-1 text-sm transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                삭제
              </button>
            )}
          </div>

          {/* 댓글 내용 */}
          <p className="text-neutral-20 mb-3 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1.5 transition-colors disabled:opacity-50 ${
                isLiked
                  ? "text-primary-50"
                  : "text-neutral-60 hover:text-primary-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                strokeWidth={2}
              />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-neutral-60 hover:text-primary-50 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              답글
            </button>
          </div>

          {/* 답글 작성 폼 */}
          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
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
      )}

      {/* 답글 렌더링 (재귀) */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-4 space-y-4">
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
    </div>
  );
}
