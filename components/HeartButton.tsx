'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../app/types";
import useFavorite from "../app/hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    })
    
    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer bg-white rounded-md p-1">
            <AiOutlineHeart
                size={16}
                className="fill-mono-900 absolute"/>
            <AiFillHeart
                size={16}
                className={
                    hasFavorited ? 'fill-primary-600' : 'fill-neutral-500/0'
                }
            />
        </div>
    );
}
 
export default HeartButton;