'use client';

import { useRouter } from 'next/navigation';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import usePrivateRentModal from '@/app/hooks/usePrivateRentModal';
import useEmptyModal from '@/app/hooks/useEmptyModal';
import useCreateActivityModal from '@/app/hooks/useCreateCreateActivityModal';
import ActivityTypeModal from '../modals/ActivityTypeModal';

import { signIn, signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import CreateActivityModal from '@/components/modals/CreateActivityModal';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const createActivityModal = useCreateActivityModal();
  // const { onOpen: onRentModalOpen } = useRentModal();
  // const { onOpen: onPrivateModalOpen } = usePrivateRentModal();
  // const { onOpen: onEmptyModalOpen } = useEmptyModal();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // const rentModal = useRentModal();

  const [isOpen, SetIsOpen] = useState(false);

  // const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value);
  }, []);

  const onCreateActivity = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    createActivityModal.onOpen();
  }, [currentUser, loginModal, createActivityModal]);

  // const onRent = useCallback(() => {
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }
  //   rentModal.onOpen();
  // }, [currentUser, loginModal, rentModal]);

  // const activityType = useCallback(() => {
  //   if (!currentUser) {
  //     loginModal.onOpen();
  //   } else {
  //     setIsActivityModalOpen(true);
  //   }
  // }, [currentUser, loginModal]);

  return (
    <div className="relative">
      {currentUser ? (
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex gap-2 items-center font-bold">

            <MenuItem onClick={() => router.push("/leaderboard")} label="Leaderboard" iconSrc="/icons/Award.svg"/>
            <MenuItem onClick={() => router.push("/createActivity")} label="Create Activity" iconSrc="/icons/Plus square.svg" />
            <MenuItem onClick={() => router.push("")} label="Inbox" iconSrc="/icons/Message circle.svg" />
          </div>
          <div
            onMouseEnter={toggleOpen}
            className="border-neutral-200 items-center cursor-pointer"
            >
              <div className="md:block">
                <Avatar src={currentUser?.image} user={currentUser}/>
              </div>
          </div>
          {isOpen && (
            <div
              onMouseLeave={toggleOpen}
              className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm font-normal"
            >
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={() => router.push("/bookings")} label="My bookings" />
                <MenuItem onClick={() => router.push("/favorites")} label="My favorites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                <MenuItem onClick={() => router.push("/properties")} label="My listing activities" />
                <MenuItem onClick={onCreateActivity} label="Create new activity" />
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

      <CreateActivityModal 
        isOpen={createActivityModal.isOpen}
        onClose={createActivityModal.onClose}
      />

      {/* <ActivityTypeModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onPublic={onRentModalOpen}
        onPrivate={onPrivateModalOpen}
      /> */}
    </div>
  );
};

export default UserMenu;