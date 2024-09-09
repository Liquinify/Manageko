import React from "react";
import style from "./ModalWrapper.module.scss";
import { MdOutlineClear } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  shown: boolean;
  close: () => void;
};

const ModalWrapper = ({ children, shown, close }: Props) => {
  return shown ? (
    <main
      className={style.modal}
      onClick={() => {
        close();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
      <MdOutlineClear onClick={close} />
    </main>
  ) : null;
};

export default ModalWrapper;
