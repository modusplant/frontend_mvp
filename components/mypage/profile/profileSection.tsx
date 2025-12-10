"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useProfileQuery } from "@/lib/hooks/mypage/useProfileQuery";
import { useProfileMutation } from "@/lib/hooks/mypage/useProfileMutation";
import { useProfileForm } from "@/lib/hooks/mypage/useProfileForm";
import ProfileImageUploader from "./profileImageUploader";
import ProfileFormFields from "./profileFormFields";
import { useEffect } from "react";

export default function ProfileSection() {
  const { user } = useAuthStore();
  const userId = user?.id || null;

  // 프로필 데이터 조회
  const { data: profileResponse, isLoading, error } = useProfileQuery(userId);
  const profileData = profileResponse?.data;

  // 프로필 수정 Mutation
  const { mutate: updateProfile, isPending } = useProfileMutation();

  // 폼 상태 관리
  const {
    formData,
    hasChanges,
    handleNicknameChange,
    handleIntroductionChange,
    handleImageSelect,
    handleImageDelete,
    resetForm,
    createFormData,
  } = useProfileForm({
    nickname: profileData?.nickname || "",
    introduction: profileData?.introduction || "",
    image: profileData?.image || null,
  });

  // 프로필 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (profileData) {
      resetForm();
    }
  }, [profileData, resetForm]);

  // 저장 핸들러
  const handleSave = () => {
    if (!userId) return;
    if (!hasChanges) return;

    const data = createFormData();
    updateProfile(
      { userId, formData: data },
      {
        onSuccess: () => {
          alert("프로필이 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
          alert(`프로필 수정에 실패했습니다: ${error.message}`);
        },
      }
    );
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-60">프로필 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-system-alert">
          프로필 정보를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 프로필 정보 카드 */}
      <div className="border-surface-98 flex flex-col gap-[30px] rounded-xl border bg-white p-10">
        <h2 className="text-neutral-5 text-[17px] leading-[1.2] font-semibold tracking-[-0.01em]">
          프로필 정보
        </h2>

        <div className="flex flex-col gap-11">
          {/* 프로필 이미지 업로더 */}
          <ProfileImageUploader
            imagePreview={formData.imagePreview}
            onImageSelect={handleImageSelect}
            onImageDelete={handleImageDelete}
          />

          {/* 닉네임 입력 필드 */}
          <ProfileFormFields
            nickname={formData.nickname}
            introduction={formData.introduction}
            onNicknameChange={handleNicknameChange}
            onIntroductionChange={handleIntroductionChange}
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="border-surface-98 flex justify-end border-t pt-3">
        <button
          onClick={handleSave}
          disabled={!hasChanges || isPending}
          className={`rounded-[40px] px-5 py-[13px] text-[15px] leading-normal font-medium tracking-[-0.01em] transition-colors ${
            hasChanges && !isPending
              ? "bg-primary-50 hover:bg-primary-70 text-white"
              : "bg-neutral-90 text-neutral-60 cursor-not-allowed"
          } `}
        >
          {isPending ? "저장 중..." : "변경사항 저장"}
        </button>
      </div>
    </div>
  );
}
