import { useState } from "react";
import TaskModal from "../../Modals/TaskDetails/TaskDetails";
import { CiCircleList } from "react-icons/ci";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tasks } from "../../../../types/tasks/tasks";
import { TColumns } from "../../../../types/columns/column";
import style from "./TaskItem.module.scss";
import { TSubtasks } from "../../../../types/tasks/subtasks";

type Props = {
  task: Tasks;
  column: TColumns;
};

const TaskItem = ({ task, column }: Props) => {
  let completedTasks = 0;
  const subtasks = task.subtasks;

  const [taskModal, setTaskModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const transitionStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleOpen = () => {
    if (!taskModal) {
      setTaskModal(true);
    }
  };

  subtasks.forEach((subtask: TSubtasks) => {
    if (subtask.isCompleted) {
      completedTasks++;
    }
  });
  return (
    <article
      onClick={handleOpen}
      className={style.task}
      style={transitionStyle}
    >
      <h2>{task.title}</h2>
      <h3>
        {task.description ? task.description : "No description provided."}
      </h3>
      <h4>
        <CiCircleList />
        <span>
          {completedTasks} / {subtasks.length}
        </span>
      </h4>
      {taskModal && (
        <TaskModal
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          task={task}
          column={column}
          completedTasks={completedTasks}
        />
      )}
    </article>
  );
};

export default TaskItem;
