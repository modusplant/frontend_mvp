"use client";

import { useState } from "react";
import useMyCommentsQuery from "@/lib/hooks/mypage/useMyCommentsQuery";
import MyCommentItem from "@/components/mypage/comments/myCommentItem";
import EmptyMyComments from "@/components/mypage/comments/emptyMyComments";
import Pagination from "@/components/mypage/common/pagination";
import { useAuthStore } from "@/lib/store/authStore";

export default function MyCommentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();
  const { data, isLoading, error } = useMyCommentsQuery(
    currentPage,
    8,
    user?.id
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-body-regular-16 text-neutral-60">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-body-regular-16 text-system-alert">
          댓글 목록을 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  const commentList = data?.commentList || [];
  const totalPages = data?.totalPages || 0;

  // 빈 상태
  if (commentList.length === 0) {
    return <EmptyMyComments />;
  }

  return (
    <div className="space-y-6">
      {/* 댓글 목록 */}
      <div className="space-y-4">
        {commentList.map((comment, index) => (
          <MyCommentItem key={`${comment.postId}-${index}`} comment={comment} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
