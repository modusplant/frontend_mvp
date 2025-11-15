"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { SignupFormValues } from "@/lib/validations/auth";
import { useTermsAgreement } from "@/lib/hooks/useTermsAgreement";
import { Checkbox } from "@/components/_common/checkbox";

interface TermsSectionProps {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  watch: (name: keyof SignupFormValues) => any;
  setValue: UseFormSetValue<SignupFormValues>;
}

export default function TermsSection({
  register,
  errors,
  watch,
  setValue,
}: TermsSectionProps) {
  const { contentState, toggleContent } = useTermsAgreement();

  // 현재 폼의 동의 상태 확인
  const agreementValues = {
    agreeToTerms: watch("agreeToTerms"),
    agreeToPrivacy: watch("agreeToPrivacy"),
    agreeToMarketing: watch("agreeToMarketing"),
  };

  // 모든 약관 동의 상태
  const allTermsAgreed =
    agreementValues.agreeToTerms &&
    agreementValues.agreeToPrivacy &&
    agreementValues.agreeToMarketing;

  const handleAllAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue("agreeToTerms", checked);
    setValue("agreeToPrivacy", checked);
    setValue("agreeToMarketing", checked);
  };

  return (
    <div className="space-y-3">
      {/* 전체 동의 */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allTermsAgreed}
          onChange={handleAllAgreementChange}
          id="agreeToAll"
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
              <Checkbox
                {...register("agreeToTerms")}
                id="agreeToTerms"
                checked={agreementValues.agreeToTerms || false}
              />
              <span className="text-neutral-60 text-sm">
                [필수] 이용약관을 확인했으며, 동의합니다.
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleContent("showTermsContent")}
              className="text-neutral-60 text-sm underline"
            >
              {contentState.showTermsContent ? "접기" : "보기"}
            </button>
          </div>
          {contentState.showTermsContent && (
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

        {/* 개인정보 처리방침 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("agreeToPrivacy")}
                id="agreeToPrivacy"
                checked={agreementValues.agreeToPrivacy || false}
              />
              <span className="text-neutral-60 text-sm">
                [필수] 개인정보 처리방침을 확인했으며, 동의합니다.
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleContent("showPrivacyContent")}
              className="text-neutral-60 text-sm underline"
            >
              {contentState.showPrivacyContent ? "접기" : "보기"}
            </button>
          </div>
          {contentState.showPrivacyContent && (
            <div className="bg-neutral-98 text-neutral-60 ml-6 rounded-md p-3 text-sm leading-relaxed">
              <p className="mb-2 font-medium">
                [필수] 개인정보 수집 및 이용 동의
              </p>
              <ul className="space-y-1 text-xs md:text-sm">
                <li>
                  • 회원가입 및 서비스 이용을 위해 닉네임, 이메일 등 기본 정보를
                  수집합니다.
                </li>
                <li>
                  • 수집된 정보는 서비스 운영 및 고객 문의 응대에만 사용됩니다.
                </li>
                <li>• 개인정보는 회원 탈퇴 시 즉시 삭제됩니다.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 마케팅 수신 동의 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("agreeToMarketing")}
                id="agreeToMarketing"
                checked={agreementValues.agreeToMarketing || false}
              />
              <span className="text-neutral-60 text-sm">
                [필수] 커뮤니티 운영정책 동의
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleContent("showMarketingContent")}
              className="text-neutral-60 text-sm underline"
            >
              {contentState.showMarketingContent ? "접기" : "보기"}
            </button>
          </div>
          {contentState.showMarketingContent && (
            <div className="bg-neutral-98 text-neutral-60 ml-6 rounded-md p-3 text-sm leading-relaxed">
              <p className="mb-2 font-medium">[필수] 커뮤니티 운영정책 동의</p>
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

      {/* 에러 메시지 */}
      {(errors.agreeToTerms || errors.agreeToPrivacy) && (
        <p className="mt-2 text-sm text-red-500">필수 약관에 동의해주세요.</p>
      )}
    </div>
  );
}
