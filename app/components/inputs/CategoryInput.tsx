'use client';

import Image from 'next/image';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: React.ComponentType<{ size: number}> | string;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {

  const isIconComponent = typeof Icon === 'function';
  
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        hover:bg-slate-100
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
        ${selected ? 'bg-slate-100' : 'none'}
        `}
    >
      { isIconComponent ?
        React.createElement(Icon, { size: 24 }) :
        <Image src={Icon} alt={label} width={44} height={44} />
        }
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
