"use client";

import { useState } from "react";
import EditBoard from "../../Modals/EditBoard/EditBoard";
import style from "./EmptyBoard.module.scss";

const EmptyBoard = () => {
  const [createColumn, setCreateColumn] = useState(false);
  return (
    <section className={style.board}>
      <h1>This board is empty. Create a new column to get started.</h1>
      <button onClick={() => setCreateColumn(true)}>+ Add a column</button>
      {createColumn && (
        <EditBoard
          columnModal={createColumn}
          setColumnModal={setCreateColumn}
          type="add"
        />
      )}
    </section>
  );
};

export default EmptyBoard;
