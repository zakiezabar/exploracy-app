'use client';

import { cn } from '@/lib/utils';
import Logo from '@/components/navbar/Logo';
import UserMenu from './UserMenu';

import { SafeUser } from '@/app/types';
import { Search } from './Search';
import Image from 'next/image';

interface NavbarProps {
  currentUser?: SafeUser | null;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, className }) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center lg:justify-between bg-white lg:w-full lg:fixed px-2 md:px-8 py-4 z-40 mb-2",
      className,
    )}>
      <div className="flex flex-col md:flex-row gap-4">
        <Image src="/exploracy-full-dark.svg" width={200} height={44} alt="Exploracy" className="md:hidden"/>
        <Logo />
        <Search />
      </div>
      <div className="flex gap-2 items-center">
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Navbar;
