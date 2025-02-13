import { FC } from "react";
import { buttonStyles } from "./styles";
import ArrowUp from "../../assets/arrow-up.svg?react";
import { upvoteStore } from "../../store/upvoteStore";

interface UpvoteProps {
  rowId: number;
  isActive: boolean;
}

export const Upvote: FC<UpvoteProps> = ({ rowId, isActive }) => {
  const toggleUpvote = upvoteStore(state => state.toggleUpvote);

  return (
    <button
      onClick={() => toggleUpvote(rowId)}
      className={buttonStyles({ active: isActive })}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
