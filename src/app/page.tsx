"use client";

import Board from "@/components/Board";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Board />
      <Sidebar />
    </>
  );
}
