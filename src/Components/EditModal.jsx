import React from "react";
import ExpenseForm from "./ExpenseForm";

const EditModal = ({ isOpen, onCancel, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed h-screen inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 flex-col px-4">
      <ExpenseForm isOpen={true} />
      <button className="p-2 bg-blue-900 rounded" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditModal;
