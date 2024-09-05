import { useBoard } from "./hooks/useBoard";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import EmptyBoard from "./components/Common/Board/EmptyBoard/EmptyBoard";
import Board from "./components/Common/Board/Board/Board";
import "./styles/globals.css";
import "./styles/normalize.css";

function App() {
  const { selectedBoard } = useBoard();
  return (
    <>
      <Navbar />
      <Sidebar />
      {!selectedBoard.columns.length ? <EmptyBoard /> : <Board />}
    </>
  );
}

export default App;
