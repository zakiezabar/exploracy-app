"use client";
import { ReactNode, useEffect } from "react";
import { useFooter } from "@/contexts/FooterContext";

interface ProviderLayoutProps {
  children: ReactNode;
}

const ProviderLayout = ({ children }: ProviderLayoutProps) => {
  const { setFooterVisible } = useFooter();

  useEffect(() => {
    setFooterVisible(false);
    return () => setFooterVisible(true);
  }, [setFooterVisible]);

  return (
    <div className="flex flex-row justify-center mx-auto">
        {children}
      {/* <div className="w-full md:w-2/4 px-2 md:px-6 relative bg-red-500">
      </div> */}
    </div>
  );
};

export default ProviderLayout;
