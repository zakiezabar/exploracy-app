"use client";

import { Range } from "react-date-range";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";

import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { categories } from "@/components/navbar/Categories";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { Button } from "@/components/ui/button";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

interface HeroEventDate {
  startDate: string;
  endDate: string;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [heroDates, setHeroDates] = useState<HeroEventDate[]>([]);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchHeroDates = async () => {
      if (listing.heroEvent) {
        try {
          const res = await fetch(`/api/listings/${listing.id}/hero-dates`);
          const data = await res.json();
          setHeroDates(data);
        } catch (error) {
          console.error("Failed to fetch hero event dates:", error);
        }
      }
    };

    fetchHeroDates();
  }, [listing.id, listing.heroEvent]);

  const handleHeroReservation = () => {
    if (selectedHeroIndex === null) return;

    const startDate = new Date(
      heroDates[selectedHeroIndex].startDate
    ).toISOString();
    const endDate = new Date(
      heroDates[selectedHeroIndex].endDate
    ).toISOString();

    const queryString = new URLSearchParams({
      listingId: listing.id,
      price: listing.price.toString(),
      startDate,
      endDate,
      totalPrice: totalPrice.toString(),
    }).toString();

    router.push(`/listings/review?${queryString}`);
  };

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    const startDate =
      listing.heroEvent && selectedHeroIndex !== null
        ? new Date(heroDates[selectedHeroIndex].startDate)
        : dateRange.startDate;

    const endDate =
      listing.heroEvent && selectedHeroIndex !== null
        ? new Date(heroDates[selectedHeroIndex].endDate)
        : dateRange.endDate;

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Activity reserved!");
        setDateRange(initialDateRange);
        router.push("/review");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    heroDates,
    selectedHeroIndex,
    listing?.id,
    router,
    currentUser,
    loginModal,
    listing.heroEvent,
  ]);

  useEffect(() => {
    //   if (dateRange.startDate && dateRange.endDate) {
    //     const dayCount = differenceInCalendarDays(
    //       dateRange.endDate,
    //       dateRange.startDate
    //     );

    //     if (dayCount && listing.price) {
    //       setTotalPrice(dayCount * listing.price);
    //     } else {
    //       setTotalPrice(listing.price);
    //     }
    //   }
    // }, [dateRange, listing.price]);
    if (!listing.heroEvent && dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setTotalPrice(dayCount > 0 ? dayCount * listing.price : listing.price);
    } else if (listing.heroEvent && selectedHeroIndex !== null) {
      // Fixed price — no multiplication
      setTotalPrice(listing.price);
    }
  }, [
    dateRange,
    listing.price,
    listing.heroEvent,
    selectedHeroIndex,
    heroDates,
  ]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6 pt-4">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            user={listing.user}
          />
          <div
            className="
            grid
            grid-col-1
            md:grid-cols-7
            md:gap-10
            mt-6
          "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              // Handle null values by providing a default empty value or string
              highlight={listing.highlight || "No highlight available"}
              whatsIncluded={
                listing.whatsIncluded || "No information available"
              }
              requirement={listing.requirement || "Np requirement available"}
              difficulty={listing.difficulty || "Not specified"}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              locationDetails={
                listing.locationDetails || "No location details provided"
              }
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              {listing.heroEvent ? (
                heroDates.length > 0 ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Date
                    </label>
                    <div className="space-y-2">
                      {heroDates.map((range, index) => {
                        const isSelected = selectedHeroIndex === index;

                        return (
                          <div
                            key={index}
                            onClick={() => setSelectedHeroIndex(index)}
                            className={`cursor-pointer p-4 border text-center text-sm rounded-lg ${
                              isSelected
                                ? "bg-secondary-400 text-white border-2 border-secondary-500 hover:bg-secondary-600"
                                : "bg-mono-100 text-mono-600 border-2 border-mono-300"
                            } hover:bg-secondary-100 hover:border-secondary-400 transition-all duration-300`}
                          >
                            {format(new Date(range.startDate), "d MMMM")} –{" "}
                            {format(new Date(range.endDate), "d MMMM yyyy")}
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-lg text-mono-800 font-bold text-center">
                      Total price: RM {totalPrice}
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleHeroReservation}
                      disabled={isLoading || selectedHeroIndex === null}
                      className="w-full"
                    >
                      Reserve
                    </Button>
                  </div>
                ) : (
                  <div>Loading hero dates...</div>
                )
              ) : (
                <ListingReservation
                  listingId={listing.id}
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
