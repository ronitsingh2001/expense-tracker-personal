import React, { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useRef, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense } from "../utils/expenseSlice";
import SelectWithAddOption from "./Select";
import Backdrop from "./Backdrop";

const EditModal = ({ isOpen, onCancel, data }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let title = useRef();
  let amount = useRef();
  let date = useRef();
  let category = useRef();
  let description = useRef();
  const [selectedOption, setSelectedOption] = useState();

  const [options, setOptions] = useState([
    { value: "Grocery", label: "Grocery" },
    { value: "Travel", label: "Travel" },
    { value: "Clothing", label: "Clothing" },
  ]);

  useEffect(() => {
    if (
      options.findIndex(
        (x) => x.value.toUpperCase() === data.category.toUpperCase()
      ) === -1
    ) {
      handleCreate(data.category);
    }
    handleChange({ value: data.category, label: data.category });
  }, []);

  if (!isOpen) {
    return null;
  }
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]);
    setSelectedOption(newOption);
  };
  const handleClick = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const expenseData = {
        category: category.current.getValue()[0].value,
        title: title.current.value,
        amount: amount.current.value,
        date: date.current.value,
        description: description.current.value,
      };
      const docRef = doc(db, `${user.userId}/${data.id}`);
      await setDoc(docRef, expenseData);
      dispatch(updateExpense({ id: data.id, data: expenseData }));
      setLoading(false);
      onCancel();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed h-screen inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 flex-col px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative opacity-1 bg-gray-950 h-min p-4 md:p-8 w-3/4 mx-auto md:w-96 rounded-lg border border-blue-300 shadow-xl shadow-blue-500/50 md:space-y-6"
      >
        <h1 className="font-bold text-xl md:text-4xl text-white text-center pb-4">
          Edit Expense
        </h1>
        <div className="mb-2 md:mb-4 text-sm">
          <SelectWithAddOption
            ref={category}
            onChange={handleChange}
            onCreateOption={handleCreate}
            options={options}
            value={selectedOption}
          />
        </div>
        <div className="mb-2 md:mb-4 text-sm">
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            ref={title}
            defaultValue={data.title}
            placeholder="Title"
          />
        </div>
        <div className="mb-2 md:mb-4 text-sm">
          <input
            type="number"
            id="amount"
            min="0.01"
            step="0.01"
            ref={amount}
            defaultValue={data.amount}
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            placeholder="399.99"
          />
        </div>
        <div className="mb-2 md:mb-6 text-sm">
          <input
            id="date"
            type="date"
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            ref={date}
            defaultValue={data.date}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Select date")}
          />
        </div>
        <div className="mb-2 md:mb-6 text-sm">
          <textarea
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            rows="2"
            placeholder="A brief description or notes about the expense"
            ref={description}
            defaultValue={data.description}
          ></textarea>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={handleClick}
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? <Loader /> : "Update"}
          </button>
          <button
            className="w-full bg-blue-900 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {loading && <Backdrop isOpen={loading} />}
    </div>
  );
};

export default EditModal;
