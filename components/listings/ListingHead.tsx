'use client';

import React from "react";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useMalaysianStates from "@/app/hooks/useMalaysianStates";
import Link from "next/link";
import Avatar from "@/components/Avatar";

interface ListingHeadProps {
  user: SafeUser;
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  user,
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useMalaysianStates();
  const location = getByValue(locationValue);
  console.log("Location Data:", location);
  console.log("User data:", {
    id: user?.id,
    name: user?.name,
    image: user?.image
  });

  return (
    <div className="flex flex-col gap-4 pt-4 ">
      <div className="flex flex-col gap-1">
        <Heading
          title={title}
          // subtitle={`${location?.label}`}
        />
        <div className="flex flex-row justify-between items-baseline">
          <div className="font-semibold text-base flex flex-row items-center gap-2">
            <Link
              href={`/user/${user?.id}`}
              onClick={() => {(user?.id);
              }}
              >
              <Avatar src={user?.image} user={user} />
            </Link> 
            <div>{user?.name}</div>
          </div>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
      <div
      className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full hover:scale-125 transition ease-in-out duration-700"
        />
        {/* <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div> */}
      </div>
    </div>
  );
}
 
export default ListingHead;