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
    <Sheet>
      <SheetTrigger className="">
        <PanelRight className="text-mono-900 hover:text-primary-200" />
      </SheetTrigger>
      <Image src="/exploracy-full-main.svg" alt="Exploracy" width={140} height={140} />
      <SheetContent className="bg-primary-400 flex flex-col justify-between p-8 z-[100]" side="left">
        <div className="py-8">
          <Logo/>
        </div>
        {currentUser ? (
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-2 font-bold">

            <MenuItem onClick={() => router.push("/trips")} label="Leadeboard" iconSrc="/icons/Award.svg"/>
            <MenuItem onClick={activityType} label="Create Activity" iconSrc="/icons/Plus square.svg" />
            <MenuItem onClick={() => router.push("")} label="Inbox" iconSrc="/icons/Message circle.svg" />
          </div>
          <div
            onMouseEnter={toggleOpen}
            className="border-neutral-200 items-center cursor-pointer"
            >
              <div className="md:block flex flex-row justify-end md:justify-normal">
                <Avatar src={currentUser?.image} />
              </div>
          </div>
          {isOpen && (
            <div
              onMouseLeave={toggleOpen}
              className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm font-normal"
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
        
      </SheetContent>
      <ActivityTypeModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onPublic={onRentModalOpen}
        onPrivate={onPrivateModalOpen}
      />
    </Sheet>
    
  );
};

export default MobileSidebar;
