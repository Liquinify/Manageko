import { createSlice } from "@reduxjs/toolkit";
import data from "@/data.json";
import produce from "immer";

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
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;

      // Finds current board
      const currentBoard = state.find((board) => board.isActive);

      // Finds current column
      const columns = currentBoard.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;

      // Finds current task and it's status
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;

      // Removes task from old column and adds to a new column
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    addNewTask: (state, action) => {
      const { name, description, selectedColumn, subtasks } = action.payload;
      const currentBoard = state.find((board) => board.isActive);
      const currentColumn = currentBoard?.columns.find(
        (col) => col.name === selectedColumn
      );
      const newTask = {
        title: name,
        description,
        status: selectedColumn,
        subtasks,
      };
      currentColumn?.tasks.push(newTask);
    },
  },
});

export default boardSlice;
