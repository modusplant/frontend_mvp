"use client";

import { useState, useMemo } from "react";
import { dummyPosts } from "@/lib/data/posts";
import PostCard from "@/components/home/postCard";
import PrimaryCategoryFilter from "@/components/home/primaryCategoryFilter";
import SecondaryCategoryFilter from "@/components/home/secondaryCategoryFilter";
import { useAuthStore } from "@/lib/store/authStore";
import BlurOverlay from "@/components/_layout/blurOverlay";

export default function PostList() {
  const [primaryCategory, setPrimaryCategory] = useState<string>("전체");
  const [selectedSecondaryCategories, setSelectedSecondaryCategories] =
    useState<string[]>(["전체"]);
  const [appliedSecondaryCategories, setAppliedSecondaryCategories] = useState<
    string[]
  >(["전체"]);

  const { isAuthenticated } = useAuthStore();

  // 필터링된 게시물
  const filteredPosts = useMemo(() => {
    let result = dummyPosts;

    if (primaryCategory === "전체") {
      return result;
    } else {
      result = result.filter(
        (post) => post.primaryCategory === primaryCategory
      );
    }

    // 2차 카테고리 필터링 (저장 버튼 클릭 후 적용된 값 사용)
    if (!appliedSecondaryCategories.includes("전체")) {
      result = result.filter((post) =>
        appliedSecondaryCategories.includes(post.secondaryCategory)
      );
    }

    return result;
  }, [primaryCategory, appliedSecondaryCategories]);

  // 게스트(비로그인) 상태에서 보여줄/가릴 목록 계산
  const isGuest = !isAuthenticated;
  const visiblePosts = useMemo(
    () => (isGuest ? filteredPosts.slice(0, 9) : filteredPosts),
    [isGuest, filteredPosts]
  );
  const hiddenPosts = useMemo(
    () => (isGuest ? filteredPosts.slice(9) : []),
    [isGuest, filteredPosts]
  );

  // 2차 카테고리 저장 버튼 핸들러
  const handleApplySecondaryCategories = () => {
    setAppliedSecondaryCategories(selectedSecondaryCategories);
  };

  return (
    <section className="w-full">
      {/* 카테고리 필터 */}
      <div className="my-10 flex gap-2.5">
        {/* 1차 카테고리 */}
        <div>
          <PrimaryCategoryFilter
            selectedCategory={primaryCategory}
            onCategoryChange={setPrimaryCategory}
          />
        </div>

        {/* 2차 카테고리 */}
        <div>
          <SecondaryCategoryFilter
            primaryCategory={primaryCategory}
            selectedCategories={selectedSecondaryCategories}
            onCategoriesChange={setSelectedSecondaryCategories}
            onApply={handleApplySecondaryCategories}
          />
        </div>
      </div>

      {/* 게시물 목록 (모바일 1열, 태블릿 2열, PC 3열) */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
        {visiblePosts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>

      {/* 비로그인 시 9개 이후 영역 블러 + CTA 오버레이 */}
      {isGuest && hiddenPosts.length > 0 && (
        <div className="relative mt-12">
          {/* 가려질 게시물 영역 (실제 배치 유지) */}
          <div className="pointer-events-none grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
            {hiddenPosts.map((post) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>

          {/* 블러 + 오버레이 컨텐츠 (재사용 컴포넌트) */}
          <BlurOverlay variant="post" sticky />
        </div>
      )}

      {/* 게시물이 없을 때 */}
      {filteredPosts.length === 0 && (
        <div className="flex h-48 items-center justify-center text-center md:h-64">
          <div>
            <p className="text-neutral-60 text-base font-medium md:text-lg">
              게시물이 없습니다
            </p>
            <p className="text-neutral-90 mt-1 text-xs md:mt-2 md:text-sm">
              다른 카테고리를 선택해보세요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
