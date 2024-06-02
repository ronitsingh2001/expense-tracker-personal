import React from "react";

const ConfirmModal = ({ isOpen, onCancel, onConfirm, title }) => {
  console.log(true)
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed h-screen inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
    <div className="modal p-4 border-2 bg-gradient-to-r from-[#171D1C] to-blue-950 border-black rounded">
      <div className="modal-content space-y-6">
        <h1 className="text-lg">Are you sure you want to delete <span className="font-bold">{title}</span>?</h1>
        <div className="modal-actions space-x-2 text-center">
          <button className="p-2 bg-blue-950 rounded" onClick={onCancel}>Cancel</button>
          <button className="p-2 bg-blue-950 rounded" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmModal;
