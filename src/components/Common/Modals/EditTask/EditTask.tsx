import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import style from "./EditTask.module.scss";
import { useBoard } from "../../../../hooks/useBoard";
import boardSlice from "../../../../store/features/boardSlice";
import ModalWrapper from "../../../UI/ModalWrapper/ModalWrapper";
import { TSubtasks } from "../../../../types/tasks/subtasks";
import { v4 as uuidv4 } from "uuid";
import { Tasks } from "../../../../types/tasks/tasks";

type Props = {
  createTaskModal: boolean;
  setCreateTaskModal: React.Dispatch<SetStateAction<boolean>>;
  task: Tasks;
  colIndex: string;
};

const EditTask = ({
  createTaskModal,
  setCreateTaskModal,
  task,
  colIndex,
}: Props) => {
  const { selectedBoard, dispatch } = useBoard();
  const [subtasks, setSubtasks] = useState([
    { id: uuidv4(), title: "Make a Coffee", isCompleted: false },
  ]);
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
  });

  const columns = selectedBoard.columns;

  const [newColIndex, setNewColIndex] = useState<string>(colIndex);
  const [status, setStatus] = useState(task.status);

  const handleClose = () => setCreateTaskModal(false);

  const onColumnChange = (id: string, newValue: string) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      if (column) {
        column.title = newValue;
      }
      return newState;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const handleDelete = (id: string) => {
    setSubtasks((prevState) =>
      prevState.filter((subtask) => subtask.id !== id)
    );
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.value);
  };

  const handleTask = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      boardSlice.actions.editTask({
        title: taskData.title,
        description: taskData.description,
        subtasks,
        status,
        taskIndex: task.id,
        colIndex,
      })
    );

    handleClose();
  };

  useEffect(() => {
    setSubtasks(
      task.subtasks.map((subtask: TSubtasks) => {
        return { ...subtask, id: uuidv4() };
      })
    );
  }, []);

  return (
    <ModalWrapper shown={createTaskModal} close={handleClose}>
      <form onSubmit={handleTask} className={style.modal}>
        <h1>Edit Task</h1>
        <label>Title</label>
        <input
          name="title"
          onChange={handleInputChange}
          value={taskData.title}
        />
        <label>Description (optional)</label>
        <input
          name="description"
          onChange={handleInputChange}
          value={taskData.description}
        />
        <section>
          <label>Subtasks</label>
          {subtasks.map((subtask) => (
            <div key={subtask.id}>
              <input
                value={subtask.title}
                onChange={(e) => {
                  onColumnChange(subtask.id, e.target.value);
                }}
              />
              <MdOutlineClear onClick={() => handleDelete(subtask.id)} />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => {
                setSubtasks((state) => [
                  ...state,
                  { id: uuidv4(), title: "", isCompleted: false },
                ]);
              }}
            >
              + Add New Subtask
            </button>
          </div>
          <label>Status</label>
          <select onChange={onSelectChange} value={status}>
            {columns.map((col: { name: string }, index: number) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </section>
        <button type="submit">Save Changes</button>
      </form>
    </ModalWrapper>
  );
};

export default EditTask;
