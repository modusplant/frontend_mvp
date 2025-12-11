import { User } from "lucide-react";
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
    <div className={"bg-neutral-90 text-neutral-60 rounded-full p-2"}>
      <User className={className} />
    </div>
  );
}
