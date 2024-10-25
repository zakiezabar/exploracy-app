import Image from "next/image";

type Props = {
    badgeIcon: string;
    badgeName: string;
    points: number;
    level: number;
};

export const UserProgress = ({ badgeIcon, badgeName, points, level }: Props ) => {
    return (
        <div className="flex items-center justify-between gap-x-4 min-w-[300px]">
            <div className="flex items-center gap-x-2">
                <Image
                    src="/exploracy-icon-main.svg"
                    alt="logo"
                    className="rounded-md border" 
                    width={44}
                    height={44}
                />
                <div>
                    <p className="text-secondary-600 text-xs">Level {level} </p>
                    <p className="font-bold text-base">{badgeName}</p>  
                </div>
            </div>
            <div className="flex items-center gap-2">
                Pts.
                <div className="flex bg-secondary-600 text-lg text-primary-400 h-[44px] w-[44px] items-center justify-center rounded-md">
                    {points}
                </div>
            </div>
        </div>
    )
};