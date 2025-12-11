"use client";

import { useState } from "react";
import { useRecentPostsQuery } from "@/lib/hooks/mypage/useRecentPostsQuery";
import RecentPostItem from "./recentPostItem";
import EmptyRecentPosts from "./emptyRecentPosts";
import Pagination from "./pagination";
import { dummyPosts } from "@/lib/data/posts";

/**
 * 최근에 본 게시글 리스트 섹션
 * - 게시글 목록을 리스트 형태로 표시
 * - 8개씩 한 페이지로 표시
 * - 페이지네이션 지원
 * - 빈 상태 처리
 */
export default function RecentPostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useRecentPostsQuery(currentPage, 8);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-neutral-60">로딩 중...</div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-neutral-60">게시글을 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  // 더미 데이터 사용 (개발용)
  // const data = {
  //   posts: dummyPosts,
  //   totalPages: 10,
  // };

  // 데이터 없음
  if (!data || data.posts.length === 0) {
    return <EmptyRecentPosts />;
  }

  return (
    <div className="flex flex-col gap-7.5">
      {/* 게시글 목록 */}
      <div className="flex flex-col gap-6">
        {data.posts.map((post, index) => (
          <div key={post.postId}>
            <RecentPostItem post={post} />
            {/* 구분선 (마지막 아이템 제외) */}
            {index < data.posts.length - 1 && (
              <div className="mt-6 h-px bg-[#EFEFEF]" />
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {data.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
