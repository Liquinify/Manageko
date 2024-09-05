import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useCreateBoard = () => {
  const [columns, setColumns] = useState([
    { id: uuidv4(), name: "Todo", tasks: [] },
  ]);

  const deleteTask = (id: string) => {
    setColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  const onChange = (id: string, newValue: string) => {
    setColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);

      if (column) {
        column.name = newValue;
      }

      return newState;
    });
  };

  return { columns, setColumns, deleteTask, onChange };
};
