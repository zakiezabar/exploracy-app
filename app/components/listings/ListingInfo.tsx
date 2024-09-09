'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import dynamic from 'next/dynamic';
import Heading from '../Heading';

const Map = dynamic(() => import('../Map'))

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  highlight: string;
  whatsIncluded: string;
  requirement: string;
  difficulty: string;
  guestCount: number;
  category: {
        icon: React.ComponentType<{ size: number }> | string;
        label: string;
        description: string;
      } | undefined;
  locationValue: string;
  locationDetails: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  highlight,
  whatsIncluded,
  requirement,
  difficulty,
  guestCount,
  category,
  locationValue,
  locationDetails,
}) => {
  const { getByValue } = useCountries();

  // Get coordinates based on location value
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8 ">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col">
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
            <div>Hosted by {user?.name}</div>
            <Avatar src={user?.image} />
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
            <div className="text-sm">Total pax: {guestCount}</div>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div className="text-sm">Difficulty level:</div>
          <div className="text-base font-light text-neutral-500">
            {difficulty || "Not specified"} {/* Handle possible undefined value */}
          </div>
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
      <div className="flex flex-col">
        <Heading
          title="What you will do?"
        />
        <div className="text-base font-light text-neutral-500">
          {highlight || "No highlight available."} {/* Provide a default message */}
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <Heading
          title="What is included in this activity?"
        />
        <div className="text-base font-light text-neutral-500">
          {whatsIncluded || "No information available."} {/* Provide a default message */}
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <Heading
          title="Guests requirements"
        />
        <div className="text-base font-light text-neutral-500">
          {requirement || "No requirements specified."} {/* Provide a default message */}
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <Heading
          title="Location"
        />
        {/* <Map center={coordinates} /> */}
        <div className="text-base font-light text-neutral-500">
          {locationDetails || "No location details provided."} {/* Provide a default message */}
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
