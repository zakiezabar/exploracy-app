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
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useMalaysianStates();

    const title = data.title.length > 26 ? data.title.substring(0, 25) + '...' : data.title;
    
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
            <div className="flex flex-col gap-2 -full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-125
                            transition
                            duration-300
                            ease-in-out
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-base capitalize">
                    {title}<br></br> <span className="font-light text-base">{location?.label}</span>
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row item-center gap-1">
                    <div className="font-semibold">
                        MYR {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">/pax</div>
                    )}
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