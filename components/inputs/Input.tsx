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
  register: UseFormRegister<any>;
  errors: FieldErrors;
  capitalize?: boolean;
  multiline?: boolean;
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
  multiline,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <span className="text-neutral-400 absolute top-[20px] text-sm left-2">
          MYR
        </span>
      )}
      {multiline ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          className={`
            peer
            w-full
            p-4
            min-h-[150px]
            bg-white
            border
            border-primary-300
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
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={type}
          className={`
            peer
            w-full
            py-4
            bg-white
            border
            rounded-lg
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:bg-slate-50
            focus:border-2
            focus:border-mono-800
            ${formatPrice ? 'pl-12' : 'pl-3'}
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            ${capitalize ? 'capitalize' : 'normal-case'}
          `}
        />
      )}
      <label
        className={`
          absolute
          text-sm
          duration-150
          transform
          -translate-y-3
          top-1
          origin-[0]
          bg-white
          ${formatPrice ? 'left-12' : 'left-3'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
          peer-enabled:scale-40
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
