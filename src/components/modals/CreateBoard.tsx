import {
  Box,
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
import { FieldValues, useForm } from "react-hook-form";
import { style } from "@/styles/modal";

const CreateBoard = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [columns, setColumns] = useState([
    { name: "Todo", tasks: [], id: Date.now() },
    { name: "Completed", tasks: [], id: Date.now() + 1 },
  ]);

  const onSubmit = (formData: FieldValues) => {
    const { name } = formData;
    setValue("name", "");
    dispatch(boardSlice.actions.addNewBoard({ name, columns }));
    setOpenModal(false);
  };

  const deleteTask = (id: number) => {
    setColumns((prevState) => prevState.filter((task) => task.id !== id));
  };

  const onChange = (id: number, newValue: string) => {
    setColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);

      if (column) {
        column.name = newValue;
      }

      return newState;
    });
  };

  const handleClose = () => setOpenModal(false);

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box
        sx={{ ...style, width: 620, minHeight: 450, bgcolor: "#2b2c37" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Add New Board
        </Typography>
        <InputLabel sx={{ mt: 2, color: "white", fontSize: 14 }}>
          Board Name
        </InputLabel>
        <OutlinedInput
          {...register("name", { required: true })}
          sx={{
            width: "100%",
            mt: 1,
            height: "2.8rem",
            background: "none",
            color: "white",
            "&::placeholder": {
              color: "gray",
            },
          }}
          placeholder="e.g Roadmap"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
          }}
        >
          <InputLabel sx={{ color: "white", fontSize: 14, mt: 2 }}>
            Board Columns
          </InputLabel>
          {columns.map((column, index: number) => (
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
                  color: "white",
                  width: "92%",
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
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                height: "3rem",
                color: "#635fc7",
                background: "white",
                "&:hover": {
                  background: "white",
                },
              }}
              onClick={() => {
                setColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: Date.now() },
                ]);
              }}
            >
              + Add New Column
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, borderRadius: "50px", height: "3rem" }}
              type="submit"
            >
              Create New Board
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateBoard;
