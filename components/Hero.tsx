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
        <div className="bg-[url('/images/hero-main.jpg')] bg-cover bg-center h-[300px] flex flex-col justify-between rounded-2xl p-4">
            <div className="flex flex-row-reverse items-center justify-between w-full">
                <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg shadow-mono-900/20">
                    <UserProgress
                            badgeIcon={"badgeIcon"}
                            badgeName={"Warm-up"}
                            level={1}
                            points={100}
                    />
                </div>   
            </div>
            <div className="flex flex-row-reverse">
                <p className="text-white/80 text-2xl">
                Different light to discover
                </p>
            </div>
        </div>
    );
};