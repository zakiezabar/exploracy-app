"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({
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
        <h1 className="text-2xl font-bold capitalize">{title}</h1>
      </div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
