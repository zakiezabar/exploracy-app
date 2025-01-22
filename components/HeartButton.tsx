"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../app/types";
import useFavorite from "../app/hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className={`
        relative hover:opacity-80 transition cursor-pointer rounded-full border
        ${hasFavorited ? "border-mono-200/0 bg-pink-400/20 hover:scale-110 transition" : "border-mono-200 bg-mono-100/40 hover:scale-110 transition"}
        p-2
      `}
    >
      {hasFavorited ? (
        <AiFillHeart size={16} className="fill-pink-400" />
      ) : (
        <AiOutlineHeart size={16} className="fill-mono-800" />
      )}
    </div>
  );
};

export default HeartButton;
