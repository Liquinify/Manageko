import { useAppSelector } from "@/hooks/useRedux";
import React from "react";
import TaskItem from "../task/TaskItem";
import { Box, Typography } from "@mui/material";
import { useBoard } from "@/hooks/useBoard";

const Column = ({ colIndex }: { colIndex: number }) => {
  const { selectedBoard } = useBoard();
  const col = selectedBoard.columns.find((_, i) => i === colIndex);

  return (
    <Box>
      <Typography
        sx={{
          color: "white",
          textTransform: "uppercase",
        }}
      >
        {col.name} ({col.tasks.length})
      </Typography>
      <Box>
        {col.tasks.map((_, index: number) => (
          <TaskItem key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </Box>
    </Box>
  );
};

export default Column;
