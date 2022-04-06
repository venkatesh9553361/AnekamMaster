import React from "react";
import "../styles/modal.css";
function Modal({ isOpen, children, onClose }) {
  if (isOpen === false) return null;
  function close(e) {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  }
  return (
    <>
      {" "}
      <div className="custom-modal">{children}</div>
      <div className="bg" onClick={(e) => close(e)} />
    </>
  );
}
export default Modal;
