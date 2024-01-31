import { useBoard } from "@/hooks/useBoard";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TaskModal from "./modals/TaskModal";

const TaskItem = ({
  taskIndex,
  colIndex,
}: {
  taskIndex: number;
  colIndex: number;
}) => {
  const { selectedBoard } = useBoard();
  const [taskModal, setTaskModal] = useState(false);

  const columns = selectedBoard.columns;
  const col = columns.find((_, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);

  let completedTasks = 0;
  const subtasks = task.subtasks;

  const handleOpen = () => {
    if (!taskModal) {
      setTaskModal(true);
    }
  };

  subtasks.forEach((subtask: any) => {
    if (subtask.isCompleted) {
      completedTasks++;
    }
  });

  return (
    <Box
      onClick={handleOpen}
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
      {taskModal && (
        <TaskModal
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          taskIndex={taskIndex}
          colIndex={colIndex}
          completedTasks={completedTasks}
          subtasks={subtasks}
        />
      )}
    </Box>
  );
};

export default TaskItem;
