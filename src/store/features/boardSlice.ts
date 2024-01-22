import { createSlice } from "@reduxjs/toolkit";
import data from "@/data.json";

const boardSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addNewBoard: (state, action) => {
      const isBoardActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const newBoard = {
        name: payload.name,
        isBoardActive,
        columns: [],
      };
      newBoard.columns = payload.columns;
      state.push(newBoard);
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index == action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = [title, description, status, subtasks];
      const selectedBoard = task.find((board: any) => board.isActive);
      const column = selectedBoard.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },
  },
});

export default boardSlice;
