import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";
import {
  Box,
  Button,
  InputLabel,
  LinearProgress,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

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

const EditBoard = ({
  columnModal,
  setColumnModal,
}: {
  columnModal: boolean;
  setColumnModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedBoard, dispatch } = useBoard();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: Date.now() },
    { name: "Stuff", tasks: [], id: Date.now() },
  ]);

  const type = "edit";

  const handleClose = () => setColumnModal(false);

  useEffect(() => {
    if (type === "edit") {
      setNewColumns(
        selectedBoard.columns.map((col) => {
          return { ...col, id: Date.now() };
        })
      );
      setName(selectedBoard.name);
      setIsLoading(false);
    }
  }, [type, selectedBoard.columns, selectedBoard.name]);

  const onChange = (id: number, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const deleteTask = (id: number) => {
    setNewColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  const onSubmit = (type: string) => {
    setColumnModal(false);
    if (type === "add") {
      dispatch(boardSlice.actions.addNewBoard({ name, newColumns }));
    } else {
      dispatch(boardSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <Modal
      open={columnModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Edit Board
        </Typography>
        <InputLabel sx={{ mt: 2, color: "white" }}>Board Name</InputLabel>
        <OutlinedInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{
            width: "102%",
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
          {newColumns.map((column, index: number) => (
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
          {isLoading && <LinearProgress />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              width: "48.7rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "50px", height: "3rem" }}
              onClick={() => {
                setNewColumns((state) => [
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
              onClick={() => onSubmit(type)}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditBoard;
