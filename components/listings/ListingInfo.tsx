'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react';
import Avatar from '@/components/Avatar';
import ListingCategory from './ListingCategory';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import dynamic from 'next/dynamic';
import Heading from '../Heading';
import Link from 'next/link';

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
    <div className="col-span-4 flex flex-col gap-8 pb-16">
      <div className="flex flex-col">
        <div className="text-xl font-bold">
          {locationDetails}<span className="font-normal">, {locationValue}</span>
        </div>
        <div className="text-lg">
          {description} 
        </div>
        <div className="flex flex-row gap-2 pt-2">
          <div className="text-mono-600 pr-2 border-r-2 border-mono-400">{guestCount || "Not specified"} pax</div>
          <div className="text-mono-600">Difficulty: {difficulty || "Normal"}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-secondary-100 p-4 rounded-xl">
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        
      </div>
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
