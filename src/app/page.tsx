"use client";

import Board from "@/components/board/Board";
import EmptyBoard from "@/components/board/EmptyBoard";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { useBoard } from "@/hooks/useBoard";
import { Box } from "@mui/material";

export default function Home() {
  const { selectedBoard } = useBoard();
  return (
    <>
      <Box position="static">
        <Navbar />
        <Sidebar />
      </Box>
      {!selectedBoard.columns.length ? <EmptyBoard /> : <Board />}
    </>
  );
}
