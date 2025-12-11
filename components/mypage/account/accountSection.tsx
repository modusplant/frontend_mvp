"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useMemberAuthInfo } from "@/lib/hooks/mypage/useMemberAuthInfo";
import { Input } from "@/components/_common/input";
import { Button } from "@/components/_common/button";
import { formatDate } from "@/lib/utils/formatTime";

/**
 * 계정 설정 섹션
 * - 이메일 정보 (일반 로그인만 표시)
 * - 비밀번호 변경
 * - 가입일 (읽기 전용)
 */
export default function AccountSection() {
  const { user } = useAuthStore();
  // 회원 인증 정보 조회(API 미구현)
  // const { data: authInfo, isLoading, error } = useMemberAuthInfo(user?.id);

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-[400px] items-center justify-center">
  //       <p className="text-neutral-60">로딩 중...</p>
  //     </div>
  //   );
  // }

  // if (error || !authInfo) {
  //   return (
  //     <div className="flex min-h-[400px] items-center justify-center">
  //       <p className="text-system-alert">계정 정보를 불러올 수 없습니다.</p>
  //     </div>
  //   );
  // }

  // TODO: 임시 데이터 (API 구현 후 제거)
  const authInfo = {
    id: "user-uuid",
    email: "asd@example.com",
    provider: "Basic",
    createdAt: "2023-01-15T10:20:30Z",
  };

  const isBasicAuth = authInfo.provider === "Basic";

  if (isBasicAuth) {
    return (
      <div className="flex flex-col gap-6">
        {/* 페이지 제목 */}
        <div className="border-surface-98 flex flex-col gap-[30px] rounded-xl border bg-white p-10">
          <h2 className="text-neutral-5 text-[17px] leading-[1.2] font-semibold tracking-[-0.01em]">
            이메일 정보
          </h2>

          {/* 이메일 정보 (일반 로그인만) */}
          <div className="flex flex-col gap-3">
            <label className="text-neutral-0 text-base leading-normal font-medium tracking-[-0.02em]">
              이메일
            </label>
            <Input
              type="email"
              value={authInfo.email}
              disabled
              className="flex-1"
            />
            <p className="text-neutral-60 text-sm leading-normal">
              가입일: {formatDate(authInfo.createdAt)}
            </p>
            <hr className="border-surface-stroke-2" />
            <Link href="/mypage/account/change-email">
              <Button variant="point2" size="md">
                이메일 변경하기
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-surface-98 flex flex-col gap-[30px] rounded-xl border bg-white p-10">
          {/* 비밀번호 변경 (일반 로그인만) */}
          <div className="flex flex-col gap-3">
            <label className="text-neutral-0 text-base leading-normal font-medium tracking-[-0.02em]">
              비밀번호
            </label>
            <p className="text-neutral-20">
              보안을 위해 정기적으로 비밀번호를 변경하는 것을 권장합니다.
            </p>
            <hr className="border-surface-stroke-2" />
            <div className="flex items-center gap-3">
              <Link href="/mypage/account/change-password">
                <Button variant="point2" size="md">
                  비밀번호 변경하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-surface-98 flex flex-col gap-[30px] rounded-xl border bg-white p-10">
        {/* 소셜 로그인 안내 (소셜 로그인인 경우) */}
        {/* 소셜 로그인 안내 (소셜 로그인인 경우) */}
        <div className="border-surface-stroke bg-surface-99 rounded-lg border p-6">
          <p className="text-neutral-60 text-sm leading-normal">
            {authInfo.provider === "Google" && "구글"}
            {authInfo.provider === "Kakao" && "카카오"}
            {authInfo.provider === "Naver" && "네이버"} 간편 로그인으로
            가입하셨습니다.
            <br />
            이메일과 비밀번호는 해당 서비스에서 관리됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
