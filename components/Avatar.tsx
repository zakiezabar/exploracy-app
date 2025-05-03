'use client';

import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { SafeUser } from '@/app/types';

interface AvatarProps {
  src: string | null | undefined;
  user?: SafeUser | null;
  size?: 'sm' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ src, user, size = "sm"}) => {
  const colors = useMemo(() => [
    'bg-primary-600', 'bg-secondary-400', 'bg-mustard-600', 
    'bg-purple-400', 'bg-salmon-400', 'bg-pink-400'
  ], []);

  const dimensions = size === 'lg' ? 'h-24 w-24' : 'h-11 w-11';
  const imgDimensions = size === 'lg' ? '96' : '44';
  
  const getRandomColor = useCallback(() => {
    const hash = user?.name?.split('').reduce((acc, char) => 
      char.charCodeAt(0) + ((acc << 5) - acc), 0);
    return colors[Math.abs(hash || 0) % colors.length];
  }, [user?.name, colors]);

  const getInitials = useCallback(() => {
    return user?.name 
      ? user.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
      : '';
  }, [user?.name]);

  return src ? (
    <Image
      className={`rounded-full hover:shadow-lg transition border-2 border-secondary-100 hover:scale-90`}
      height={imgDimensions}
      width={imgDimensions}
      alt="Avatar"
      src={src}
    />
  ) : (
    <div className={`flex items-center justify-center rounded-full ${getRandomColor()} hover:shadow-lg transition border-2 border-secondary-100 ${dimensions}`}>
     <span className={`${size === 'lg' ? 'text-4xl' : 'text-sm'} font-medium text-mono-200`}>{getInitials()}</span>
    </div>
  );
};

export default Avatar;
