import { User } from "lucide-react";
import { cn } from "@/lib/utils/tailwindHelper";

type ProfileProps = {
  className?: string;
};

export default function Profile({ className }: ProfileProps) {
  return (
    <div className={"bg-neutral-90 text-neutral-60 rounded-full p-2"}>
      <User className={className} />
    </div>
  );
}
