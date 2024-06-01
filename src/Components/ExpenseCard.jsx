import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "./Backdrop";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { removeExpense } from "../utils/expenseSlice";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";

const ExpenseCard = ({ data, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  let user = useSelector((store) => store.user);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 100);
    }
  };

  const handleDelete = async () => {
    setShowConfirmModal(true);
  };
  const deleteRecord = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, `${user.userId}/${data.id}`));
      dispatch(removeExpense({ id: data.id }));
    } catch (error) {
      console.error("Error removing document: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-2 border-blue-950 rounded-md p-1 mt-1 text-white ms-2 relative">
      <Backdrop isOpen={isLoading} />
      <div className="flex items-center justify-between pe-5">
        <small className="font-semibold">{data?.title}</small>
        <small className="muted">${data.amount}</small>
        <div
          className="right-0 absolute px-1 cursor-pointer"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <span className="font-extrabold">&#8942;</span>
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="absolute right-0 mt-2 w-28 bg-blue-950 rounded-md shadow-xl z-50 overflow-hidden">
          {/* <li
            className="ps-2 py-1 cursor-pointer hover:bg-blue-900"
            onClick={handleEdit}
          >
            Edit
          </li> */}
          <li
            className="ps-2 py-1 cursor-pointer hover:bg-blue-900"
            onClick={handleDelete}
          >
            Delete
          </li>
        </ul>
      )}
      <small>{data?.date}</small>
      <ConfirmModal
        isOpen={showConfirmModal}
        onCancel={handleCancel}
        onConfirm={deleteRecord}
        title={data?.title}
      />
      <EditModal 
      isOpen={showEditModal}
      onCancel={handleCancel}
      />
    </div>
  );
};

export default ExpenseCard;
