import React from "react";

import style from "./Dropdown.module.scss";
import boardSlice from "../../../store/features/boardSlice";
import { useAppDispatch } from "../../../hooks/useRedux";

type Props = {
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ setEditModal, setDropdown }: Props) => {
  const dispatch = useAppDispatch();

  const handleEditBoard = () => {
    setEditModal((state) => !state);
    setDropdown(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardSlice.actions.deleteBoard());
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
  };

  const clearBoard = () => {
    dispatch(boardSlice.actions.clearBoard());
  };
  return (
    <section className={style.dropdown}>
      <p onClick={handleEditBoard}>Edit Board</p>
      <p onClick={clearBoard}>Clear Board</p>
      <p onClick={onDeleteBtnClick}>Delete Board</p>
    </section>
  );
};

export default Dropdown;
