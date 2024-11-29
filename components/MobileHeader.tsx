'use client';

// import { cn } from '@/lib/utils';
// import Container from '../Container';
// import Hero from '../Hero';
// import Categories from './Categories';
import MobileSidebar from "@/components/MobileSidebar";

import { SafeUser } from '@/app/types';
import UserMenu from '@/components/navbar/UserMenu';
import Navbar from './navbar/Navbar';


interface MobileHeaderProps {
  currentUser?: SafeUser | null;
  className?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ currentUser, className }) => {
    return (
        <nav className="lg:hidden px-6 py-8 h-[50px] flex flex-row items-center bg-mono-100 border-b fixed top-0 w-full z-40 text-mono-200">
            <MobileSidebar currentUser={currentUser}/>
        </nav>
    );
};

export default MobileHeader;

