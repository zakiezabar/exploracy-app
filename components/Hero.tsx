// import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { UserProgress } from "./UserProgress";

export const Hero: React.FC = () => {
  // return (
  //     <div className="bg-slate-400 w-full">
  //         <div className="flex items-center gap-x-2">
  //             <UserProgress
  //                 badgeIcon={"badgeIcon"}
  //                 badgeName={"badgeName"}
  //                 points={100}
  //             />
  //         </div>
  //     </div>
  // )
  return (
    <div className="flex flex-row gap-6 w-full">
      <div className="relative bg-[url('/images/hero-main.jpg')] bg-cover bg-top h-[300px] w-full flex flex-col justify-end items-end rounded-2xl p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
        <div className="relative flex flex-col w-full items-end gap-2">
          <div className="flex flex-col items-end drop-shadow-md">
            <p className="text-white text-3xl font-bold ">
              Mt. Rinjani Open Trip
            </p>
            <p className="text-white/80 text-sm font-normal">12th-24th April 2025</p>
            
          </div>
          <Button
            variant={"primary"}
            size={"default"}
          >
            Book now!
          </Button>
        </div>
      </div>
      <div className="relative bg-[url('/images/hero3.png')] bg-cover bg-center h-[300px] flex flex-col justify-between rounded-2xl p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
        <div className="relative flex flex-row-reverse items-center justify-between w-full">
          <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg shadow-mono-900/20">
              <UserProgress
                      badgeIcon={"badgeIcon"}
                      badgeName={"Warm-up"}
                      level={1}
                      points={100}
              />
          </div>   
        </div>
        <div className="relative flex flex-col w-full items-end">
          <p className="text-white/90 text-2xl font-bold">
            Ignite your journey
          </p>
          <p className="text-white/80 text-md font-normal">Lay the foundation</p>
        </div>
      </div>
    </div>
    
  );
};