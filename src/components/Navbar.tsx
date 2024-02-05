import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useBoard } from "@/hooks/useBoard";
import CreateTask from "./modals/CreateTask";
import EditBoard from "./modals/EditBoard";
import boardSlice from "@/store/features/boardSlice";

const Navbar = () => {
  const { dispatch, selectedBoard } = useBoard();
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleOpen = () => setCreateTaskModal(true);
  const handleDropdown = () => setDropdown((state) => !state);

  const handleEditBoard = () => {
    setEditModal((state) => !state);
    setDropdown(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardSlice.actions.deleteBoard());
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
  };

  return (
    <Box
      position="absolute"
      sx={{
        background: "#2b2c37",
        height: "6.5rem",
        width: "84%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        left: "15.9%",
        borderBottom: "1px solid gray",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography sx={{ fontSize: 28, color: "#fff", width: "20rem", pl: 5 }}>
          {selectedBoard.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, pr: 2 }}>
          <Button
            variant="contained"
            sx={{
              height: "3.3rem",
              width: "11rem",
              borderRadius: "100px",
            }}
            onClick={handleOpen}
          >
            + Add new task
          </Button>
          <MoreVertIcon
            sx={{ color: "gray", fontSize: "2.5rem", cursor: "pointer" }}
            onClick={handleDropdown}
          />
        </Box>
      </Box>
      {createTaskModal && (
        <CreateTask
          createTaskModal={createTaskModal}
          setCreateTaskModal={setCreateTaskModal}
        />
      )}

      {dropdown && (
        <Paper
          sx={{
            position: "absolute",
            width: "20vmin",
            height: "19vmin",
            background: "#2b2c37",
            top: "105%",
            left: "87.5%",
            pl: 2,
            borderRadius: "5px",
          }}
        >
          <Typography
            onClick={handleEditBoard}
            sx={{ mt: 2.5, color: "white", cursor: "pointer" }}
          >
            Edit Task
          </Typography>
          <Typography sx={{ mt: 2.5, color: "white", cursor: "pointer" }}>
            Clear Board
          </Typography>
          <Typography
            sx={{ mt: 2.5, color: "red", cursor: "pointer" }}
            onClick={onDeleteBtnClick}
          >
            Delete Board
          </Typography>
          <Typography sx={{ mt: 2.5, color: "red", cursor: "pointer" }}>
            Delete Task
          </Typography>
        </Paper>
      )}

      {editModal && (
        <EditBoard columnModal={editModal} setColumnModal={setEditModal} />
      )}
    </Box>
  );
};

export default Navbar;
