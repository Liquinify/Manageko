import { useAppDispatch, useAppSelector } from "./useRedux";

export const useBoard = () => {
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const selectedBoard = boards.find((board) => board.isActive);

  return { boards, dispatch, selectedBoard };
};
