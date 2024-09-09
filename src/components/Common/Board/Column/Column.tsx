import TaskItem from "../../Task/TaskItem/TaskItem";
import style from "./Column.module.scss";
import { Tasks } from "../../../../types/tasks/tasks";
import { TColumns } from "../../../../types/columns/column";
import { useState } from "react";
import EditBoard from "../../Modals/EditBoard/EditBoard";

const Column = ({ column }: { column: TColumns }) => {
  const [columnModal, setColumnModal] = useState(false);

  const handleOpen = () => setColumnModal(true);

  return (
    <main className={style.column} data-testid="column">
      <header>
        <div>
          <p>{column.name}</p>
          <span>{column.tasks.length}</span>
        </div>
        <button onClick={handleOpen}>+</button>
      </header>
      {column.tasks.map((task: Tasks) => (
        <TaskItem key={task.id} task={task} column={column} />
      ))}
      {columnModal && (
        <EditBoard columnModal={columnModal} setColumnModal={setColumnModal} />
      )}
    </main>
  );
};

export default Column;
