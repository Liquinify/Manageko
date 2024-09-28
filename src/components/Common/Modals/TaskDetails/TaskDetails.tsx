import React, { SetStateAction, useState } from "react";
import SubtaskList from "../../Task/Subtask/SubtaskList";
import { MdMoreVert } from "react-icons/md";
import style from "./TaskDetails.module.scss";
import boardSlice from "../../../../store/features/boardSlice";
import { useBoard } from "../../../../hooks/useBoard";
import ModalWrapper from "../../../UI/ModalWrapper/ModalWrapper";
import EditTask from "../EditTask/EditTask";
import { Task } from "../../../../types/tasks/tasks";
import { Column } from "../../../../types/columns/column";
import { Subtask } from "../../../../types/tasks/subtasks";

type Props = {
  taskModal: boolean;
  setTaskModal: React.Dispatch<SetStateAction<boolean>>;
  task: Task;
  column: Column;
  completedTasks: number;
};

const TaskModal = ({
  taskModal,
  setTaskModal,
  column,
  task,
  completedTasks,
}: Props) => {
  const { selectedBoard, dispatch } = useBoard();

  const [status, setStatus] = useState<string>(task.status);
  const [newColIndex, setNewColIndex] = useState<string>(column.id);
  const [dropdown, setDropdown] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.value);
  };

  const handleClose = () => {
    dispatch(
      boardSlice.actions.setTaskStatus({
        colIndex: column.id,
        taskIndex: task.id,
        newColIndex,
        status,
      })
    );
    setTaskModal(false);
  };

  const handleDropdown = () => setDropdown((state) => !state);

  const deleteTask = () => {
    dispatch(
      boardSlice.actions.deleteTask({ colIndex: column.id, taskIndex: task.id })
    );
    setTaskModal(false);
  };

  const openEditTask = () => {
    setEditTask(true);
  };

  return (
    <ModalWrapper shown={taskModal} close={handleClose}>
      <article className={style.modal}>
        <section>
          <h2>{task.title}</h2>
          <MdMoreVert onClick={handleDropdown} />
        </section>
        <p>{task.description ? task.description : "No description provided"}</p>
        <h2>
          Subtasks ({completedTasks} of {task.subtasks.length})
        </h2>
        <div>
          {task.subtasks.map((subtask: Subtask) => (
            <SubtaskList
              key={subtask.id}
              taskIndex={task.id}
              colIndex={column.id}
              subtask={subtask}
            />
          ))}
        </div>
        <div>
          <h2>Current Status</h2>
          <select value={status} onChange={onStatusChange}>
            {selectedBoard.columns.map((col: { id: number; name: string }) => (
              <option value={col.id} key={col.id}>
                {col.name}
              </option>
            ))}
          </select>
          {dropdown && (
            <div className={style.dropdown}>
              <p onClick={openEditTask}>Edit Task</p>
              <p onClick={deleteTask}>Delete Task</p>
            </div>
          )}
        </div>
      </article>
      {editTask && (
        <EditTask
          createTaskModal={editTask}
          setCreateTaskModal={setEditTask}
          task={task}
          colIndex={column.id}
        />
      )}
    </ModalWrapper>
  );
};

export default TaskModal;
