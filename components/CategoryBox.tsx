'user client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from "query-string";
import Image from 'next/image';

interface CategoryBoxProps {
  icon: React.ComponentType<{ size: number}> | string;
  label: string;
  label2?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, label2, selected }) => {
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
    gap-x-8
    min-w-[110px]
    md:min-w-[120px]
    pt-2
    py-4
    border-b-4
    hover:text-secondary-400
    hover:bg-secondary-100
    transition-all
    cursor-pointer
    rounded-xl
    ${selected ? 'border-b-slate-200' : 'border-transparent'}
    ${selected ? 'text-secondary-400' : 'text-mono-900'}
    ${selected ? 'bg-secondary-100' : 'bg-transparent'}
    `}
    >
        { isIconComponent ?
        React.createElement(Icon, { size: 64 }) :
        <Image src={Icon} alt={label} width={64} height={64} />
        }
        <div className="flex flex-col text-sm">
          <div className="font-semibold text-mono-900">
            {label}
          </div>
          <div className="font-normal text-mono-600">
            {label2}
          </div>
        </div>
    </div>
  );
};

export default CategoryBox;
