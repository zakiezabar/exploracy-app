'use client';

import Image from "next/image";

interface MenuItemProps {
  onClick?: () => void;
  label?: string;
  iconSrc?: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, iconSrc, className }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-3 hover:text-secondary-400 transition cursor-pointer ${className}`}>
        {iconSrc && (
            <Image
                src={iconSrc}
                alt={label || "{label}"}
                width={24}
                height={24}
                className="mr-2"
            />
        )}
          {label && <span>{label}</span>}
    </div>
  );
};

export default MenuItem;
