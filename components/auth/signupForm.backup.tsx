"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/authStore";
import {
  SignupFormData,
  EmailVerificationState,
  NicknameVerificationState,
} from "@/lib/types";
import { Input } from "@/components/_common/input";
import Button from "@/components/_common/button";
import { Checkbox } from "@/components/_common/checkbox";

// Zod 스키마 정의
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일을 입력해주세요"),
    verificationCode: z.string().min(1, "인증코드를 입력해주세요"),
    password: z
      .string()
      .min(
        8,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    nickname: z
      .string()
      .min(1, "닉네임을 입력해주세요")
      .max(20, "닉네임은 20자 이내로 입력해주세요"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요",
    }),
    agreeToPrivacy: z.boolean().refine((val) => val === true, {
      message: "개인정보처리방침에 동의해주세요",
    }),
    agreeToMarketing: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 서로 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // 폼 상태
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeToMarketing: false,
    },
  });

  // 비밀번호 표시 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 이메일 인증 상태
  const [emailVerification, setEmailVerification] =
    useState<EmailVerificationState>({
      isCodeSent: false,
      isVerified: false,
      timeRemaining: 0,
      canResend: false,
    });

  // 닉네임 검증 상태
  const [nicknameVerification, setNicknameVerification] =
    useState<NicknameVerificationState>({
      isChecked: false,
      isAvailable: false,
      message: "",
    });

  // 약관 내용 토글 상태
  const [showTermsContent, setShowTermsContent] = useState(false);
  const [showPrivacyContent, setShowPrivacyContent] = useState(false);
  const [showMarketingContent, setShowMarketingContent] = useState(false);

  const watchedValues = watch();
  const watchedEmail = watch("email");
  const watchedNickname = watch("nickname");
  const watchedAgreeToTerms = watch("agreeToTerms");
  const watchedAgreeToPrivacy = watch("agreeToPrivacy");

  // 전체 동의 체크박스 상태
  const allRequiredAgreed = watchedAgreeToTerms && watchedAgreeToPrivacy;

  // 이메일 인증 카운트다운 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emailVerification.timeRemaining > 0) {
      timer = setTimeout(() => {
        setEmailVerification((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (
      emailVerification.isCodeSent &&
      emailVerification.timeRemaining === 0
    ) {
      setEmailVerification((prev) => ({
        ...prev,
        canResend: true,
      }));
    }
    return () => clearTimeout(timer);
  }, [emailVerification.timeRemaining, emailVerification.isCodeSent]);

  // 이메일 인증 요청
  const handleRequestVerification = async () => {
    const emailValid = await trigger("email");
    if (!emailValid) return;

    try {
      // 실제 API 호출 시 여기서 이메일 인증 요청
      // const response = await requestEmailVerification(watchedEmail);

      // 모킹 응답
      const mockResponse = { success: true, expiresIn: 180 };

      if (mockResponse.success) {
        setEmailVerification({
          isCodeSent: true,
          isVerified: false,
          timeRemaining: mockResponse.expiresIn || 180,
          canResend: false,
        });
        window.alert("인증코드가 발송되었습니다.");
      }
    } catch (error) {
      window.alert("인증코드 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 인증코드 재요청
  const handleResendVerification = async () => {
    try {
      // 실제 API 호출 시 여기서 인증코드 재요청
      const mockResponse = { success: true, expiresIn: 180 };

      if (mockResponse.success) {
        setEmailVerification({
          isCodeSent: true,
          isVerified: false,
          timeRemaining: mockResponse.expiresIn || 180,
          canResend: false,
        });
        window.alert("인증코드가 재발송되었습니다.");
      }
    } catch (error) {
      window.alert("인증코드 재발송에 실패했습니다.");
    }
  };

  // 인증코드 확인
  const handleVerifyCode = async () => {
    const codeValid = await trigger("verificationCode");
    if (!codeValid) return;

    try {
      // 실제 API 호출 시 여기서 인증코드 확인
      // const response = await verifyCode(watchedEmail, watch("verificationCode"));

      // 모킹 응답 (인증코드가 "123456"인 경우만 성공)
      const verificationCode = watch("verificationCode");
      const mockResponse = { success: verificationCode === "123456" };

      if (mockResponse.success) {
        setEmailVerification((prev) => ({
          ...prev,
          isVerified: true,
          timeRemaining: 0,
        }));
        window.alert("이메일 인증이 완료되었습니다.");
      } else {
        window.alert("인증코드가 일치하지 않습니다.");
      }
    } catch (error) {
      window.alert("인증 확인에 실패했습니다.");
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    const nicknameValid = await trigger("nickname");
    if (!nicknameValid) return;

    try {
      // 실제 API 호출 시 여기서 닉네임 중복 확인
      // const response = await checkNickname(watchedNickname);

      // 모킹 응답 (admin, test는 중복으로 처리)
      const isUnavailable = ["admin", "test", "모두의식물"].includes(
        watchedNickname.toLowerCase()
      );
      const mockResponse = {
        success: true,
        available: !isUnavailable,
        message: isUnavailable
          ? "사용 중인 닉네임입니다."
          : "사용 가능한 닉네임입니다.",
      };

      setNicknameVerification({
        isChecked: true,
        isAvailable: mockResponse.available,
        message: mockResponse.message,
      });

      window.alert(mockResponse.message);
    } catch (error) {
      window.alert("닉네임 확인에 실패했습니다.");
    }
  };

  // 전체 동의 토글
  const handleToggleAllAgreements = () => {
    const newValue = !allRequiredAgreed;
    setValue("agreeToTerms", newValue);
    setValue("agreeToPrivacy", newValue);
    setValue("agreeToMarketing", newValue);
  };

  // 폼 제출
  const onSubmit = async (data: SignupFormValues) => {
    // 이메일 인증 확인
    if (!emailVerification.isVerified) {
      window.alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 닉네임 중복 확인
    if (!nicknameVerification.isChecked || !nicknameVerification.isAvailable) {
      window.alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    try {
      // 실제 API 호출 시 여기서 회원가입 처리
      // const response = await signup(data);

      // 모킹 응답
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      const mockResponse = {
        success: true,
        message: "회원가입이 완료되었습니다.",
        user: {
          id: "user123",
          email: data.email,
          nickname: data.nickname,
        },
      };

      if (mockResponse.success) {
        // 자동 로그인 처리
        login(mockResponse.user);

        window.alert("회원가입이 완료되었습니다! 메인페이지로 이동합니다.");
        router.push("/");
      }
    } catch (error) {
      window.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 카운트다운 시간 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // 회원가입 버튼 활성화 조건
  const isSignupEnabled =
    emailVerification.isVerified &&
    nicknameVerification.isChecked &&
    nicknameVerification.isAvailable &&
    watchedAgreeToTerms &&
    watchedAgreeToPrivacy &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm &&
    !errors.nickname;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
      {/* 이메일 인증 섹션 */}
      <div className="space-y-2">
        <label className="text-neutral-20 block text-sm font-medium">
          이메일
        </label>

        {/* 이메일 입력 + 인증요청 버튼 */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <Input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              disabled={emailVerification.isVerified}
              className={cn(
                "w-full",
                errors.email && "border-red-500",
                emailVerification.isVerified && "border-primary-50"
              )}
            />
          </div>
          <Button
            type="button"
            onClick={
              emailVerification.canResend
                ? handleResendVerification
                : handleRequestVerification
            }
            disabled={
              !watchedEmail ||
              !!errors.email ||
              (emailVerification.isCodeSent && !emailVerification.canResend) ||
              emailVerification.isVerified
            }
            className="w-full min-w-[92px] px-5 py-3 text-sm sm:w-auto"
          >
            {emailVerification.canResend ? "재요청" : "인증요청"}
          </Button>
        </div>

        {/* 이메일 에러 메시지 */}
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        {/* 인증코드 입력 */}
        {emailVerification.isCodeSent && !emailVerification.isVerified && (
          <div className="space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Input
                  {...register("verificationCode")}
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={!watch("verificationCode")}
                className="w-full min-w-[92px] px-5 py-3 text-sm sm:w-auto"
                variant="secondary"
              >
                확인
              </Button>
            </div>
            {emailVerification.timeRemaining > 0 && (
              <p className="text-neutral-60 text-sm">
                요청 시간 {formatTime(emailVerification.timeRemaining)}
              </p>
            )}
            {errors.verificationCode && (
              <p className="text-sm text-red-500">
                {errors.verificationCode.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 비밀번호 섹션 */}
      <div className="space-y-2">
        <label className="text-neutral-20 block text-sm font-medium">
          비밀번호
        </label>

        <div className="space-y-3">
          {/* 비밀번호 입력 */}
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className={cn(
                "w-full pr-12",
                errors.password && "border-red-500"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="text-neutral-60 h-4 w-4" />
              ) : (
                <Eye className="text-neutral-60 h-4 w-4" />
              )}
            </button>
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="relative">
            <Input
              {...register("passwordConfirm")}
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한번 입력해주세요"
              className={cn(
                "w-full pr-12",
                errors.passwordConfirm && "border-red-500"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              {showPasswordConfirm ? (
                <EyeOff className="text-neutral-60 h-4 w-4" />
              ) : (
                <Eye className="text-neutral-60 h-4 w-4" />
              )}
            </button>
          </div>
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

      {/* 닉네임 섹션 */}
      <div className="space-y-2">
        <label className="text-neutral-20 block text-sm font-medium">
          닉네임
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <Input
              {...register("nickname")}
              type="text"
              placeholder="닉네임을 입력해주세요"
              className={cn(
                "w-full",
                errors.nickname && "border-red-500",
                nicknameVerification.isChecked &&
                  !nicknameVerification.isAvailable &&
                  "border-red-500"
              )}
              onChange={(e) => {
                register("nickname").onChange(e);
                // 닉네임 변경 시 검증 상태 초기화
                setNicknameVerification({
                  isChecked: false,
                  isAvailable: false,
                  message: "",
                });
              }}
            />
          </div>
          <Button
            type="button"
            onClick={handleCheckNickname}
            disabled={!watchedNickname || !!errors.nickname}
            className="w-full min-w-[92px] px-5 py-3 text-sm sm:w-auto"
            variant="secondary"
          >
            중복확인
          </Button>
        </div>

        {/* 닉네임 에러 메시지 */}
        {errors.nickname && (
          <p className="text-sm text-red-500">{errors.nickname.message}</p>
        )}
        {nicknameVerification.isChecked &&
          !nicknameVerification.isAvailable && (
            <p className="text-sm text-red-500">
              {nicknameVerification.message}
            </p>
          )}
      </div>

      {/* 약관 동의 섹션 */}
      <div className="space-y-3">
        {/* 전체 동의 */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allRequiredAgreed}
            onChange={handleToggleAllAgreements}
          />
          <span className="text-neutral-20 text-sm font-semibold">
            모든 약관 및 정책에 동의합니다.
          </span>
        </div>

        {/* 구분선 */}
        <div className="bg-neutral-90 h-px"></div>

        {/* 개별 약관들 */}
        <div className="space-y-3">
          {/* 이용약관 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox {...register("agreeToTerms")} />
                <span className="text-neutral-60 text-sm">
                  [필수] 이용약관을 확인했으며, 동의합니다.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsContent(!showTermsContent)}
                className="text-neutral-60 text-sm underline"
              >
                {showTermsContent ? "접기" : "보기"}
              </button>
            </div>
            {showTermsContent && (
              <div className="bg-neutral-98 text-neutral-60 ml-6 rounded-md p-3 text-sm leading-relaxed">
                <p className="mb-2 font-medium">[필수] 서비스 이용약관 동의</p>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>
                    • 본 서비스는 회원 간 소통과 정보 공유를 위한 커뮤니티
                    플랫폼입니다.
                  </li>
                  <li>
                    • 타인의 권리를 침해하거나 불법·부적절한 게시물은 제재될 수
                    있습니다.
                  </li>
                  <li>• 서비스 운영 정책 및 공지사항을 준수해야 합니다.</li>
                </ul>
              </div>
            )}
          </div>

          {/* 개인정보처리방침 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox {...register("agreeToPrivacy")} />
                <span className="text-neutral-60 text-sm">
                  [필수] 개인정보처리방침을 확인했으며, 동의합니다.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyContent(!showPrivacyContent)}
                className="text-neutral-60 text-sm underline"
              >
                {showPrivacyContent ? "접기" : "보기"}
              </button>
            </div>
            {showPrivacyContent && (
              <div className="bg-neutral-98 text-neutral-60 ml-6 rounded-md p-3 text-sm leading-relaxed">
                <p className="mb-2 font-medium">
                  [필수] 개인정보 수집 및 이용 동의
                </p>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>
                    • 회원가입 및 서비스 이용을 위해 닉네임, 이메일 등 기본
                    정보를 수집합니다.
                  </li>
                  <li>
                    • 수집된 정보는 서비스 운영 및 고객 문의 응대에만
                    사용됩니다.
                  </li>
                  <li>• 개인정보는 회원 탈퇴 시 즉시 삭제됩니다.</li>
                </ul>
              </div>
            )}
          </div>

          {/* 마케팅 정보 수신 동의 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox {...register("agreeToMarketing")} />
                <span className="text-neutral-60 text-sm">
                  [선택] 마케팅 정보 수신에 동의합니다.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowMarketingContent(!showMarketingContent)}
                className="text-neutral-60 text-sm underline"
              >
                {showMarketingContent ? "접기" : "보기"}
              </button>
            </div>
            {showMarketingContent && (
              <div className="bg-neutral-98 text-neutral-60 ml-6 rounded-md p-3 text-sm leading-relaxed">
                <p className="mb-2 font-medium">
                  [필수] 커뮤니티 운영정책 동의
                </p>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>
                    • 욕설, 비방, 혐오, 음란, 광고성 콘텐츠는 등록이 제한됩니다.
                  </li>
                  <li>
                    • 타인의 명예를 훼손하거나 불쾌감을 주는 활동은 금지됩니다.
                  </li>
                  <li>
                    • 위반 시 게시물 삭제 및 이용 제한 등의 조치가 이루어질 수
                    있습니다.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 약관 동의 에러 메시지 */}
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
        )}
        {errors.agreeToPrivacy && (
          <p className="text-sm text-red-500">
            {errors.agreeToPrivacy.message}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        disabled={!isSignupEnabled || isSubmitting}
        className="w-full py-3 md:py-4"
      >
        {isSubmitting ? "처리 중..." : "회원가입"}
      </Button>
    </form>
  );
}
