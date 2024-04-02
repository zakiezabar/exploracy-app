'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';

import { signIn, signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, SetIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  // Adjusted for simplicity and clarity.
  if (!currentUser) {
    return (
      <div className="flex flex-row items-center gap-4">
        <div
          // onClick={loginModal.onOpen} //to open login modal
          // className="text-sm font-semibold py-3 px-1 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {/* Login/Signup */}
          <Button
            outline
            label="Login with Google"
            icon={FcGoogle} 
            onClick={() => signIn('google')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                "
        >
          Create Activity
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My bookings" />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My activities" />
                <MenuItem onClick={rentModal.onOpen} label="Create new activity" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login / Signup" />
                {/* <MenuItem 
                    onClick={registerModal.onOpen}
                    label="Sign up"
                /> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
