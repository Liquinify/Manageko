import { useRef, useState } from "react";
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
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(controlsSlice.actions.setSearchTask(e.target.value));
  };

  const handleOpen = () => setCreateTaskModal(true);

  const handleBoardType = (e: any) => {
    const buttonName = e.target.name;
    dispatch(controlsSlice.actions.setBoardType(buttonName));
  };

  return (
    <>
      <nav className={style.navbar} ref={ref}>
        <section>
          <h1>{selectedBoard.name}</h1>
          <IoEllipsisHorizontal
            fontSize={30}
            onClick={() => setDropdown((state) => !state)}
            cursor={"pointer"}
          />
        </section>
        <section>
          <div>
            <button name="Kanban" onClick={handleBoardType}>
              Kanban
            </button>
            <button name="List" onClick={handleBoardType}>
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
