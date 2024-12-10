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

interface ListingCardListProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCardList: React.FC<ListingCardListProps> = ({
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
    const description = data.description;
    const category = getByValue(data.category)
    const user = data.userId;
    
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
                flex flex-col cursor-pointer group
        ">
            <div className="flex gap-2 w-full mb-0 md:mb-8 items-center">
                <div className=" w-[240px] h-[180px] relative overflow-hidden rounded-xl object-cover ">
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
                <div className="flex flex-col text-base text-mono-900 capitalize w-full">
                    <div className="font-bold line-clamp-2">{title}</div>
                    <div className="line-clamp-2">{description}</div>
                    <div className="line-clamp-2">{user}</div>
                    <div className="font-normal truncate flex flex-row items-center"><LocationPinIcon />{location?.label}</div>
                    <div className="flex flex-row item-center gap-1 text-mono-900">
                        <div className="">MYR {price} /pax</div>
                        {/* {!reservation && (
                            <div className="font-normal">/pax</div>
                        )} */}
                    </div>
                        {onAction && actionLabel && (
                            <Button
                                disabled={disabled}
                                small
                                label={actionLabel}
                                onClick={handleCancel}
                                className="w-auto"
                                outline
                            />
                        )}
                </div>
                
            </div>
        </div>
     );
}
 
export default ListingCardList;