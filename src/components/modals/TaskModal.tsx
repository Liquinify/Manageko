import { Box, Modal, Paper, Typography } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import Subtasks from "../Subtasks";
import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";
import { style } from "@/styles/modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditBoard from "./EditBoard";

type Props = {
  taskModal: boolean;
  setTaskModal: React.Dispatch<SetStateAction<boolean>>;
  colIndex: number;
  taskIndex: number;
  completedTasks: number;
  subtasks: any;
};

type Subtasks = {
  isCompleted: boolean;
  title: string;
};

const TaskModal = ({
  taskModal,
  setTaskModal,
  colIndex,
  taskIndex,
  completedTasks,
  subtasks,
}: Props) => {
  const { selectedBoard, dispatch } = useBoard();
  const columns = selectedBoard.columns;
  const col = columns.find((_: unknown, i: number) => i === colIndex);
  const task = col.tasks.find((_: unknown, i: number) => i === taskIndex);

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [dropdown, setDropdown] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleDropdown = () => setDropdown((state) => !state);

  const deleteTask = () => {
    dispatch(boardSlice.actions.deleteTask({ colIndex, taskIndex }));
    setTaskModal(false);
  };

  return (
    <Modal open={taskModal} onClose={handleClose}>
      <Box
        sx={{
          ...style,
          width: 530,
          minHeight: 400,
          bgcolor: "#2b2c37",
          position: "relative",
        }}
        component="form"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h2" sx={{ fontSize: 25, color: "white" }}>
            {task.title}
          </Typography>
          <MoreVertIcon
            onClick={handleDropdown}
            sx={{ color: "gray", fontSize: "2rem", cursor: "pointer" }}
          />
        </Box>
        <Typography sx={{ mt: 4, color: "white" }}>
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
          <Typography sx={{ color: "white" }}>
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
            {subtasks.map((subtask: Subtasks, index: number) => (
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
          <Typography sx={{ color: "white" }}>Current Status</Typography>
          <select
            value={status}
            onChange={onChange}
            style={{
              height: "3rem",
              marginTop: "1rem",
              width: "100%",
              marginBottom: 2,
            }}
          >
            {columns.map((col: { name: string }, index: number) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
          {dropdown && (
            <Paper
              sx={{
                position: "absolute",
                width: "19.3vmin",
                height: "10vmin",
                background: "#2b2c37",
                top: "20%",
                left: "68%",
                pl: 2,
                borderRadius: "5px",
              }}
            >
              <Typography sx={{ mt: 2, color: "white", cursor: "pointer" }}>
                Edit Task
              </Typography>
              <Typography
                sx={{ mt: 2, color: "red", cursor: "pointer" }}
                onClick={deleteTask}
              >
                Delete Task
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
