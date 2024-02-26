import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import boardSlice from "@/store/features/boardSlice";
import { useBoard } from "@/hooks/useBoard";
import CreateBoard from "../modals/CreateBoard";

const Sidebar = () => {
  const { boards, dispatch } = useBoard();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  return (
    <Box
      sx={{
        background: "#2b2c37",
        width: "20.55rem",
        height: "100vh",
        borderRight: "1px solid gray",
      }}
    >
      <Box sx={{ position: "sticky", height: "100vh" }}>
        <Typography
          sx={{ pl: 6, fontSize: 45, color: "#fff", pt: 3 }}
          variant="h1"
        >
          Taskswift
        </Typography>
        <Typography sx={{ pl: 6, color: "lightgray", pt: 5 }}>
          ALL BOARDS ({boards?.length})
        </Typography>
        <Grid
          container
          flexDirection="column"
          sx={{ rowGap: 4, mt: 3, color: "white" }}
        >
          {boards.map((board: any, index: number) => (
            <Typography
              sx={{
                display: "flex",
                color: "lightgray",
                gap: 2,
                ml: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(boardSlice.actions.setBoardActive({ index }));
              }}
              key={index}
            >
              <SpaceDashboardOutlinedIcon />
              {board.name}
            </Typography>
          ))}
          <Typography
            onClick={handleOpen}
            sx={{
              display: "flex",
              color: "lightblue",
              gap: 2,
              ml: 5,
              cursor: "pointer",
            }}
          >
            <SpaceDashboardOutlinedIcon />+ Create new board
          </Typography>
        </Grid>
        {openModal && (
          <CreateBoard openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
