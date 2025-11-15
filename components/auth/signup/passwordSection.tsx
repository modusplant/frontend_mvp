"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";

import { cn } from "@/lib/utils";
import { SignupFormValues } from "@/lib/validations/auth";
import { Input } from "@/components/_common/input";

export interface PasswordSectionProps {
  register: UseFormRegister<SignupFormValues>;
  errors: Pick<FieldErrors<SignupFormValues>, "password" | "passwordConfirm">;
  className?: string;
}

export default function PasswordSection({
  register,
  errors,
  className,
}: PasswordSectionProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-neutral-20 block text-sm font-medium">
        비밀번호
      </label>

      <div className="space-y-3">
        {/* 비밀번호 입력 */}
        <Input
          {...register("password")}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          showPasswordToggle
          className={cn("w-full", errors.password && "border-red-500")}
        />

        {/* 비밀번호 확인 입력 */}
        <Input
          {...register("passwordConfirm")}
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          showPasswordToggle
          className={cn("w-full", errors.passwordConfirm && "border-red-500")}
        />
      </div>

      {/* 비밀번호 안내 및 에러 메시지 */}
      <div className="space-y-1">
        {!errors.password && (
          <p className="text-neutral-60 text-sm">
            영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로
            입력해주세요.
          </p>
        )}
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        {errors.passwordConfirm && (
          <p className="text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
    </div>
  );
}
