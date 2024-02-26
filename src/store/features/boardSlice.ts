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
      const selectedBoard = task.find((board) => board.isActive);
      const column = selectedBoard.find(
        (_: unknown, index: number) => index === newColIndex
      );
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
      const currentBoard = state.find((board) => board.isActive);
      const columns = currentBoard.columns;
      const col = columns.find((_, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    addNewTask: (state, action) => {
      const { title, description, selectedColumn, subtasks } = action.payload;
      const currentBoard = state.find((board) => board.isActive);
      const currentColumn = currentBoard?.columns.find(
        (col) => col.name === selectedColumn
      );
      const newTask = {
        title,
        description,
        status: selectedColumn,
        subtasks,
      };
      currentColumn?.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (!activeBoard) return;
      const prevColumn = activeBoard.columns[prevColIndex];
      if (!prevColumn) return;
      const taskToEdit = prevColumn.tasks[taskIndex];
      if (!taskToEdit) return;

      taskToEdit.title = title;
      taskToEdit.status = status;
      taskToEdit.description = description;
      taskToEdit.subtasks = subtasks;

      if (prevColIndex !== newColIndex) {
        prevColumn.tasks.splice(taskIndex, 1);

        // Find the new column
        const newColumn = activeBoard.columns[newColIndex];
        if (!newColumn) return; // Check if new column is found

        // Add task to new column
        newColumn.tasks.push(taskToEdit);
      }
    },

    deleteBoard: (state) => {
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        state.splice(state.indexOf(activeBoard), 1);
      }
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      const currentTask = activeBoard?.columns.find(
        (_, i) => i === payload.colIndex
      );
      if (currentTask) {
        currentTask.tasks = currentTask?.tasks.filter(
          (_, i) => i !== payload.taskIndex
        );
      }
    },
    clearBoard: (state) => {
      const currentBoard = state.find((board) => board.isActive);
      if (currentBoard) currentBoard.columns = [];
    },
  },
});

export default boardSlice;
