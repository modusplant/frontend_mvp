export default function EmptyState() {
  return (
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
  );
}
