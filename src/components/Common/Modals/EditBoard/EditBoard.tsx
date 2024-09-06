import React, { FormEvent, SetStateAction, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import style from "./EditBoard.module.scss";
import { useBoard } from "../../../../hooks/useBoard";
import { useEditBoard } from "../../../../hooks/useEditBoard";
import boardSlice from "../../../../store/features/boardSlice";
import ModalWrapper from "../../../UI/ModalWrapper/ModalWrapper";
import { v4 as uuidv4 } from "uuid";

const EditBoard = ({
  columnModal,
  setColumnModal,
}: {
  columnModal: boolean;
  setColumnModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedBoard, dispatch } = useBoard();
  const [boardName, setBoardName] = useState(selectedBoard.name);

  const { newColumns, setNewColumns, onChange, deleteTask } = useEditBoard();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    dispatch(boardSlice.actions.editBoard({ name: boardName, newColumns }));
  };

  const handleClose = () => setColumnModal(false);

  return (
    <ModalWrapper shown={columnModal} close={handleClose}>
      <form onSubmit={handleSubmit} className={style.modal}>
        <h1>Edit Board</h1>
        <label>Board Name</label>
        <input
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <section>
          <label>Board Columns</label>
          {newColumns.map((column) => (
            <div key={column.id}>
              <input
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
              />
              <MdOutlineClear onClick={() => deleteTask(column.id)} />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { id: uuidv4(), name: "", tasks: [] },
                ]);
              }}
            >
              + Add New Column
            </button>
          </div>
        </section>
        <button type="submit">Save Changes</button>
      </form>
    </ModalWrapper>
  );
};

export default EditBoard;
