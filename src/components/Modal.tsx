import React, { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
const Modal = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div
      className={`modal ${open ? "modal-open" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={-1}
    >
      <div
        className="modal-box bg-[#ffeccc] flex flex-col items-center min-h-[40%] justify-evenly"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
