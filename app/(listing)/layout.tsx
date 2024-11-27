import { ReactNode } from "react";

interface ListingLayoutProps {
  children: ReactNode;
}

const ListingLayout = ({ children }: ListingLayoutProps) => {
  return (
    <div className="h-full pt-20 md:pt-24">
      <div className="mx-auto h-full">
        {children}
      </div>
    </div>
  );
};

export default ListingLayout;
