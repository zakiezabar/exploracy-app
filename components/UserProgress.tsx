import Image from "next/image";

type Props = {
    badgeIcon?: string;
    badgeName: string;
    points: number;
    level: number;
};

export const UserProgress = ({ badgeIcon, badgeName, points, level }: Props ) => {
    return (
        <div className="flex items-center justify-between w-full md:w-[300px]">
            <div className="flex flex-row items-center gap-x-2 ">
                {/* <Image
                    src="/exploracy-icon-light.svg"
                    alt="logo"
                    className="rounded-md border-primary-600 border-2 md:w-11 md:h-11 w-8 h-8 bg-primary-400 p-1" 
                    width={44}
                    height={44}
                /> */}
                <div>
                    <p className="text-secondary-300 text-xs">Level {level} </p>
                    <p className="text-secondary-600 font-bold text-sm md:text-base">{badgeName}</p>  
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
                Pts.
                <div className="flex min-w-[44px] bg-secondary-600 text-md md:text-lg text-primary-400 p-2 items-center justify-center rounded-md">
                    {points}
                </div>
            </div>
        </div>
    )
};