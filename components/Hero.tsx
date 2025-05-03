"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserProgress } from "./UserProgress";
import HeroEvent from "@/components/HeroEvent";

export const Hero: React.FC = () => {
  const [points, setPoints] = useState(0);
  const [hasHeroEvent, setHasHeroEvent] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await fetch(`/api/users/points`, {
          method: "GET", // Default is GET, but it's good to specify
          credentials: "include", // Ensure cookies/session are included in the request
        });

        if (response.ok) {
          const data = await response.json();
          setPoints(data.points || 0);
        } else {
          console.error("Failed to fetch points:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    }

    fetchPoints();
  }, []);

  // Fetch Hero Event availability
  useEffect(() => {
    async function checkHeroEvent() {
      try {
        const res = await fetch("/api/listings/hero/hero-events");
        const data = await res.json();
        setHasHeroEvent(data.length > 0);
      } catch (error) {
        console.error("Failed to fetch HeroEvent listings", error);
        setHasHeroEvent(false); // fallback to avoid infinite loading
      }
    }

    checkHeroEvent();
  }, []);

  
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full ">
      {hasHeroEvent === null ? (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-xl">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : hasHeroEvent ? (
        <HeroEvent />
      ) : (
        <div className="relative bg-[url('/images/hero-main.jpg')] bg-cover bg-center h-[400px] md:h-[300px] w-full flex flex-col justify-end items-end rounded-2xl p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
          <div className="relative flex flex-col w-full items-start md:items-end gap-2">
            <div className="text-left md:text-right drop-shadow-md">
              <p className="text-white text-xl md:text-3xl font-bold">
                A diffent light to discover
              </p>
              {/* <p className="text-white/80 text-sm font-normal">
                12th–24th April 2025
              </p> */}
            </div>
            {/* <Button variant={"primary"} size={"default"}>
              Book now!
            </Button> */}
          </div>
        </div>
      )}
      <div className="relative bg-[url('/images/hero3.png')] bg-cover bg-center md:h-[300px] flex flex-col justify-between rounded-2xl p-2">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
        <div className="relative flex flex-row-reverse items-center justify-between">
          <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg shadow-mono-900/20 w-full">
              <UserProgress
                badgeIcon={"badgeIcon"}
                badgeName={"Warm-up"}
                level={1}
                points={points}
              />
          </div>   
        </div>
        <div className="relative flex flex-col w-full items-end">
          <p className="text-white/90 text-2xl font-bold">
            Ignite your passion
          </p>
          <p className="text-white/80 text-md font-normal">The adventure begins today!</p>
        </div>
      </div>
    </div>
  );
};