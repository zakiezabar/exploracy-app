import FooterNavigation from "@/components/FooterNav";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full px-4 lg:px-10 pt-20 md:pt-24">
      <div className="mx-auto h-full">
        {children}
      </div>
      <FooterNavigation />
    </div>
  );
};

export default MainLayout;
