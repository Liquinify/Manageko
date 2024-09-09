import boardSlice from "../store/features/boardSlice";
import { v4 as uuidv4 } from "uuid";

describe("board reducer", () => {
  const initialState = [
    {
      id: "mock",
      name: "Test",
      isActive: true,
      columns: [
        {
          id: "mock",
          name: "Todo",
          tasks: [
            {
              id: "mock",
              title: "QA and test all major user journeys",
              description: ".",
              status: "Todo",
              subtasks: [],
            },
          ],
        },
      ],
    },
  ];

  test("should handle addNewBoard", () => {
    const previousState = [];
    const newBoard = {
      name: "New Board",
      columns: [],
    };
    const actual = boardSlice.reducer(
      previousState,
      boardSlice.actions.addNewBoard(newBoard)
    );
    expect(actual.length).toBe(1);
    expect(actual[0].name).toBe("New Board");
    expect(actual[0].isActive).toBe(true); // First board becomes active
  });

  test("should handle editBoard", () => {
    const previousState = [...initialState];
    const updatedBoard = {
      name: "Test",
      columns: [],
    };
    const actual = boardSlice.reducer(
      previousState,
      boardSlice.actions.editTask(updatedBoard)
    );
    expect(actual[0].name).toBe("Test");
  });

  test("handle deleteBoard", () => {
    const previousState = [...initialState];
    const actual = boardSlice.reducer(
      previousState,
      boardSlice.actions.deleteBoard()
    );
    expect(actual.length).toBe(0);
  });

  test("handle addNewTask", () => {
    const previousState = [...initialState];
    const newTask = {
      title: "New Task",
      description: "Task description",
      selectedColumn: "Todo",
      subtasks: [],
    };
    const actual = boardSlice.reducer(
      previousState,
      boardSlice.actions.addNewTask(newTask)
    );
    const tasks = actual[0].columns[0].tasks;
    expect(tasks.length).toBe(2); // Should have 2 tasks now
    expect(tasks[1].title).toBe("New Task");
  });
});
