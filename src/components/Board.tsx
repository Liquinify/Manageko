import React, { useState } from "react";
import Column from "./Column";
import {
  Box,
  Button,
  FilledInput,
  Input,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useBoard } from "@/hooks/useBoard";
import { useForm } from "react-hook-form";
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

const Board = () => {
  const { selectedBoard } = useBoard();
  const column = selectedBoard.columns;
  const [columnModal, setColumnModal] = useState(false);
  const { register } = useForm();

  const handleOpen = () => setColumnModal(true);
  const handleClose = () => setColumnModal(false);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 7,
        position: "absolute",
        left: "17.5%",
        top: "14%",
      }}
    >
      {column.map((_, index: number) => (
        <Column key={index} colIndex={index} />
      ))}
      <Button
        sx={{
          display: "flex",
          height: "4vmin",
          color: "gray",
          width: "30vmin",
        }}
        onClick={handleOpen}
      >
        New Column
      </Button>
      {columnModal && (
        <Modal
          open={columnModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography variant="h6" sx={{ color: "white" }}>
              Edit Board
            </Typography>
            <InputLabel sx={{ mt: 2, color: "white" }}>Board Name</InputLabel>
            <OutlinedInput
              value={selectedBoard.name}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <OutlinedInput
                  fullWidth
                  sx={{
                    mt: 1,
                    height: "2.8rem",
                    background: "none",
                  }}
                />
                <ClearIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <OutlinedInput
                  fullWidth
                  sx={{
                    mt: 1,
                    height: "2.8rem",
                    background: "none",
                  }}
                />
                <ClearIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <OutlinedInput
                  fullWidth
                  sx={{
                    mt: 1,
                    height: "2.8rem",
                    background: "none",
                  }}
                />
                <ClearIcon />
              </Box>
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
                >
                  Add New Column
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 2, borderRadius: "50px", height: "3rem" }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Board;
