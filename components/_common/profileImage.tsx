import Image from "next/image";
import { cn } from "@/lib/utils/tailwindHelper";

type ProfileProps = {
  className?: string;
  base64Image?: string | null;
};

export default function ProfileImage({ className, base64Image }: ProfileProps) {
  return base64Image ? (
    <Image
      src={`data:image/jpg;base64,${base64Image}`}
      alt="프로필 이미지"
      className={cn("rounded-full object-cover", className)}
      fill
    />
  ) : (
    <Image
      src="/icon/default_profile.svg"
      alt="기본 프로필 이미지"
      className={cn("rounded-full object-cover", className)}
      fill
    />
  );
}
