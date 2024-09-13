import TaskItem from "../../Task/TaskItem/TaskItem";
import style from "./Column.module.scss";
import { Tasks } from "../../../../types/tasks/tasks";
import { TColumns } from "../../../../types/columns/column";
import { useState } from "react";
import EditBoard from "../../Modals/EditBoard/EditBoard";
import { useAppSelector } from "../../../../hooks/useRedux";

const Column = ({ column }: { column: TColumns }) => {
  const [columnModal, setColumnModal] = useState(false);
  const boardType = useAppSelector((state) => state.boardType);

  const handleOpen = () => setColumnModal(true);

  return (
    <main className={style.column}>
      <header>
        <div>
          <p>{column.name}</p>
          <span>{column.tasks.length}</span>
        </div>
        <button onClick={handleOpen}>+</button>
      </header>
      {boardType == undefined ? (
        column.tasks.map((task: Tasks) => (
          <TaskItem key={task.id} task={task} column={column} />
        ))
      ) : (
        <p>Kek</p>
      )}
      {columnModal && (
        <EditBoard columnModal={columnModal} setColumnModal={setColumnModal} />
      )}
    </main>
  );
};

export default Column;
