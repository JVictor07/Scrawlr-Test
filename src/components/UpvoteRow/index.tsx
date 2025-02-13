import { memo } from "react";
import { Upvote } from "../Upvote";
import Plus from "../../assets/plus.svg?react";
import { UpvoteRow, upvoteStore } from "../../store/upvoteStore";

export const UpvoteGroup = memo(({ row }: { row: UpvoteRow }) => {
  const addUpvote = upvoteStore(state => state.addUpvote);

  return (
    <div 
      role="region"
      aria-label="Upvote group"
      className="flex rounded-md items-center gap-3 justify-center w-full"
    >
      <div
        role="group"
        aria-label={`${row.qtd} upvotes`}
        className="flex gap-2 border-2 border-gray-200 p-2 min-h-13 rounded-md overflow-x-auto w-full"
      >
        {Array.from({ length: row.qtd }).map((_, index) => (
          <Upvote key={`${row.id}-${index}`} rowId={row.id} isActive={row.isSelected} />
        ))}
      </div>

      <button
        type="button"
        aria-label="Add upvote"
        onClick={() => addUpvote(row.id)}
        className="flex items-center justify-center min-w-10 h-10 rounded-md bg-gray-100 text"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
});