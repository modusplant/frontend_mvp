import { useState, useCallback } from "react";
import { ProfileFormData } from "@/lib/types/member";

/**
 * 프로필 폼 상태 관리 훅
 *
 * @param initialData - 초기 프로필 데이터
 * @returns 폼 상태 및 핸들러 함수들
 */
export function useProfileForm(initialData?: {
  nickname: string;
  introduction: string;
  image: string | null;
}) {
  const [formData, setFormData] = useState<ProfileFormData>({
    nickname: initialData?.nickname || "",
    introduction: initialData?.introduction || "",
    imageFile: null,
    imagePreview: initialData?.image || null,
    shouldDeleteImage: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // 닉네임 변경
  const handleNicknameChange = useCallback((nickname: string) => {
    setFormData((prev) => ({ ...prev, nickname }));
    setHasChanges(true);
  }, []);

  // 소개글 변경
  const handleIntroductionChange = useCallback((introduction: string) => {
    setFormData((prev) => ({ ...prev, introduction }));
    setHasChanges(true);
  }, []);

  // 이미지 파일 선택
  const handleImageSelect = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
      shouldDeleteImage: false,
    }));
    setHasChanges(true);
  }, []);

  // 이미지 삭제
  const handleImageDelete = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
      shouldDeleteImage: true,
    }));
    setHasChanges(true);
  }, []);

  // 폼 초기화
  const resetForm = useCallback(() => {
    setFormData({
      nickname: initialData?.nickname || "",
      introduction: initialData?.introduction || "",
      imageFile: null,
      imagePreview: initialData?.image || null,
      shouldDeleteImage: false,
    });
    setHasChanges(false);
  }, [initialData]);

  // FormData 생성 (API 요청용)
  const createFormData = useCallback((): FormData => {
    const data = new FormData();

    // 닉네임 추가
    data.append("nickname", formData.nickname);

    // 소개글 추가
    data.append("introduction", formData.introduction);

    // 이미지 처리
    if (formData.shouldDeleteImage) {
      // 이미지 삭제 시 null 전송
      data.append("image", "null");
    } else if (formData.imageFile) {
      // 새 이미지 업로드
      data.append("image", formData.imageFile);
    }
    // 변경사항 없으면 image 필드를 포함하지 않음

    return data;
  }, [formData]);

  return {
    formData,
    hasChanges,
    handleNicknameChange,
    handleIntroductionChange,
    handleImageSelect,
    handleImageDelete,
    resetForm,
    createFormData,
  };
}
