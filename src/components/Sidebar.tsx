import {
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import boardSlice from "@/store/features/boardSlice";
import { useBoard } from "@/hooks/useBoard";
import CreateBoard from "./modals/CreateBoard";

const Sidebar = () => {
  const { boards, dispatch } = useBoard();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  return (
    <Box
      sx={{
        background: "#2b2c37",
        width: "20.55rem",
        height: "100vmin",
        borderRight: "1px solid gray",
      }}
    >
      <Typography sx={{ pl: 6, color: "lightgray", pt: 2 }}>
        ALL BOARDS ({boards?.length})
      </Typography>
      <Grid
        container
        flexDirection={"column"}
        sx={{ rowGap: 4, mt: 4, color: "white" }}
      >
        {boards.map((board, index: number) => (
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
  );
};

export default Sidebar;
