import ProviderNavigation from "@/components/ProviderNav";
import { ReactNode } from "react";

interface ProviderLayoutProps {
  children: ReactNode;
}

const ProviderLayout = ({ children }: ProviderLayoutProps) => {
  return (
    <div className="h-full flex flex-row">
      <ProviderNavigation />
      <div className="h-full w-full pl-8">
        {children}
      </div>
    </div>
  );
};

export default ProviderLayout;
