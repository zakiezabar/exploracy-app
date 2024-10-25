'use client';

import { cn } from '@/lib/utils';
// import Container from '../Container';
// import Hero from '../Hero';
// import Categories from './Categories';
import Logo from './Logo';
import UserMenu from './UserMenu';

import { SafeUser } from '@/app/types';
import { Search } from './Search';

interface NavbarProps {
  currentUser?: SafeUser | null;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, className }) => {
  return (
    <div className={cn(
      "flex flex-row items-center justify-between bg-white lg:w-full lg:fixed px-8 py-4 z-50 mb-2",
      className,
    )}>
      <div className="flex gap-4 items-center">
        <Logo />
        <Search />
      </div>
      <div className="flex gap-2 items-center">
        <UserMenu currentUser={currentUser} />
    </div>
      {/* <Hero />
      <Categories /> */}
    </div>
  );
};

export default Navbar;
