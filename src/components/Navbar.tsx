import { Box, Button, CssBaseline, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useBoard } from "@/hooks/useBoard";
import CreateTask from "./modals/CreateTask";

const Navbar = () => {
  const { selectedBoard } = useBoard();
  const [createTaskModal, setCreateTaskModal] = useState(false);

  const handleOpen = () => setCreateTaskModal(true);

  return (
    <Box
      sx={{
        background: "#2b2c37",
        height: "6.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Typography sx={{ pl: 6, fontSize: 45, color: "#fff" }} variant="h1">
        kanban
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ ml: 17, background: "gray" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 150,
          flexGrow: 1,
        }}
      >
        <Typography sx={{ fontSize: 28, color: "#fff" }}>
          {selectedBoard.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            variant="contained"
            sx={{
              height: "3.3rem",
              width: "11rem",
              borderRadius: "100px",
            }}
            onClick={handleOpen}
          >
            Add new task
          </Button>
          <MoreVertIcon sx={{ color: "gray", fontSize: "2.5rem" }} />
        </Box>
      </Box>
      {createTaskModal && (
        <CreateTask
          createTaskModal={createTaskModal}
          setCreateTaskModal={setCreateTaskModal}
        />
      )}
    </Box>
  );
};

export default Navbar;
