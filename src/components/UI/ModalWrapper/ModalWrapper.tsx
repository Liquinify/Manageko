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
        <MdOutlineClear onClick={close} />
      </div>
    </main>
  ) : null;
};

export default ModalWrapper;
