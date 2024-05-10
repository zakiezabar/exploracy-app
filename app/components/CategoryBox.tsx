'user client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from "query-string";
import Image from 'next/image';

interface CategoryBoxProps {
  icon: React.ComponentType<{ size: number}> | string;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
        currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
        ...currentQuery,
        category: label
    }

    if (params?.get('category') == label) {
        delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
    }, {skipNull: true});

    router.push(url);
  }, [label, params, router]);

  const isIconComponent = typeof Icon === 'function';

    return (
    <div
    onClick={handleClick}
      className={`
    flex
    flex-col
    items-center
    gap-2
    p-3
    border-b-4
    hover:text-black
    transition
    cursor-pointer
    w-full
    rounded-xl
    ${selected ? 'border-b-slate-200' : 'border-transparent'}
    ${selected ? 'text-black' : 'text-neutral-400'}
    ${selected ? 'bg-slate-100' : 'bg-transparent'}
    `}
    >
        { isIconComponent ?
        React.createElement(Icon, { size: 24 }) :
        <Image src={Icon} alt={label} width={24} height={24} />
        }
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  );
};

export default CategoryBox;
