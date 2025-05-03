"use client";

import useCountries from "@/app/hooks/useCountries";
import useMalaysianStates from "@/app/hooks/useMalaysianStates";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { get } from "http";
import { MapPin } from 'lucide-react';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  smallCard?: boolean;
  showStatus?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  smallCard,
  showStatus = false,
}) => {
  const router = useRouter();
  const { getByValue } = useMalaysianStates();

  // const title = data.title.length > 26 ? data.title.substring(0, 25) + '...' : data.title;
  const title = data.title;
  const category = getByValue(data.category);

  const location = getByValue(data.locationValue);
  console.log("Location data:", location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const getStatusColor = (approved: boolean) => {
    if (approved === true) return "bg-green-100 text-green-800 border-green-200";
    if (approved === false) return "bg-mustard-600/20 text-mustard-600 border-mustard-600";
    return "bg-salmon-400/2- text-salmon-400 border-salmon-400";
  };

  const getStatusText = (approved: boolean | null) => {
    if (approved === true) return "Approved";
    if (approved === false) return "Pending";
    return "rejected"
  };

  const isOwner = currentUser?.id === data.userId;
  const shouldShowStatus = showStatus && isOwner;

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
                col-span-1 cursor-pointer group
        "
    >
      <div className="flex flex-col gap-2 w-full mb-0 md:mb-8">
        <div className="w-full relative overflow-hidden rounded-xl aspect-square">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className=" object-cover h-full w-full group-hover:scale-125 transition duration-700 ease-in-out"
          />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div className="absolute top-2 left-2 opacity-100 px-2 py-1 bg-primary-400/90 rounded-lg border-primary-600 border-2">
            <p className=" text-mono-900 text-xs">{data.category}</p>
          </div>
        </div>
        <div className="flex flex-col text-sm text-mono-900 ">
          <div className="font-bold line-clamp-2 capitalize">{title}</div>
          <div className="font-normal truncate flex flex-row items-center text-mono-400">
            <MapPin className="text-mono-400 size-5" />
            {location?.label || "Couldn't find location"}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row item-center gap-1 text-mono-900">
              <div>MYR {price}</div>
              {!reservation && <div className="font-normal">/pax</div>}
            </div>
            {shouldShowStatus && (
              <div className={`px-2 py-1 rounded-md border ${getStatusColor(data.approved)}`}>
              <span className="text-xs font-medium">
                {getStatusText(data.approved)}
              </span>
            </div>
            )}
          </div>
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
