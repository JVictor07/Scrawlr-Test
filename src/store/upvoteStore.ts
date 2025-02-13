import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UpvoteRow {
  id: number;
  qtd: number;
  isSelected: boolean;
}

interface UpvoteStore {
  rows: UpvoteRow[];
  addUpvote: (rowId: number) => void;
  toggleUpvote: (rowId: number) => void;
}

export const upvoteStore = create<UpvoteStore>()(
  persist(
    (set) => ({
      rows: [
        {
          id: 1,
          qtd: 0,
          isSelected: false,
        },
        {
          id: 2,
          qtd: 0,
          isSelected: false,
        },
        {
          id: 3,
          qtd: 0,
          isSelected: false,
        },
      ],
      toggleUpvote: (rowId) => {
        return set((state) => ({
          rows: state.rows.map((row) => {
            if (row.id === rowId) {
              return { ...row, isSelected: !row.isSelected };
            }
            return row;
          }),
        }));
      },
      addUpvote: (rowId) => {
        console.log('bateu aqui')
        console.log(rowId)
        return set((state) => ({
          rows: state.rows.map((row) => {
            if (row.id === rowId) {
              return { ...row, qtd: row.qtd + 1 };
            }
            return row;
          }),
        }));
      },
    }),
    {
      name: "upvote-storage",
    }
  )
);
