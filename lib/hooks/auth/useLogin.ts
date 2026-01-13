import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { authApi } from "@/lib/api/client/auth";
import { LoginFormValues } from "@/lib/constants/schema";
import { decodeJWT } from "@/lib/utils/auth";
import { memberApi } from "@/lib/api/client/member";
import { setCookie } from "@/lib/utils/cookies/client";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  REMEMBER_ME_MAX_AGE,
} from "@/lib/constants/auth";

/**
 * 로그인 커스텀 훅
 */
export function useLogin() {
  const router = useRouter();
  const { login, incrementLoginAttempts } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setServerError(null);

      // API 호출
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      if (response.status === 200 && response.data?.accessToken) {
        // AccessToken 저장 (쿠키)
        await setCookie(ACCESS_TOKEN_COOKIE_NAME, response.data.accessToken, {
          maxAge: ACCESS_TOKEN_MAX_AGE,
          path: "/",
          secure: true,
          sameSite: "Lax",
        });

        // rememberMe 쿠키 저장 (1주일)
        if (data.rememberMe) {
          await setCookie("rememberMe", "true", {
            maxAge: REMEMBER_ME_MAX_AGE,
            path: "/",
            secure: true,
            sameSite: "Lax",
          });
        }

        // JWT에서 사용자 정보 추출
        const decoded = decodeJWT(response.data.accessToken);

        if (!decoded) {
          throw new Error("유효하지 않은 토큰입니다.");
        }

        // 토큰에서 추출한 ID로 추가 사용자 정보(image, introduction) 조회
        const { data: profileResponse } = await memberApi.getProfile(
          decoded.sub
        );

        const user = {
          id: decoded.sub,
          email: decoded.email,
          nickname: profileResponse?.nickname || decoded.nickname,
          role: decoded.role,
          image: profileResponse?.imageUrl || "",
          introduction: profileResponse?.introduction || "",
        };

        // 로그인 성공 - JWT에서 추출한 사용자 정보 저장
        login(user, data.rememberMe || false);

        console.log("로그인 성공");
        router.push("/");
      }
    } catch (error: any) {
      // 로그인 시도 횟수 증가
      incrementLoginAttempts();

      setServerError(error.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    serverError,
    isLoading,
  };
}
