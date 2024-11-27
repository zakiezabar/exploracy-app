'use client';

import Image from 'next/image';
import React from 'react';

interface ImageButtonProps {
  imageSrc: string; // URL of the image
  title: string; // Text to display on the button
  onClick: () => void; // Function to call when the button is clicked
  disabled?: boolean; // Optional disabled state
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageSrc, title, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 border-2 hover:bg-slate-100 cursor-pointer'
      }`}
    >
      <div className="relative w-24 h-16 mb-2">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="w-16 h-16 mb-2"
        />
      </div>
      <span>{title}</span>
    </button>
  );
};

export default ImageButton;
