import { Box, Button, CssBaseline, Divider, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useBoard } from "@/hooks/useBoard";

const Navbar = () => {
  const { selectedBoard } = useBoard();

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
          >
            Add new task
          </Button>
          <MoreVertIcon sx={{ color: "gray", fontSize: "2.5rem" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
