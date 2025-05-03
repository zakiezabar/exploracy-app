'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
import { X } from 'lucide-react';
import { useState, useRef, KeyboardEvent } from 'react';

interface EmailChip {
  email: string;
  valid: boolean;
}

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
  isEmailInput?: boolean;
  onEmailsChange?: (emails: string[]) => void;
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
  isEmailInput,
  onEmailsChange,
}) => {

  const [emailChips, setEmailChips] = useState<EmailChip[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addEmailChip = (email: string) => {
    const trimmedEmail = email.trim();
    if (trimmedEmail) {
      const isValid = validateEmail(trimmedEmail);
      const newChips = [...emailChips, { email: trimmedEmail, valid: isValid }];
      setEmailChips(newChips);
      onEmailsChange?.(newChips.filter(chip => chip.valid).map(chip => chip.email));
      setInputValue('');
    }
  };

  const removeEmailChip = (index: number) => {
    const newChips = emailChips.filter((_, i) => i !== index);
    setEmailChips(newChips);
    onEmailsChange?.(newChips.filter(chip => chip.valid).map(chip => chip.email));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addEmailChip(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && emailChips.length > 0) {
      removeEmailChip(emailChips.length - 1);
    } else if (e.key === ',' || e.key === ' ') {
      e.preventDefault();
      if (inputValue) {
        addEmailChip(inputValue);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const emails = pastedText.split(/[,\s]+/);
    emails.forEach(email => {
      if (email) addEmailChip(email);
    });
  };

  if (isEmailInput) {
    return (
      <div className="w-full relative">
        <div
          className={`
            peer
            w-full
            min-h-[56px]
            bg-white
            border
            rounded-lg
            outline-none
            transition
            p-2
            flex
            flex-wrap
            gap-1
            items-center
            cursor-text
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus-within:border-rose-500' : 'focus-within:border-black'}
          `}
          onClick={() => inputRef.current?.focus()}
        >
          {emailChips.map((chip, index) => (
            <div
              key={index}
              className={`
                flex
                items-center
                gap-1
                px-2
                py-1
                rounded-full
                text-sm
                ${chip.valid ? 'bg-primary-100' : 'bg-rose-100'}
              `}
            >
              <span className={chip.valid ? 'text-primary-800' : 'text-rose-800'}>
                {chip.email}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmailChip(index);
                }}
                className={`
                  hover:bg-primary-200
                  rounded-full
                  p-0.5
                  ${chip.valid ? 'text-primary-800' : 'text-rose-800'}
                `}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="flex-grow outline-none min-w-[120px] bg-transparent"
            placeholder={emailChips.length === 0 ? "Enter email addresses" : ""}
          />
        </div>
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
            left-3
            z-10
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}
        >
          {label}
        </label>
      </div>
    );
  }

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
          z-10
          ${formatPrice ? 'left-12' : 'left-3'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
          peer-enabled:scale-40
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        <span className='test'>{label}</span>
      </label>
    </div>
  );
};

export default Input;
