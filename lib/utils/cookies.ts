/**
 * 클라이언트 사이드 쿠키 관리 유틸리티
 * 브라우저 환경에서만 실행됨
 */

export interface CookieOptions {
  maxAge?: number; // 초 단위
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * 쿠키에서 값 읽기
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(nameEQ)) {
      return decodeURIComponent(trimmed.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * 쿠키에 값 저장
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;

  const {
    maxAge = 30 * 60, // 기본값: 30분 (AccessToken 만료 시간과 동일)
    path = "/",
    domain,
    secure = true, // HTTPS에서만
    sameSite = "Lax",
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (maxAge) {
    cookieString += `; Max-Age=${maxAge}`;
  }

  if (path) {
    cookieString += `; Path=${path}`;
  }

  if (domain) {
    cookieString += `; Domain=${domain}`;
  }

  if (secure) {
    cookieString += "; Secure";
  }

  if (sameSite) {
    cookieString += `; SameSite=${sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * 쿠키 삭제
 */
export function deleteCookie(
  name: string,
  options: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;

  setCookie(name, "", {
    ...options,
    maxAge: -1,
  });
}
