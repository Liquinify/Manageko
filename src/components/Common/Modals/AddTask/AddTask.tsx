import React, { FormEvent, SetStateAction, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import style from "./AddTask.module.scss";
import { useBoard } from "../../../../hooks/useBoard";
import boardSlice from "../../../../store/features/boardSlice";
import ModalWrapper from "../../../UI/ModalWrapper/ModalWrapper";
import { v4 as uuidv4 } from "uuid";

type Props = {
  createTaskModal: boolean;
  setCreateTaskModal: React.Dispatch<SetStateAction<boolean>>;
};

const AddTask = ({ createTaskModal, setCreateTaskModal }: Props) => {
  const { selectedBoard, dispatch } = useBoard();
  const [subtasks, setSubtasks] = useState([
    { id: uuidv4(), title: "Make a Coffee", isCompleted: false },
  ]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const columns = selectedBoard.columns;

  const [status, setStatus] = useState(columns[0].name);

  const handleClose = () => setCreateTaskModal(false);

  const handleDelete = (id: string) => {
    setSubtasks((prevState) =>
      prevState.filter((subtask) => subtask.id !== id)
    );
  };

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

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleNewTask = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      boardSlice.actions.addNewTask({
        title: taskData.title,
        description: taskData.description,
        selectedColumn: status,
        subtasks,
      })
    );
    handleClose();
  };

  return (
    <ModalWrapper shown={createTaskModal} close={handleClose}>
      <form onSubmit={handleNewTask} className={style.modal}>
        <h6>Add New Task</h6>
        <label>Title</label>
        <input
          name="title"
          onChange={handleInputChange}
          placeholder="e.g Start learning new things"
          value={taskData.title}
        />
        <label>Description (optional)</label>
        <input
          name="description"
          onChange={handleInputChange}
          value={taskData.description}
          placeholder="e.g Start learning new things"
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
            <label>Status</label>
            <select
              onChange={onSelectChange}
              style={{ height: "3rem", marginTop: "1rem", width: "100%" }}
              value={status}
            >
              {columns.map((col: { name: string }, index: number) => (
                <option key={index}>{col.name}</option>
              ))}
            </select>
          </div>
        </section>
        <button type="submit">Create Task</button>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
