import { Metadata } from "next";
import { createMetadata } from "./helpers";

/**
 * 홈페이지 메타데이터
 */
export const homeMetadata: Metadata = createMetadata({
  title: "모두의식물 - 우리들의 식물 이야기 | ModusPlant",
  description:
    "식물 애호가들의 커뮤니티, 모두의식물에서 식물 키우기 노하우, 분갈이 팁, 병충해 관리 등 다양한 식물 이야기를 공유하세요. 반려식물과 함께하는 특별한 일상을 시작하세요.",
  path: "/",
  keywords: [
    "식물 키우기",
    "반려식물",
    "식물 커뮤니티",
    "가드닝",
    "식물 관리",
    "분갈이",
    "병충해",
    "관엽식물",
    "다육식물",
    "베고니아",
    "아글라오네마",
  ],
  type: "website",
});
