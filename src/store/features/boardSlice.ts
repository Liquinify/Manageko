import { createSlice } from "@reduxjs/toolkit";
import { newBoard } from "../../types/board/newBoard";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../types/tasks/tasks";

const boards = [
  {
    id: uuidv4(),
    name: "Test",
    isActive: true,
    columns: [
      {
        id: uuidv4(),
        name: "Todo",
        tasks: [
          {
            id: uuidv4(),
            title: "QA and test all major user journeys",
            description:
              "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
            status: "Todo",
            subtasks: [],
          },
        ],
      },
    ],
  },
];

const boardSlice = createSlice({
  name: "boards",
  initialState: boards,
  reducers: {
    addNewBoard: (state, action) => {
      const isActive = !state.length;
      const newBoard: newBoard = {
        id: uuidv4(),
        name: action.payload.name,
        isActive,
        columns: [],
      };
      newBoard.columns = action.payload.columns;
      state.push(newBoard);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        board.name = payload.name;
        board.columns = payload.newColumns;
      }
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index == action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addNewTask: (state, action) => {
      const { title, description, selectedColumn, subtasks } = action.payload;
      const currentBoard = state.find((board) => board.isActive);
      const currentColumn = currentBoard?.columns.find(
        (col) => col.name === selectedColumn
      );
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        status: selectedColumn,
        subtasks,
      };
      currentColumn?.tasks.push(newTask);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const currentBoard = state.find((board) => board.isActive);
      const column = currentBoard?.columns.find(
        (col) => col.id === payload.colIndex
      );
      const task = column?.tasks.find((task) => task.id === payload.taskIndex);
      const subtask = task?.subtasks.find(
        (subtask) => subtask.id === payload.subtaskId
      );

      if (subtask) subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const { colIndex, newColIndex, taskIndex, status } = action.payload;
      const selectedBoard = state.find((board) => board.isActive);
      const column = selectedBoard?.columns.find((col) => col.id === colIndex);
      if (!column) return;
      if (colIndex === newColIndex) return;

      const task = column.tasks.find((task) => task.id === taskIndex);
      if (!task) return;
      task.status = status;

      column.tasks = column.tasks.filter((task) => task.id !== taskIndex);

      const newCol = selectedBoard?.columns.find(
        (col) => col.id === newColIndex
      );
      if (!newCol || !Array.isArray(newCol.tasks)) return;
      newCol.tasks.push(task);
    },
    editTask: (state, action) => {
      const { title, description, subtasks, taskIndex, colIndex } =
        action.payload;

      const activeBoard = state.find((board) => board.isActive);
      const currentColumn = activeBoard?.columns.find(
        (col) => col.id === colIndex
      );
      const currentTask = currentColumn?.tasks.find(
        (task) => task.id === taskIndex
      );

      if (currentTask) {
        currentTask.title = title;
        currentTask.description = description;
        currentTask.subtasks = subtasks;
      }
    },
    deleteBoard: (state) => {
      if (state.length === 1) return;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) state.splice(state.indexOf(activeBoard), 1);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const currentBoard = state.find((board) => board.isActive);
      const currentTask = currentBoard?.columns.find(
        (col) => col.id === payload.colIndex
      );
      if (currentTask) {
        currentTask.tasks = currentTask?.tasks.filter(
          (task) => task.id !== payload.taskIndex
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
