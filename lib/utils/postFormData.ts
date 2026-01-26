/**
 * 게시글 FormData 변환 헬퍼 함수
 * 작성과 수정에서 공통으로 사용하는 FormData 생성 로직
 */

export interface PostFormDataPayload {
  textContent: string;
  images: File[];
  primaryCategoryId: string;
  secondaryCategoryId: string;
  title: string;
}

/**
 * 게시글 작성/수정 시 FormData 생성
 * @param payload 게시글 데이터
 * @returns 서버에 전송할 FormData
 */
export function buildPostFormData(payload: PostFormDataPayload): FormData {
  const formData = new FormData();

  // 1. 텍스트 콘텐츠를 파일로 변환하여 추가
  if (payload.textContent.trim()) {
    const textBlob = new Blob([payload.textContent], { type: "text/plain" });
    const textFile = new File([textBlob], "text_0.txt", {
      type: "text/plain",
    });
    formData.append("content", textFile);
  }

  // 2. 이미지 파일들 추가
  payload.images.forEach((image) => {
    formData.append("content", image);
  });

  // 3. orderInfo 생성 (텍스트 + 이미지 순서)
  const orderInfo: { filename: string; order: number }[] = [];
  let currentOrder = 1;

  if (payload.textContent.trim()) {
    orderInfo.push({ filename: "text_0.txt", order: currentOrder++ });
  }

  payload.images.forEach((image) => {
    orderInfo.push({ filename: image.name, order: currentOrder++ });
  });

  const orderBlob = new Blob([JSON.stringify(orderInfo)], {
    type: "application/json",
  });
  formData.append("orderInfo", orderBlob);

  return formData;
}

/**
 * 게시글 작성/수정 시 쿼리 파라미터 생성
 * @param payload 게시글 데이터
 * @returns 쿼리 파라미터 문자열
 */
export function buildPostQueryParams(payload: PostFormDataPayload): string {
  const params = new URLSearchParams({
    primaryCategoryId: payload.primaryCategoryId,
    secondaryCategoryId: payload.secondaryCategoryId,
    title: payload.title,
    isPublished: "true",
  });

  return params.toString();
}
