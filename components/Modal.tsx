import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-0">
      <div
        className={`bg-gray-800 rounded-lg shadow-2xl p-6 relative w-full max-w-lg mx-auto transform transition-all duration-300 ease-out scale-100 opacity-100 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && (
          <h2 id="modal-title" className="text-3xl font-bold text-emerald-400 mb-6 text-center">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};