"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * 최근에 본 게시글이 없을 때 표시되는 빈 상태 컴포넌트
 */
export default function EmptyRecentPosts() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-[60px]">
      {/* 캐릭터 이미지 */}
      <div className="relative h-[100px] w-[100px]">
        <Image
          src="/character.svg"
          alt="최근 본 게시글 없음"
          fill
          className="object-contain"
        />
      </div>

      {/* 안내 문구 */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-neutral-10 text-base leading-[1.19] font-semibold tracking-[-0.02em]">
          최근 본 식물 기록이 없어요!
        </h3>
        <p className="text-neutral-40 text-center text-[15px] leading-normal font-normal tracking-[-0.02em]">
          초록빛 가득한 이야기들을 탐색하고
          <br />
          나만의 식물 아카이브를 채워보세요.
        </p>
      </div>

      {/* 둘러보기 버튼 */}
      <Link
        href="/"
        className="border-surface-stroke text-neutral-20 flex h-12 items-center justify-center gap-[9px] rounded-[31px] border px-6 py-4 text-base leading-[1.2] font-medium tracking-[-0.03em]"
      >
        둘러보기
      </Link>
    </div>
  );
}
