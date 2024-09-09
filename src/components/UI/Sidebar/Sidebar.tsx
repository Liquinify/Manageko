import { useEffect, useRef, useState } from "react";
import CreateBoard from "../../Common/Modals/CreateBoard/CreateBoard";
import style from "./Sidebar.module.scss";
import { useBoard } from "../../../hooks/useBoard";
import boardSlice from "../../../store/features/boardSlice";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Dropdown from "../Dropdown/Dropdown";
import EditBoard from "../../Common/Modals/EditBoard/EditBoard";
import { newBoard } from "../../../types/board/newBoard";
import { GoPlus } from "react-icons/go";

const Sidebar = () => {
  const { boards, dispatch, selectedBoard } = useBoard();
  const [openModal, setOpenModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [editBoard, setEditBoard] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => setOpenModal(true);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setDropdown(false);
    }
  };

  return (
    <aside className={style.sidebar} ref={ref}>
      <h1>Manageko</h1>
      <section>
        {boards.map((board: newBoard, index: number) => (
          <article
            className={selectedBoard.isActive ? style.selected : style.sidebar}
            key={board.id}
            onClick={() => {
              dispatch(boardSlice.actions.setBoardActive({ index }));
            }}
          >
            <p>
              <MdOutlineSpaceDashboard fontSize={17} />
              {board.name}
            </p>
          </article>
        ))}
      </section>
      <button onClick={handleOpen}>
        <GoPlus />
        Create New
      </button>
      {openModal && (
        <CreateBoard openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {dropdown && (
        <Dropdown setDropdown={setDropdown} setEditModal={setEditBoard} />
      )}
      {editBoard && (
        <EditBoard columnModal={editBoard} setColumnModal={setEditBoard} />
      )}
    </aside>
  );
};

export default Sidebar;
