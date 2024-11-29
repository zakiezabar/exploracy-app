'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full hover:shadow-lg transition"
      height="42"
      width="42"
      alt="Avatar"
      src={src || '/images/placeholder.png'}
    />
  );
};

export default Avatar;
