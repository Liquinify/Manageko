import Columns from "../Column/Column";
import style from "./Board.module.scss";
import { useBoard } from "../../../../hooks/useBoard";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TColumns } from "../../../../types/columns/column";

const Board = () => {
  const { selectedBoard } = useBoard();
  const columns = selectedBoard.columns;

  return (
    <article className={style.board}>
      {columns.map((column: TColumns) => (
        <Columns key={column.id} column={column} />
      ))}
    </article>
  );
};

export default Board;
