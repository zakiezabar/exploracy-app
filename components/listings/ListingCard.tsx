'use client'

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
import { LocationPinIcon } from "../svg/location-pin";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useMalaysianStates();

    // const title = data.title.length > 26 ? data.title.substring(0, 25) + '...' : data.title;
    const title = data.title;
    const category = getByValue(data.category)
    
    const location = getByValue(data.locationValue);
    console.log("Location data:", location);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
        
        if (disabled) {
            return;
        }

        onAction?.(actionId);
        }, [onAction, actionId, disabled])
    
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

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
                col-span-1 cursor-pointer group
        ">
            <div className="flex flex-col gap-2 w-full mb-0 md:mb-8">
                <div className=" w-full relative overflow-hidden rounded-xl h-[360px]">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className=" object-cover h-full w-full group-hover:scale-125 transition duration-300 ease-in-out"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="absolute top-2 left-2 opacity-100 px-2 py-1 bg-primary-400/90 rounded-lg border-primary-600 border-2">
                        <p className=" text-mono-900 text-xs">{data.category}</p>
                    </div>
                </div>
                <div className="flex flex-col text-base text-mono-900 capitalize">
                    <div className="font-bold line-clamp-2">{title}</div>
                    <div className="font-normal truncate flex flex-row items-center"><LocationPinIcon />{location?.label}</div>
                    <div className="flex flex-row item-center gap-1 text-mono-900">
                    <div className="">
                        MYR {price}
                    </div>
                    {!reservation && (
                        <div className="font-normal">/pax</div>
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
}
 
export default ListingCard;