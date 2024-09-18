import Columns from "../Column/Column";
import style from "./Board.module.scss";
import { useBoard } from "../../../../hooks/useBoard";
import { Column } from "../../../../types/columns/column";
import { useAppSelector } from "../../../../hooks/useRedux";

const Board = () => {
  const { selectedBoard } = useBoard();
  const boardType = useAppSelector((state) => state.controls.boardType);
  const columns = selectedBoard.columns;

  return (
    <article
      className={boardType === "Kanban" ? style.kanboard : style.listboard}
    >
      {columns.map((column: Column) => (
        <Columns key={column.id} column={column} />
      ))}
    </article>
  );
};

export default Board;
