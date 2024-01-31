import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";

const style = {
  сolor: "black",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-48.7%, -50%)",
  width: 720,
  height: 640,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "3px",
};

const CreateTask = ({
  createTaskModal,
  setCreateTaskModal,
}: {
  createTaskModal: boolean;
  setCreateTaskModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => setCreateTaskModal(false);
  const { selectedBoard, dispatch } = useBoard();
  const { register } = useForm();
  const columns = selectedBoard.columns;
  const [selectedColumn, setSelectedColumn] = useState(columns[0].name);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [subtasks, setSubtasks] = useState([
    { id: Date.now(), title: "Make a Coffee", isCompleted: false },
  ]);

  const handleDelete = (id: number) => {
    setSubtasks((prevState) =>
      prevState.filter((subtask) => subtask.id !== id)
    );
  };

  const onChange = (id: number, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.title = newValue;
      return newState;
    });
  };

  const addNewTask = () => {
    dispatch(
      boardSlice.actions.addNewTask({
        name,
        description,
        selectedColumn,
        subtasks,
      })
    );
    console.log({ name, description, selectedColumn, subtasks });
    handleClose();
  };

  return (
    <Modal
      open={createTaskModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ color: "black" }}>
          Add New Task
        </Typography>
        <InputLabel sx={{ mt: 2 }}>Title</InputLabel>
        <OutlinedInput
          multiline
          sx={{
            width: "100%",
            mt: 1,
            height: "2.8rem",
            background: "none",
          }}
          // {...(register("name"), { required: true })}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g Start learning new things"
        />
        <InputLabel sx={{ mt: 2 }}>Description (optional)</InputLabel>
        <OutlinedInput
          multiline
          sx={{
            width: "100%",
            mt: 1,
            height: "2.8rem",
            background: "none",
          }}
          {...register("description")}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g Start learning new things"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <InputLabel sx={{ mt: 2 }}>Subtasks</InputLabel>
          {subtasks.map((subtask) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
              key={subtask.id}
            >
              <OutlinedInput
                fullWidth
                sx={{
                  mt: 1,
                  height: "2.8rem",
                  background: "none",
                }}
                value={subtask.title}
                onChange={(e) => {
                  onChange(subtask.id, e.target.value);
                }}
              />
              <ClearIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDelete(subtask.id)}
              />
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "50px", height: "3rem" }}
              onClick={() => {
                setSubtasks((state) => [
                  ...state,
                  { id: Date.now(), title: "", isCompleted: false },
                ]);
              }}
            >
              + Add New Subtask
            </Button>
            <InputLabel sx={{ mt: 2 }}>Status</InputLabel>

            <select
              className="select-status text-L"
              onChange={(e) => setSelectedColumn(e.target.value)}
              style={{ height: "3rem", marginTop: "1rem", width: "100%" }}
            >
              {columns.map((col, index: number) => (
                <option className="status-options" key={index}>
                  {col.name}
                </option>
              ))}
            </select>
            <Button
              onClick={addNewTask}
              variant="contained"
              sx={{ mt: 2, borderRadius: "50px", height: "3rem" }}
            >
              Create Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTask;
