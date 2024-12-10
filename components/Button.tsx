'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label?: String;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  rounded?: boolean;
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  rounded,
  icon: Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    border-2
    border-b-4
    border-primary-500
    hover:opacity-80
    transition
    p-2
    ${outline ? 'bg-white' : 'bg-primary-400'}
    ${outline ? 'border-slate-200' : 'border-primary-500'}
    ${outline ? 'text-black' : 'text-black'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-semibold' : 'font-bold'}
    ${small ? 'border-[1px]' : 'border-[2px]'}
    ${rounded ? 'rounded-full flex justify-center items-center w-11 h-11' : 'rounded-lg'}
    ${className ?? "w-full"}
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
        flex
        left-4
        top-3
        mx-1
        "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
