import { useState } from "react";
import TaskModal from "../../Modals/TaskDetails/TaskDetails";
import { CiCircleList } from "react-icons/ci";
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
    <>
      <article onClick={handleOpen} className={style.task}>
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
