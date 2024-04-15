'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'))

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  category: {
        icon: React.ComponentType<{ size: number }>;
        label: string;
        description: string;
      } | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gao-2">
        <div
          className="
          text-base
          font-semibold
          flex
          flex-row
          items-center
          gap-2
        "
        >
          <div className="flex flex-col gap-2">
            <Avatar src={user?.image} />
            <div>Hosted by {user?.name}</div>
          </div>
        </div>
        <div
          className="
        flex
        flex-row
        items-center
        gap-4
        font-light
        text-neutral-500"
        >
          <div>Total pax: {guestCount}</div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-base font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
