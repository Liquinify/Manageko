import { Box, MenuItem, Modal, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import Subtasks from "../Subtasks";
import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";

const style = {
  сolor: "black",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-48.7%, -50%)",
  width: 530,
  height: 560,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "3px",
};

const TaskModal = ({
  taskModal,
  setTaskModal,
  colIndex,
  taskIndex,
  completedTasks,
  subtasks,
}) => {
  const { selectedBoard, dispatch } = useBoard();
  const columns = selectedBoard.columns;
  const col = columns.find((_, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);
  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const handleClose = () => {
    dispatch(
      boardSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setTaskModal(false);
  };

  return (
    <Modal
      open={taskModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h2" sx={{ fontSize: 25 }}>
          {task.title}
        </Typography>
        <Typography sx={{ mt: 4 }}>
          {task.description ? task.description : "No description provided"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            mt: 3,
          }}
        >
          <Typography sx={{}}>
            Subtasks ({completedTasks} of {subtasks.length})
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
              mt: 1,
            }}
          >
            {subtasks.map((subtask, index) => (
              <Subtasks
                key={index}
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                subtask={subtask}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography>Current Status</Typography>
          {/* <Select
            value={status}
            onChange={onChange}
            sx={{ height: 45, width: "100%", mt: 0.5 }}
          >
            {columns.map((col, index) => (
              <MenuItem value key={index}>{col.name}</MenuItem>
            ))}
          </Select> */}
          <select
            className="select-status text-L"
            value={status}
            onChange={onChange}
            style={{ height: "3rem", marginTop: "1rem", width: "100%" }}
          >
            {columns.map((col, index: number) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
