import {
  Box,
  Grid,
  Typography,
  Modal,
  Button,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { SetStateAction, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "@/hooks/useRedux";
import boardSlice from "@/store/features/boardSlice";

const style = {
  сolor: "white",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 610,
  height: 455,
  bgcolor: "#2b2c37",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const CreateBoard = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([
    { name: "Todo", tasks: [], id: Date.now() },
    { name: "Stuff", tasks: [], id: Date.now() + 1 },
  ]);

  const onSubmit = () => {
    dispatch(boardSlice.actions.addNewBoard({ name, columns }));
    setOpenModal(false);
    setName("");
  };

  const deleteTask = (id: number) => {
    setColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  const onChange = (id: number, newValue) => {
    setColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form">
        <Typography variant="h6" sx={{ color: "white" }}>
          Add New Board
        </Typography>
        <InputLabel sx={{ mt: 2, color: "white" }}>Board Name</InputLabel>
        <OutlinedInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{
            width: "100%",
            mt: 1,
            height: "2.8rem",
            background: "none",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <InputLabel sx={{ mt: 2 }}>Board Columns</InputLabel>
          {columns.map((column, index: number) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
              key={index}
            >
              <OutlinedInput
                fullWidth
                sx={{
                  mt: 1,
                  height: "2.8rem",
                  background: "none",
                }}
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
              />
              <ClearIcon
                sx={{ cursor: "pointer" }}
                onClick={() => deleteTask(column.id)}
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
                setColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: Date.now() },
                ]);
              }}
            >
              Add New Column
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, borderRadius: "50px", height: "3rem" }}
              onClick={onSubmit}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateBoard;
