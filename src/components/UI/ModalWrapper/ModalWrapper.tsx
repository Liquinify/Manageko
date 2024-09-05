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
    <div
      className={style.modal}
      onClick={() => {
        close(); // close modal when outside of modal is clicked
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); // do not close modal if anything inside modal content is clicked
        }}
      >
        {children}
        <MdOutlineClear cursor={"pointer"} fontSize={25} onClick={close} />
      </div>
    </div>
  ) : null;
};

export default ModalWrapper;
