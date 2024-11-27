'use client';

import Image from 'next/image';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: React.ComponentType<{ size: number}> | string;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  isRequired?: boolean; // New prop to indicate if the selection is required
  error?: boolean; // New prop to indicate error state (e.g., submission attempted without selection)
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
  isRequired = false,
  error = false,
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
        ${selected ? 'bg-slate-100' : 'bg-white'}
        ${selected ? 'shadow-lg shadow-primary-400/40' : 'shadow-none'}
        ${error && isRequired && !selected ? 'border-red-500' : ''}
        `}
    >
      { isIconComponent ?
        React.createElement(Icon, { size: 24 }) :
        <Image src={Icon} alt={label} width={44} height={44} />
      }
      <div className="font-semibold ${error && isRequired && !selected ? 'text-red-500' : ''}">{label}</div>
    </div>
  );
};

export default CategoryInput;
