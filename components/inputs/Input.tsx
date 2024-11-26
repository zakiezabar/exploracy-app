'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  capitalize?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  capitalize,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        // <BiDollar
        //   size={24}
        //   className="
        //         text-neutral-700
        //         absolute
        //         top-5
        //         left-2
        //         "
        // />
        <span
          className="
      text-neutral-400
      absolute
      top-[20px]
      text-sm
      left-2
    "
        >
          MYR
        </span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4
        bg-white
        border-2
        rounded-lg
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        focus:bg-slate-50
        ${formatPrice ? 'pl-12' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        ${capitalize ? 'capitalize' : 'normal-case'}
      `}
      />
      <label
        className={`
        absolute
        text-xs
        duration-150
        transform
        -translate-y-3
        top-5
        
        origin-[0]
        ${formatPrice ? 'left-12' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
