'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useMalaysianStates from "@/app/hooks/useMalaysianStates";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useMalaysianStates();
  const location = getByValue(locationValue);
  console.log("Location Data:", location);

  return (
    <div className="flex flex-col gap-4 pt-4 ">
      <Heading
        title={title}
        subtitle={`${location?.label}`}
      />
      <div
      className="
        w-full
        h-[60vh]
        overflow-hidden
        rounded-xl
        relative
      ">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
 
export default ListingHead;