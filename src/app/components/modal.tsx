import React from 'react';

interface ModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ id, title, isOpen, onClose, children, actions }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <dialog id={id} className="modal z-50" open={isOpen}>
        <div className="modal-box mx-auto mt-16 w-full max-w-lg">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">{children}</div>
          <div className="modal-action">
            {actions}
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
