import { useBoard } from "@/hooks/useBoard";
import boardSlice from "@/store/features/boardSlice";
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
import { style } from "@/styles/modal";

type newColumns = {
  name: string;
  task: [];
  id: Date;
};

const EditBoard = ({
  columnModal,
  setColumnModal,
  type,
}: {
  columnModal: boolean;
  setColumnModal: React.Dispatch<SetStateAction<boolean>>;
  type: "add" | "edit";
}) => {
  const { selectedBoard, dispatch } = useBoard();
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: Date.now() },
    { name: "Stuff", tasks: [], id: Date.now() },
  ]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (type === "edit") {
      setNewColumns(
        selectedBoard.columns.map((col: newColumns) => {
          return { ...col, id: Date.now() };
        })
      );
      setValue("name", selectedBoard.name);
    }
  }, [type, selectedBoard]);

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const { name } = formData;
    if (type === "add") {
      dispatch(boardSlice.actions.addNewBoard({ name, newColumns }));
    } else {
      dispatch(boardSlice.actions.editBoard({ name, newColumns }));
    }
    setValue("name", selectedBoard.name);
    setColumnModal(false);
  };

  const onChange = (id: number, newValue: string) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) {
        column.name = newValue;
      }
      return newState;
    });
  };

  const deleteTask = (id: number) => {
    setNewColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleClose = () => setColumnModal(false);

  return (
    <Modal
      open={columnModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ ...style, width: 830, minHeight: 520, bgcolor: "#2b2c37" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Edit Board
        </Typography>
        <InputLabel sx={{ mt: 2, color: "white" }}>Board Name</InputLabel>
        <OutlinedInput
          {...register("name", { required: true })}
          sx={{
            width: "102%",
            mt: 1,
            height: "2.8rem",
            background: "none",
            color: "white",
            "&::placeholder": {
              color: "gray",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <InputLabel sx={{ mt: 1, color: "white" }}>Board Columns</InputLabel>
          {newColumns.map((column, index: number) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
                  width: "92%",
                  color: "white",
                  "&::placeholder": {
                    color: "gray",
                  },
                }}
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
              />
              <ClearIcon
                sx={{ cursor: "pointer", color: "gray", fontSize: 30 }}
                onClick={() => deleteTask(column.id)}
              />
            </Box>
          ))}
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
              sx={{
                borderRadius: "50px",
                height: "3rem",
                color: "#635fc7",
                background: "white",
              }}
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: Date.now() },
                ]);
              }}
            >
              + Add New Column
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, borderRadius: "50px", height: "3rem" }}
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
