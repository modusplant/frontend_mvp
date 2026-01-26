import { getCookie, deleteCookie } from "@/lib/utils/cookies/server";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/lib/constants/auth";
import { BASE_URL } from "@/lib/constants/apiInstance";
import { createApi } from "./core";
export const serverApiInstance = createApi({
  baseUrl: BASE_URL || "",
  includeCredentials: false,
  getAccessToken: async () => await getCookie(ACCESS_TOKEN_COOKIE_NAME),
  onUnauthorized: async () => {
    await deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
    await deleteCookie("rememberMe");
    return "fail" as const;
  },
});
