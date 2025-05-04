"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  center,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="items-center gap-2">
        <h1 className="text-base font-bold">{title}</h1>
      </div>
      <div className=" text-mono-500">{subtitle}</div>
    </div>
  );
};

export default SectionTitle;
