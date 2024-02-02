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
