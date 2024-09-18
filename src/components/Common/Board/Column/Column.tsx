import TaskItem from "../../Task/TaskItem/TaskItem";
import style from "./Column.module.scss";
import { useState } from "react";
import EditBoard from "../../Modals/EditBoard/EditBoard";
import { useAppSelector } from "../../../../hooks/useRedux";
import { Task } from "../../../../types/tasks/tasks";
import { Column as Columns } from "../../../../types/columns/column";

const Column = ({ column }: { column: Columns }) => {
  const [columnModal, setColumnModal] = useState(false);
  const boardType = useAppSelector((state) => state.controls.boardType);
  const searchValue = useAppSelector((state) => state.controls.search);

  const handleOpen = () => setColumnModal(true);

  return (
    <main
      className={boardType === "Kanban" ? style.horizontal : style.vertical}
    >
      <header>
        <div>
          <p>{column.name}</p>
          <span>{column.tasks.length}</span>
        </div>
        <button onClick={handleOpen}>+</button>
      </header>
      {boardType == "Kanban"
        ? column.tasks
            .filter((task: Task) =>
              task.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((task: Task) => (
              <TaskItem key={task.id} task={task} column={column} />
            ))
        : column.tasks
            .filter((task: Task) =>
              task.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((task: Task) => (
              <TaskItem key={task.id} task={task} column={column} />
            ))}
      {columnModal && (
        <EditBoard columnModal={columnModal} setColumnModal={setColumnModal} />
      )}
    </main>
  );
};

export default Column;
