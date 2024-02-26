import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";
import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";

const Subtasks = ({
  index,
  taskIndex,
  colIndex,
  subtask,
}: {
  index: number;
  taskIndex: number;
  colIndex: number;
  subtask: any;
}) => {
  const { dispatch } = useBoard();

  const onChange = () => {
    dispatch(
      boardSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Checkbox onChange={onChange} checked={subtask.isCompleted} />
      <Typography sx={{ color: "white" }}>{subtask.title}</Typography>
    </Box>
  );
};

export default Subtasks;
