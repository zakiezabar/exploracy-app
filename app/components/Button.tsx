'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: String;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    p-2
    ${outline ? 'bg-white' : 'bg-primary-400'}
    ${outline ? 'border-gray-200' : 'border-primary-500'}
    ${outline ? 'text-black' : 'text-black'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-semibold' : 'font-bold'}
    ${small ? 'border-[1px]' : 'border-[1px]'}
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
        flex
        inline-flex
        left-4
        top-3
        mr-4
        "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
