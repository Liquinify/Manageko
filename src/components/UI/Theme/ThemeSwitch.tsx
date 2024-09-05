import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import themeSlice from "../../../store/features/themeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import style from "./ThemeSwitch.module.scss";

const ThemeSwitch = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleThemeSwitch = () => {
    dispatch(themeSlice.actions.setTheme(theme));
  };
  return (
    <div className={style.theme}>
      <CiLight />

      <MdDarkMode />
    </div>
  );
};

export default ThemeSwitch;
