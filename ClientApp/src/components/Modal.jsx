import React from "react";
import '../styles/modal.css'
function Modal({ isOpen, children, onClose }) {
  if (isOpen === false) return null;
  function close(e) {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  }
  return (
    <div>
      <div className="modal">{children}</div>
      <div className="bg" onClick={(e) => close(e)} />
    </div>
  );
}
export default Modal;