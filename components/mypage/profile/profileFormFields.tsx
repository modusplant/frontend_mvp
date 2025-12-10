"use client";

import { useState, useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { Input } from "@/components/_common/input";

interface ProfileFormFieldsProps {
  nickname: string;
  introduction: string;
  onNicknameChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
}

export default function ProfileFormFields({
  nickname,
  introduction,
  onNicknameChange,
  onIntroductionChange,
}: ProfileFormFieldsProps) {
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [initialNickname] = useState(nickname); // 초기 닉네임 저장

  // 닉네임 검증 (디바운스)
  useEffect(() => {
    // 초기 닉네임과 같으면 검증 안 함
    if (nickname === initialNickname) {
      setNicknameError("");
      return;
    }

    // 빈 값 체크
    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      return;
    }

    // 디바운스 타이머
    const timer = setTimeout(async () => {
      setIsCheckingNickname(true);
      try {
        const result = await authApi.checkNickname(nickname);
        if (result.success && !result.available) {
          setNicknameError("이미 사용중인 닉네임입니다.");
        } else {
          setNicknameError("");
        }
      } catch (error) {
        setNicknameError("닉네임 확인에 실패했습니다.");
      } finally {
        setIsCheckingNickname(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [nickname, initialNickname]);

  return (
    <div className="flex flex-col gap-11">
      {/* 닉네임 필드 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-0.5">
          <label className="text-neutral-20 text-sm leading-[1.2] font-medium tracking-[-0.01em]">
            닉네임
          </label>
          <span className="text-primary-40 text-sm leading-[1.2] font-medium tracking-[-0.01em]">
            *
          </span>
        </div>

        <div className="relative">
          <Input
            type="text"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className={`w-full ${nicknameError ? "border-system-alert" : ""}`}
          />
          {isCheckingNickname && (
            <span className="text-neutral-60 absolute top-1/2 right-4 -translate-y-1/2 text-sm">
              확인 중...
            </span>
          )}
        </div>

        {nicknameError && (
          <p className="text-system-alert text-sm">{nicknameError}</p>
        )}
      </div>

      {/* 프로필 소개글 필드 */}
      <div className="flex flex-col gap-2">
        <label className="text-neutral-20 text-sm leading-[1.2] font-medium tracking-[-0.01em]">
          프로필 소개글
        </label>

        <textarea
          value={introduction}
          onChange={(e) => onIntroductionChange(e.target.value)}
          placeholder="한 줄 소개를 입력해주세요."
          rows={1}
          className="border-surface-stroke-2 bg-surface-99 text-neutral-20 placeholder:text-neutral-40 focus:border-primary-50 w-full resize-none rounded-[10px] border px-4 py-4 text-sm leading-[1.2] font-normal tracking-[-0.01em] transition-colors focus:outline-none"
        />
      </div>
    </div>
  );
}
