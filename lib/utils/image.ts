/**
 * 이미지 URL을 full URL로 변환
 * @param src 이미지 소스 경로
 * @returns full URL
 */
export function getFullImageUrl(src: string | undefined): string | undefined {
  if (!src) return undefined;

  // URL이 이미 full URL인지 확인 (http:// 또는 https://로 시작)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // full URL이 아닌 경우 prefix 추가
  const hostname = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;
  const path = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (hostname) {
    return `https://${hostname}${path}${src}`;
  }

  return src;
}

/**
 * 이미지 URL을 프록시 경로로 변환 (CORS 회피용)
 * @param src 이미지 소스 경로
 * @returns 프록시 경로
 */
export function getProxiedImageUrl(
  src: string | undefined
): string | undefined {
  if (!src) return undefined;

  // URL이 이미 full URL인지 확인
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // 외부 이미지 호스트의 이미지인 경우에만 프록시 사용
    const hostname = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;
    const path = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

    if (hostname && src.includes(hostname)) {
      // https://hostname/path/image.jpg -> /image-proxy/image.jpg
      const urlPath = src.split(`${hostname}${path}`)[1];
      if (urlPath) {
        return `/image-proxy/${urlPath}`;
      }
    }

    // 다른 호스트의 이미지는 그대로 반환
    return src;
  }

  // 상대 경로인 경우 프록시 경로로 변환
  return `/image-proxy/${src}`;
}
