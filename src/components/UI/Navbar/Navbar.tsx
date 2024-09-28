import { useEffect, useRef, useState } from "react";
import AddTask from "../../Common/Modals/AddTask/AddTask";
import style from "./Navbar.module.scss";
import { useBoard } from "../../../hooks/useBoard";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Dropdown from "../Dropdown/Dropdown";
import EditBoard from "../../Common/Modals/EditBoard/EditBoard";
import controlsSlice from "../../../store/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";

const Navbar = () => {
  const { selectedBoard } = useBoard();
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const searchValue = useAppSelector((state) => state.controls.search);
  const boardType = useAppSelector((state) => state.controls.boardType);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(controlsSlice.actions.setSearchTask(e.target.value));
  };

  const handleOpen = () => setCreateTaskModal(true);

  const handleBoardType = (e: any) => {
    const buttonName = e.target.name;
    dispatch(controlsSlice.actions.setBoardType(buttonName));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={style.navbar}>
        <section ref={ref}>
          <h1>{selectedBoard.name}</h1>
          <IoEllipsisHorizontal
            fontSize={30}
            onClick={() => setDropdown((state) => !state)}
            cursor={"pointer"}
          />
        </section>
        <section>
          <div>
            <button
              className={boardType === "Kanban" ? style.selected : ""}
              name="Kanban"
              onClick={handleBoardType}
            >
              Kanban
            </button>
            <button
              className={boardType === "List" ? style.selected : ""}
              name="List"
              onClick={handleBoardType}
            >
              List
            </button>
          </div>
          <div>
            <FaSearch />
            <input
              type="text"
              placeholder="Search ..."
              onChange={handleInput}
              value={searchValue}
            />
            <button
              onClick={handleOpen}
              disabled={!selectedBoard.columns.length}
            >
              + New
            </button>
          </div>
        </section>
      </nav>
      {createTaskModal && (
        <AddTask
          createTaskModal={createTaskModal}
          setCreateTaskModal={setCreateTaskModal}
        />
      )}
      {editModal && (
        <EditBoard columnModal={editModal} setColumnModal={setEditModal} />
      )}
      {dropdown && (
        <Dropdown setDropdown={setDropdown} setEditModal={setEditModal} />
      )}
    </>
  );
};

export default Navbar;
