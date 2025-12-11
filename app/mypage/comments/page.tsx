"use client";

import MyCommentList from "@/components/mypage/comments/myCommentList";

export default function MyCommentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-heading2 text-neutral-20">내 댓글</h1>
      <MyCommentList />
    </div>
  );
}
