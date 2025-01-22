"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeadingProps {
  subtitle?: string;
  showBackArrow?: boolean;
}
const Heading: React.FC<HeadingProps> = ({
  subtitle,
  showBackArrow,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
       {showBackArrow && (
         <div onClick={handleBack} className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition p-2">
           <BiArrowBack
             color="mono-800"
             size={16}
           />
           <span>Back</span>
         </div>
       )}
     </div>
      <div className="font-light text-mono-300 text-sm">{subtitle}</div>
    </div>
  );
};

export default Heading;
