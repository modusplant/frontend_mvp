"use client";

import { cn } from "@/lib/utils/tailwindHelper";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/lib/types/auth";
import HeaderLogo from "./headerLogo";
import HeaderAuthActions from "./headerAuthActions";
import HeaderGuestActions from "./headerGuestActions";

export interface HeaderProps {
  className?: string;
  initialUser: User | null;
}

export default function Header({ className, initialUser }: HeaderProps) {
  const { isAuthenticated, user: storeUser, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const isRootPath = pathname.endsWith("/");
  const showWriteButton = !pathname.startsWith("/community/write");

  // Use store user if authenticated, otherwise use initialUser
  const user = isAuthenticated ? storeUser : initialUser;

  const handleLogout = async () => {
    logout();
    router.refresh();
  };

  return (
    <header
      className={cn(isRootPath ? "sticky top-0" : "", "z-50 w-full", className)}
    >
      <div
        className={cn(
          "flex h-14 w-full items-center justify-between px-2 md:px-4 lg:px-6",
          !isRootPath && "border-b border-[#000000]/10"
        )}
      >
        {/* 로고 */}
        <HeaderLogo isRootPath={isRootPath} />

        {/* 로그인 상태에 따른 버튼 */}
        <div className="flex items-center gap-2 text-[13px] font-medium">
          {user ? (
            <HeaderAuthActions
              user={user}
              onLogout={handleLogout}
              showWriteButton={showWriteButton}
            />
          ) : (
            <HeaderGuestActions />
          )}
        </div>
      </div>
    </header>
  );
}
