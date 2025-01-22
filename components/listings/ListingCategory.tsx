'use client';

import Image from "next/image";
import React from "react";

interface ListingCategoryProps {
  icon: React.ComponentType<{ size: number}> | string;
  label: string;
  description: string;
}
const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description
}) => {

  const isIconComponent = typeof Icon === 'function';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
      {isIconComponent ? (
          React.createElement(Icon, { size: 24 }) // Render component if `Icon` is a component
        ) : (
          <Image src={Icon} alt={label} width={44} height={44} /> // Render image if `Icon` is a URL
        )}
        <div className="flex flex-col">
          <div className="text-base font-semibold">
            {label}
          </div>
          <div className="text-sm text-mono-400 font-light">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ListingCategory;