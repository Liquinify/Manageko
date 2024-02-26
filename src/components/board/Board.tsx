import React, { useState } from "react";
import Column from "./Column";
import { Box, Button } from "@mui/material";
import { useBoard } from "@/hooks/useBoard";
import EditBoard from "../modals/EditBoard";

const Board = () => {
  const { selectedBoard } = useBoard();
  const column = selectedBoard.columns;
  const [columnModal, setColumnModal] = useState(false);

  const handleOpen = () => setColumnModal(true);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 7,
        position: "absolute",
        left: "17.5%",
        top: "14%",
      }}
    >
      {column.map((_: unknown, index: number) => (
        <Column key={index} colIndex={index} />
      ))}
      <Button
        sx={{
          display: "flex",
          height: "4vmin",
          color: "gray",
          width: "30vmin",
        }}
        onClick={handleOpen}
      >
        + New Column
      </Button>
      {columnModal && (
        <EditBoard
          columnModal={columnModal}
          setColumnModal={setColumnModal}
          type="edit"
        />
      )}
    </Box>
  );
};

export default Board;
