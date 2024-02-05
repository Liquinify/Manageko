"use client";

import Board from "@/components/Board";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box position="static">
        <Navbar />
        <Sidebar />
      </Box>
      <Board />
    </>
  );
}
