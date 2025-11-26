"use client";

import { useState, useEffect } from "react";
import { commentApi } from "@/lib/api/comment";
import { useAuthStore } from "@/lib/store/authStore";
import { generateCommentPath } from "@/lib/utils/parseComments";

interface CommentFormProps {
  postId: string;
  parentPath?: string | null; // 답글인 경우 부모 path
  onSuccess: () => void;
  onCancel?: () => void;
  currentCommentCount?: number; // 현재 댓글 개수 (최상위 댓글용)
  siblingCount?: number; // 형제 댓글 개수 (답글용)
}

export default function CommentForm({
  postId,
  parentPath = null,
  onSuccess,
  onCancel,
  currentCommentCount = 0,
  siblingCount = 0,
}: CommentFormProps) {
  const { isAuthenticated } = useAuthStore();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 페이지 이탈 경고
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (content.trim().length > 0) {
        e.preventDefault();
        e.returnValue = ""; // Chrome에서 필요
        window.alert("작성 중인 댓글이 있습니다. 페이지를 떠나시겠습니까?");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    if (content.trim().length === 0) {
      window.alert("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // path 생성: 최상위 댓글이면 현재 댓글 개수 사용, 답글이면 형제 개수 사용
      const path = parentPath
        ? generateCommentPath(parentPath, siblingCount)
        : currentCommentCount.toString();

      await commentApi.createComment({
        postId,
        path,
        content: content.trim(),
      });

      setContent("");
      onSuccess();

      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      window.alert("댓글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-surface-99 text-neutral-60 rounded-lg p-6 text-center">
        댓글을 작성하려면{" "}
        <a
          href="/login"
          className="text-primary-50 font-medium hover:underline"
        >
          로그인
        </a>
        해주세요.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          parentPath ? "답글을 작성해주세요..." : "댓글을 작성해주세요..."
        }
        className="border-neutral-90 font-pretendard text-neutral-20 placeholder:text-neutral-60 focus:border-primary-50 w-full resize-none rounded-lg border px-4 py-3 text-base leading-relaxed focus:outline-none"
        rows={4}
        disabled={isSubmitting}
      />

      <div className="mt-3 flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border-neutral-90 text-neutral-60 hover:bg-surface-98 rounded-lg border px-6 py-2 text-sm font-medium transition-colors"
          >
            취소
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting || content.trim().length === 0}
          className="bg-primary-50 hover:bg-primary-70 rounded-lg px-6 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "작성 중..." : parentPath ? "답글 작성" : "댓글 작성"}
        </button>
      </div>
    </form>
  );
}
