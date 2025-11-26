"use client";

import { useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import { postApi } from "@/lib/api/post";
import { useAuthStore } from "@/lib/store/authStore";

interface PostInteractionsProps {
  postId: string;
  initialLikeCount: number;
  initialBookmarkCount: number;
  initialIsLiked?: boolean;
  initialIsBookmarked?: boolean;
}

export default function PostInteractions({
  postId,
  initialLikeCount,
  initialBookmarkCount,
  initialIsLiked = false,
  initialIsBookmarked = false,
}: PostInteractionsProps) {
  const { user, isAuthenticated } = useAuthStore();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarkCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated || !user) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    setIsLiking(true);

    try {
      if (isLiked) {
        // 좋아요 취소
        await postApi.unlikePost(user.id, postId);
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        // 좋아요
        await postApi.likePost(user.id, postId);
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      window.alert("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated || !user) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    setIsBookmarking(true);

    try {
      if (isBookmarked) {
        // 북마크 취소
        await postApi.unbookmarkPost(user.id, postId);
        setBookmarkCount((prev) => prev - 1);
        setIsBookmarked(false);
      } else {
        // 북마크
        await postApi.bookmarkPost(user.id, postId);
        setBookmarkCount((prev) => prev + 1);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("북마크 처리 실패:", error);
      window.alert("북마크 처리에 실패했습니다.");
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* 좋아요 버튼 */}
      <button
        onClick={handleLike}
        disabled={isLiking}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
          isLiked
            ? "border-primary-50 bg-primary-10 text-primary-50"
            : "border-neutral-90 text-neutral-60 hover:border-primary-50 hover:text-primary-50"
        }`}
      >
        <Heart
          className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
          strokeWidth={2}
        />
        <span>{likeCount.toLocaleString()}</span>
      </button>

      {/* 북마크 버튼 */}
      <button
        onClick={handleBookmark}
        disabled={isBookmarking}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
          isBookmarked
            ? "border-primary-50 bg-primary-10 text-primary-50"
            : "border-neutral-90 text-neutral-60 hover:border-primary-50 hover:text-primary-50"
        }`}
      >
        <Bookmark
          className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
          strokeWidth={2}
        />
        <span>{bookmarkCount.toLocaleString()}</span>
      </button>
    </div>
  );
}
