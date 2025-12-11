/**
 * 회원 프로필 관련 타입 정의
 */

/**
 * 프로필 데이터 (API 응답)
 */
export interface ProfileData {
  id: string; // UUID
  image: string | null; // binary data or null
  introduction: string | null;
  nickname: string;
}

/**
 * 프로필 수정 요청 데이터 (FormData)
 */
export interface ProfileUpdateRequest {
  image?: File | null; // 이미지 파일 또는 null (삭제)
  introduction?: string;
  nickname?: string;
}

/**
 * 프로필 폼 데이터 (클라이언트 상태)
 */
export interface ProfileFormData {
  nickname: string;
  introduction: string;
  imageFile: File | null;
  /** Base64 인코딩된 이미지 데이터 */
  imagePreview: string | null; // 미리보기 URL
  shouldDeleteImage: boolean; // 이미지 삭제 플래그
}
