import TaskItem from "../../Task/TaskItem/TaskItem";
import style from "./Column.module.scss";
import { useEffect, useState } from "react";
import EditBoard from "../../Modals/EditBoard/EditBoard";
import { useAppSelector } from "../../../../hooks/useRedux";
import { Task } from "../../../../types/tasks/tasks";
import { Column as Columns } from "../../../../types/columns/column";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const Column = ({ column }: { column: Columns }) => {
  const [columnModal, setColumnModal] = useState(false);
  const boardType = useAppSelector((state) => state.controls.boardType);
  const searchValue = useAppSelector((state) => state.controls.search);
  const [tasks, setTasks] = useState(column.tasks);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
      },
    })
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOpen = () => setColumnModal(true);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const draggedItemId = active.id;
    const destinationItemId = over?.id;

    if (draggedItemId === destinationItemId) return;

    setTasks((task: Task[]) => {
      const activeColumn = task.findIndex((task) => task.id === draggedItemId);
      const destinationColumn = task.findIndex(
        (task) => task.id === destinationItemId
      );
      return arrayMove(tasks, activeColumn, destinationColumn);
    });
  };

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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={column.tasks}>
          {boardType == "Kanban"
            ? tasks
                .filter((task: Task) =>
                  task.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((task: Task) => (
                  <TaskItem key={task.id} task={task} column={column} />
                ))
            : tasks
                .filter((task: Task) =>
                  task.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((task: Task) => (
                  <TaskItem key={task.id} task={task} column={column} />
                ))}
        </SortableContext>
      </DndContext>
      {columnModal && (
        <EditBoard columnModal={columnModal} setColumnModal={setColumnModal} />
      )}
    </main>
  );
};

export default Column;
