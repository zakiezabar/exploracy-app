'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import usePrivateRentModal from '@/app/hooks/usePrivateRentModal';
import useEmptyModal from '@/app/hooks/useEmptyModal';
import ActivityTypeModal from '../modals/ActivityTypeModal';

import { signIn, signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const { onOpen: onRentModalOpen } = useRentModal();
  const { onOpen: onPrivateModalOpen } = usePrivateRentModal();
  const { onOpen: onEmptyModalOpen } = useEmptyModal();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, SetIsOpen] = useState(false);

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const activityType = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      setIsActivityModalOpen(true);
    }
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      {currentUser ? (
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={activityType}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-primary-100 hover:shadow-md transition cursor-pointer"
          >
            Create Activity
          </div>
          <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:bg-primary-100 hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
          {isOpen && (
            <div
              className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
            >
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={() => router.push("/trips")} label="My bookings" />
                <MenuItem onClick={() => router.push("/favorites")} label="My favorites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                <MenuItem onClick={() => router.push("/properties")} label="My listing activities" />
                <MenuItem onClick={activityType} label="Create new activity" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <Button
            outline
            label="Login with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
          />
        </div>
      )}

      <ActivityTypeModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onPublic={onRentModalOpen}
        onPrivate={onPrivateModalOpen}
      />
    </div>
  );
};

export default UserMenu;