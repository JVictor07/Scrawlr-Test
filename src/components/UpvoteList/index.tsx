import { FC } from "react";
import { UpvoteGroup } from "../UpvoteGroup";
import { upvoteStore } from "../../store/upvoteStore";

export const UpvoteList: FC = () => {
  const rows = upvoteStore(state => state.rows);

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm gap-4 flex flex-col max-w-[700px] w-[80vw]">
      {rows.map((row) => (
        <UpvoteGroup row={row} key={row.id} />
      ))}
    </div>
  );
};
