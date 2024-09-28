import React, { FormEvent, SetStateAction, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import style from "./CreateBoard.module.scss";
import { useAppDispatch } from "../../../../hooks/useRedux";
import { useCreateBoard } from "../../../../hooks/useCreateBoard";
import boardSlice from "../../../../store/features/boardSlice";
import ModalWrapper from "../../../UI/ModalWrapper/ModalWrapper";
import { v4 as uuidv4 } from "uuid";

const CreateBoard = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { columns, setColumns, deleteTask, onChange } = useCreateBoard();
  const [boardName, setBoardName] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(boardSlice.actions.addNewBoard({ name: boardName, columns }));
    setOpenModal(false);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <ModalWrapper shown={openModal} close={handleClose}>
      <form onSubmit={onSubmit} className={style.modal}>
        <h1>Add New Board</h1>
        <label>Board Name</label>
        <input
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="e.g Roadmap"
        />
        <section>
          <label>Board Columns</label>
          {columns.map((column) => (
            <div key={column.id}>
              <input
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                required
              />
              <MdOutlineClear onClick={() => deleteTask(column.id)} />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => {
                setColumns((state) => [
                  ...state,
                  { id: uuidv4(), name: "", tasks: [] },
                ]);
              }}
            >
              + Add New Column
            </button>
          </div>
        </section>
        <button type="submit">Create New Board</button>
      </form>
    </ModalWrapper>
  );
};

export default CreateBoard;
