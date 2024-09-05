import { useEffect, useState } from "react";
import { useBoard } from "./useBoard";
import { newColumns } from "../types/columns/newColumns";
import { v4 as uuidv4 } from "uuid";

export const useEditBoard = (type: string) => {
  const [newColumns, setNewColumns] = useState([
    { id: uuidv4(), name: "Todo", tasks: [] },
  ]);

  const { selectedBoard } = useBoard();

  useEffect(() => {
    if (type === "edit") {
      setNewColumns(
        selectedBoard.columns.map((col: newColumns) => {
          return { ...col, id: uuidv4() };
        })
      );
    }
  }, [type, selectedBoard]);

  const onChange = (id: string, newValue: string) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) {
        column.name = newValue;
      }
      return newState;
    });
  };

  const deleteTask = (id: string) => {
    setNewColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  return { newColumns, setNewColumns, onChange, deleteTask };
};
