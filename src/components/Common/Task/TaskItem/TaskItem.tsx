import { useState } from "react";
import TaskModal from "../../Modals/TaskDetails/TaskDetails";
import { CiCircleList } from "react-icons/ci";
import style from "./TaskItem.module.scss";
import { Task } from "../../../../types/tasks/tasks";
import { Column } from "../../../../types/columns/column";
import { Subtask } from "../../../../types/tasks/subtasks";
import { useAppSelector } from "../../../../hooks/useRedux";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  task: Task;
  column: Column;
};

const TaskItem = ({ task, column }: Props) => {
  let completedTasks = 0;
  const subtasks = task.subtasks;
  const boardType = useAppSelector((state) => state.controls.boardType);
  const [taskModal, setTaskModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
    });

  const dragStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleOpen = () => {
    if (!taskModal) {
      setTaskModal(true);
    }
  };

  subtasks.forEach((subtask: Subtask) => {
    if (subtask.isCompleted) {
      completedTasks++;
    }
  });

  return (
    <>
      <article
        onClick={handleOpen}
        className={boardType === "Kanban" ? style.kanban : style.list}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={dragStyle}
      >
        <h2>{task.title}</h2>
        <h3>
          {task.description ? task.description : "No description provided."}
        </h3>
        <div></div>
        <p>
          <CiCircleList />
          <span>
            {completedTasks} / {subtasks.length}
          </span>
        </p>
      </article>
      {taskModal && (
        <TaskModal
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          task={task}
          column={column}
          completedTasks={completedTasks}
        />
      )}
    </>
  );
};

export default TaskItem;
