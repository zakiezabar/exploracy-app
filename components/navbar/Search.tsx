'use client';

import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/app/hooks/useSearchModal';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Search = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="bg-mono-100 hover:bg-white border-mono-200 border rounded-xl flex items-center py-1 w-full md:w-[390px] justify-between text-mono-900 hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <div className="text-md px-4">
            What would you like to do?
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Image 
              src="/icons/Search.svg"
              alt="search"
              width={24}
              height={24}
          />
        </Button>
    </div>
  );
};