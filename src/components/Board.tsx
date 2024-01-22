import React, { useEffect, useState } from "react";
import Column from "./Column";
import {
  Box,
  Button,
  FilledInput,
  Input,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useBoard } from "@/hooks/useBoard";
import { useForm } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import boardSlice from "@/store/features/boardSlice";
import EditBoard from "./modals/EditBoard";

const style = {
  сolor: "white",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-48.7%, -50%)",
  width: 830,
  height: 520,
  bgcolor: "#2b2c37",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

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
      {column.map((_, index: number) => (
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
        New Column
      </Button>
      {columnModal && (
        <EditBoard columnModal={columnModal} setColumnModal={setColumnModal} />
      )}
    </Box>
  );
};

export default Board;
