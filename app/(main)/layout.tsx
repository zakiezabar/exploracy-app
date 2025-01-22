"use client";
import { FooterControl } from "@/contexts/FooterContext";
import { useFooter } from "@/contexts/FooterContext";
import FooterNavigation from "@/components/FooterNav";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const { isFooterVisible } = useFooter();
  
  return (
    <div className="h-full px-4 lg:px-10 pt-20 md:pt-24">
      <div className="mx-auto h-full">
        {children}
      </div>
      {isFooterVisible && <FooterNavigation />}
    </div>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <FooterControl>
      <MainLayoutContent>{children}</MainLayoutContent>
    </FooterControl>
  );
};

export default MainLayout;
