"use client";

import { useRouter } from "next/navigation";
import { PostDetail as PostDetailType } from "@/lib/types/post";
import PostContent from "./postContent";
import PostActions from "./postActions";
import PostInteractions from "./postInteractions";
import CommentSection from "../comment/commentSection";
import { formatRelativeTime } from "@/lib/utils/formatTime";
import {
  primaryCategoryLabels,
  secondaryCategoryLabels,
} from "@/lib/constants/categories";
import { MessageCircle, Eye } from "lucide-react";

interface PostDetailProps {
  postId: string;
  initialData: PostDetailType;
}

export default function PostDetail({ postId, initialData }: PostDetailProps) {
  const router = useRouter();

  const getCategoryLabel = (
    category: string,
    type: "primary" | "secondary"
  ) => {
    if (type === "primary") {
      return primaryCategoryLabels[category] || category;
    }
    return secondaryCategoryLabels[category] || category;
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12">
      {/* 헤더: 카테고리 + 작성자 정보 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-primary-10 text-primary-50 rounded-full px-4 py-1.5 text-sm font-semibold">
            {getCategoryLabel(initialData.primaryCategory, "primary")} &gt;{" "}
            {getCategoryLabel(initialData.secondaryCategory, "secondary")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-20 text-sm font-medium">
            {initialData.authorNickname}
          </span>
          <span className="text-neutral-60 text-sm">
            {formatRelativeTime(initialData.createdAt)}
          </span>
        </div>
      </div>

      {/* 제목 */}
      <h1 className="font-nanum text-neutral-0 mb-8 text-[44px] leading-tight font-bold">
        {initialData.title}
      </h1>

      {/* 본문 */}
      <PostContent content={initialData.content} />

      {/* 통계 + 액션 버튼 */}
      <div className="border-surface-stroke mt-12 flex items-center justify-between border-t pt-6">
        {/* 통계 */}
        <div className="text-neutral-60 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            <span>{initialData.viewCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span>{initialData.commentCount.toLocaleString()}</span>
          </div>
        </div>

        {/* 수정/삭제 버튼 (작성자만) */}
        <PostActions postId={postId} authorUuid={initialData.authorUuid} />
      </div>

      {/* 좋아요 + 북마크 */}
      <div className="mt-6 flex justify-center">
        <PostInteractions
          postId={postId}
          initialLikeCount={initialData.likeCount}
          initialBookmarkCount={initialData.bookmarkCount}
          initialIsLiked={initialData.isLiked}
          initialIsBookmarked={initialData.isBookmarked}
        />
      </div>

      {/* 댓글 섹션 */}
      <CommentSection postId={postId} />
    </div>
  );
}
