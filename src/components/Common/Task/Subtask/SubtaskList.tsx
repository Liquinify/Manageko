import { useBoard } from "../../../../hooks/useBoard";
import boardSlice from "../../../../store/features/boardSlice";
import { TSubtasks } from "../../../../types/tasks/subtasks";
import style from "./SubtaskList.module.scss";

const SubtaskList = ({
  taskIndex,
  colIndex,
  subtask,
}: {
  taskIndex: string;
  colIndex: string;
  subtask: TSubtasks;
}) => {
  const { dispatch } = useBoard();
  const subtaskId = subtask.id;

  const onChange = () => {
    dispatch(
      boardSlice.actions.setSubtaskCompleted({ subtaskId, taskIndex, colIndex })
    );
  };

  return (
    <section className={style.subtask}>
      <p>{subtask.title}</p>
      <input
        type="checkbox"
        onChange={onChange}
        checked={subtask.isCompleted}
      />
    </section>
  );
};

export default SubtaskList;
