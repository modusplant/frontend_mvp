import { serverApiInstance } from "../instances/serverInstance";
import { ApiResponse } from "@/lib/types/common";
import {
  GetPostsRequest,
  GetPostsResponseData,
  PostDetail,
} from "@/lib/types/post";

/**
 * 서버 전용 게시글 API
 */
export const serverPostApi = {
  /**
   * 게시글 목록 조회 (커서 기반 페이지네이션) - 서버 컴포넌트 전용
   * @param params 조회 파라미터
   * @returns 게시글 목록 응답
   */
  async getPosts(
    params: GetPostsRequest
  ): Promise<ApiResponse<GetPostsResponseData>> {
    const queryParams = new URLSearchParams();

    // size는 필수
    queryParams.append("size", params.size.toString());

    // 선택적 파라미터 추가
    if (params.lastPostId) {
      queryParams.append("lastPostId", params.lastPostId);
    }

    if (params.primaryCategoryId) {
      queryParams.append("primaryCategoryId", params.primaryCategoryId);
    }

    if (params.secondaryCategoryId) {
      queryParams.append("secondaryCategoryId", params.secondaryCategoryId);
    }

    const endpoint = `/api/v1/communication/posts?${queryParams.toString()}`;

    return serverApiInstance<GetPostsResponseData>(endpoint, {
      method: "GET",
      skipAuth: false, // 인증 필요 (북마크 상태 등)
    });
  },

  /**
   * 게시글 상세 조회 - 서버 컴포넌트 전용
   * @param postId 게시글 ID (ULID)
   * @returns 게시글 상세 정보
   */
  async getPostDetail(postId: string): Promise<ApiResponse<PostDetail>> {
    return serverApiInstance<PostDetail>(
      `/api/v1/communication/posts/${postId}`,
      {
        method: "GET",
        skipAuth: false,
      }
    );
  },
};
