import { MetadataRoute } from "next";
import { serverPostApi } from "@/lib/api/server/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://modusplant.kr";

  try {
    // 최근 게시글 가져오기 (최대 100개)
    const postsResponse = await serverPostApi.getPosts({ size: 50 });
    const posts = postsResponse.data?.posts || [];

    // 게시글 URL 생성
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/community/${post.postId}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      // 홈페이지 (최우선)
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      // 모든 게시글
      ...postUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);

    // 에러 발생 시 기본 페이지만 반환
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
