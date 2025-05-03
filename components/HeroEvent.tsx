"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";

import { Button } from "./ui/button";

import { format } from "date-fns";
import Image from "next/image";
import { get } from "http";

interface HeroData {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
}

const HeroEvent = () => {
  const [hero, setHero] = useState<HeroData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHeroEvent = async () => {
      try {
        const res = await fetch("/api/listings/hero");
        const data = await res.json();
        if (data?.length > 0) {
          setHero(data[0]); // or map through if more than one
        }
      } catch (err) {
        console.error("Failed to load hero event", err);
      }
    };

    fetchHeroEvent();
  }, []);

  if (!hero) return null;

  return (
    <div
      className="relative bg-cover bg-center h-[400px] md:h-[300px] w-full flex flex-col justify-end items-end rounded-2xl p-4"
      style={{ backgroundImage: `url(${hero.imageSrc})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
      <div className="relative flex flex-col w-full items-start md:items-end gap-2">
        <div className="text-left md:text-right drop-shadow-md">
          <p className="text-white text-xl md:text-3xl font-bold">
            {hero.title}
          </p>
          <p className="text-white/80 text-sm font-normal">
            {hero.description ?? "Date to be announced"}
          </p>
        </div>
        <Button
          variant="primary"
          size="default"
          onClick={() => router.push(`/listings/${hero.id}`)}
        >
          View details
        </Button>
      </div>
    </div>
  );
};

export default HeroEvent;
