'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt="Explorcy"
      className=" cursor-pointer"
      width={200}
      height={200}
      src="/exploracy-full-dark.svg"
    />
  );
};

export default Logo;
