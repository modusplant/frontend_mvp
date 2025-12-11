"use client";

import RecentPostList from "@/components/mypage/recent/recentPostList";

/**
 * 최근에 본 글 페이지
 * - 마이페이지 > 내 활동 > 최근에 본 글
 * - 최근 7일간 본 게시글 목록 표시
 * - 8개씩 한 페이지로 표시 (페이지네이션)
 */
export default function RecentPostsPage() {
  return (
    <div className="border-surface-98 flex flex-col gap-[30px] rounded-xl border bg-white p-10">
      {/* 페이지 제목 */}
      <h1 className="text-neutral-5 text-xl leading-[1.2] font-bold tracking-[-0.01em]">
        최근에 본 글
      </h1>

      {/* 게시글 리스트 */}
      <RecentPostList />
    </div>
  );
}
