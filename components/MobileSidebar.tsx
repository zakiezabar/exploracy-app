"use client"

import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import { useCallback, useState } from 'react';
import MenuItem from '@/components/navbar/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import usePrivateRentModal from '@/app/hooks/usePrivateRentModal';
import useEmptyModal from '@/app/hooks/useEmptyModal';
import ActivityTypeModal from '@/components/modals/ActivityTypeModal';

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { PanelRight } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Button from '@/components/Button';
import { FcGoogle } from 'react-icons/fc';
import Logo from '@/components/navbar/Logo';
import UserMenu from './navbar/UserMenu';
import Image from 'next/image';


interface MobileSidebarProps {
  currentUser?: SafeUser | null;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ currentUser }) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="flex flex-row justify-between items-center p-4">
        <Logo />
        <div className="md:block flex flex-row justify-end md:justify-normal">
          {currentUser ? (
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div
                onClick={() => router.push("/account")}
                className="border-neutral-200 items-center cursor-pointer"
                >
                  <div className="md:block">
                    <Avatar src={currentUser?.image} />
                  </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Button
                outline
                rounded
                // label="Login"
                icon={FcGoogle}
                onClick={() => signIn('google')}
              />
            </div>
          )}
          {/* <Avatar src={currentUser?.image} /> */}
        </div>
      </div>
    </header>
  );
};

export default MobileSidebar;
