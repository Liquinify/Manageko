import { useRef, useState } from "react";
import AddTask from "../../Common/Modals/AddTask/AddTask";
import style from "./Navbar.module.scss";
import { useBoard } from "../../../hooks/useBoard";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { selectedBoard } = useBoard();
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => setCreateTaskModal(true);

  return (
    <>
      <nav className={style.navbar} ref={ref}>
        <section>
          <h1>{selectedBoard.name}</h1>
        </section>
        <section>
          <div>
            <button>Kanban</button>
            <button>List</button>
          </div>
          <div>
            <FaSearch />
            <input type="text" placeholder="Search ..." />
            <button
              onClick={handleOpen}
              disabled={!selectedBoard.columns.length}
            >
              + Add new task
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
    </>
  );
};

export default Navbar;
