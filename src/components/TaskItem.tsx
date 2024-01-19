import { useBoard } from "@/hooks/useBoard";
import { useAppSelector } from "@/hooks/useRedux";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const TaskItem = ({
  taskIndex,
  colIndex,
}: {
  taskIndex: number;
  colIndex: number;
}) => {
  const { selectedBoard } = useBoard();
  const columns = selectedBoard.columns;
  const col = columns.find((_, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);

  const [modal, setModal] = useState(false);

  let completedTasks = 0;
  const subtasks = task.subtasks;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completedTasks++;
    }
  });

  return (
    <Box
      sx={{
        background: "#2b2c37",
        width: "29.2vmin",
        mt: 4,
        minHeighteight: "12%",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <Typography sx={{ color: "white", width: "80%", pt: 3.5, pl: 2 }}>
        {task.title}
      </Typography>
      <Typography
        sx={{
          pl: 2,
          pb: 3,
          fontSize: 15,
          pt: 0.5,
          color: "gray",
        }}
      >
        {completedTasks} of {subtasks.length} subtasks
      </Typography>
    </Box>
  );
};

export default TaskItem;
