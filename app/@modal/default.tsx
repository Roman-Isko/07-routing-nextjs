"use client";

import { ReactNode, MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./default.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function DefaultModal({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
