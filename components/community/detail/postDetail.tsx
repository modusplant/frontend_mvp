"use client";

import PostContent from "./postContent";
import PostActions from "./postActions";
import CommentSection from "../../comment/commentSection";
import PostDetailHeader from "./postDetailHeader";
import { Heart, Bookmark } from "lucide-react";
import { usePostInteraction } from "@/lib/hooks/community/usePostInteraction";
import usePostDetailQuery from "@/lib/hooks/community/usePostDetailQuery";
interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: postQuery, isLoading, error } = usePostDetailQuery({ postId });

  const {
    likeCount,
    isLiked,
    isLiking,
    handleLike,
    isBookmarked,
    isBookmarking,
    handleBookmark,
  } = usePostInteraction({
    postId,
    initialLikeCount: postQuery?.likeCount,
    initialIsLiked: postQuery?.isLiked,
    initialIsBookmarked: postQuery?.isBookmarked,
  });

  if (isLoading) {
    return <div className="mx-auto max-w-[1320px] px-5 py-12">로딩 중...</div>;
  }

  if (error || !postQuery) {
    return (
      <div className="mx-auto max-w-[1320px] px-5 py-12">
        게시글을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12">
      {/* 헤더: 카테고리 + 작성자 정보 */}
      <PostDetailHeader
        secondaryCategory={postQuery.secondaryCategory}
        title={postQuery.title}
        nickname={postQuery.nickname}
        publishedAt={postQuery.publishedAt}
        viewCount={postQuery.viewCount}
        isUpdated={postQuery.publishedAt !== postQuery.updatedAt}
      />

      {/* 본문 */}
      <PostContent content={postQuery.content} />

      {/* 액션 버튼 */}
      <div className="mt-12 flex items-center justify-between pt-6">
        <div className="text-neutral-60 flex w-full items-center justify-between gap-6 text-lg">
          {/* 좋아요 */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="group flex cursor-pointer gap-1.5"
          >
            <Heart
              className={`h-6 w-6 transition-all ${isLiked ? "" : "group-hover:fill-neutral-90"}`}
              color={isLiked ? "red" : "#919191"}
              fill={isLiked ? "red" : "none"}
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>
          {/* 북마크 */}
          <button
            onClick={handleBookmark}
            disabled={isBookmarking}
            className="group flex cursor-pointer gap-1.5"
          >
            <Bookmark
              className={`h-6 w-6 transition-all ${isBookmarked ? "" : "group-hover:fill-neutral-90"}`}
              fill={isBookmarked ? "#3a972e" : "none"}
              color={isBookmarked ? "#3a972e" : "#919191"}
            />
          </button>
        </div>

        {/* 수정/삭제 버튼 (작성자만) */}
        <PostActions postId={postId} authorId={postQuery.authorId} />
      </div>

      {/* 댓글 섹션 */}
      <CommentSection postId={postId} />
    </div>
  );
}
