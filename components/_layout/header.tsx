"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/_common/button";
import { cn } from "@/lib/utils/tailwindHelper";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import Profile from "@/components/_common/profileImage";
import Dropdown from "@/components/_common/dropdown";
import { User } from "@/lib/types/auth";
import { LogOut } from "lucide-react";

export interface HeaderProps {
  className?: string;
  initialUser: User | null;
}

export default function Header({ className, initialUser }: HeaderProps) {
  const { isAuthenticated, user: storeUser, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const isRootPath = pathname.endsWith("/");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Use store user if authenticated, otherwise use initialUser
  const user = isAuthenticated ? storeUser : initialUser;

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    router.push("/");
  };

  const logo = isRootPath
    ? "/logo_favicon/Logo_v2_white.svg"
    : "/logo_favicon/Logo_v2_black.svg";

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
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image src={logo} alt="모두의식물 로고" width={117} height={26} />
        </Link>

        {/* 로그인 상태에 따른 버튼 */}
        <div className="flex items-center gap-2 text-[13px] font-medium">
          {user ? (
            <>
              {/* 프로필 드롭다운 */}
              <Dropdown
                isOpen={isProfileDropdownOpen}
                onClose={() => setIsProfileDropdownOpen(false)}
                trigger={
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="relative h-9 w-9 cursor-pointer rounded-full transition-opacity hover:opacity-80"
                    aria-label="프로필 메뉴"
                  >
                    <Profile imageSrc={user?.image} />
                  </button>
                }
                items={[
                  {
                    label: "마이페이지",
                    onClick: () => router.push("/mypage"),
                  },
                  {
                    label: "내 활동",
                    onClick: () => router.push("/mypage/recent"),
                  },
                  {
                    label: "로그아웃",
                    onClick: handleLogout,
                  },
                ]}
                position="center"
                width="w-32"
              />
              {/* 글쓰기 버튼 */}
              <Link href="/community/write">
                <Button variant="point" size="sm" className="h-9 rounded-full">
                  글쓰기
                </Button>
              </Link>
            </>
          ) : (
            <>
              {/* 로그인/회원가입 버튼 */}
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="h-9 cursor-pointer rounded-full border-none"
                >
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="point"
                  size="sm"
                  className="h-9 cursor-pointer rounded-full border-none"
                >
                  회원가입
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
