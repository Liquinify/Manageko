import { useState } from "react";
import TaskModal from "../../Modals/TaskDetails/TaskDetails";
import { CiCircleList } from "react-icons/ci";
import style from "./TaskItem.module.scss";
import { Task } from "../../../../types/tasks/tasks";
import { Column } from "../../../../types/columns/column";
import { Subtask } from "../../../../types/tasks/subtasks";
import { useAppSelector } from "../../../../hooks/useRedux";

type Props = {
  task: Task;
  column: Column;
};

const TaskItem = ({ task, column }: Props) => {
  let completedTasks = 0;
  const subtasks = task.subtasks;
  const boardType = useAppSelector((state) => state.controls.boardType);

  const [taskModal, setTaskModal] = useState(false);

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
