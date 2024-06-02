import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useRef, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../utils/expenseSlice";
import SelectWithAddOption from "./Select";

const ExpenseForm = () => {
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let title = useRef();
  let amount = useRef();
  let date = useRef();
  let category = useRef();
  let description = useRef();

  const [options, setOptions] = useState([
    { value: "Grocery", label: "Grocery" },
    { value: "Travel", label: "Travel" },
    { value: "Clothing", label: "Clothing" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
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
      const docRef = await addDoc(collection(db, user?.userId), expenseData);
      dispatch(addExpense({ id: docRef.id, ...expenseData }));
      setLoading(false);
      setShowBtn(false);
      title.current.value = "";
      amount.current.value = "";
      date.current.value = "";
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (!showBtn ) {
    return (
      <button
        onClick={() => setShowBtn(true)}
        className="w-full mb-4 bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
      >
        Add Expense
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative bg-white/10 h-min p-4 md:p-8 w-3/4 mx-auto md:w-96 rounded-lg border border-blue-300 shadow-xl shadow-blue-500/50 md:space-y-6 mb-8"
    >
      <h1 className="font-bold text-xl md:text-4xl text-white text-center pb-4">
        Add Expense
      </h1>
      <div className="mb-2 md:mb-4 text-sm">
        <SelectWithAddOption
          ref={category}
          value={selectedOption}
          onChange={handleChange}
          onCreateOption={handleCreate}
          options={options}
        />
      </div>
      <div className="mb-2 md:mb-4 text-sm">
        <input
          type="text"
          id="title"
          className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
          ref={title}
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
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleClick}
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? <Loader /> : "Add Expense"}
        </button>
      </div>
      <button
        onClick={() => setShowBtn(false)}
        className="absolute top-0 right-0 p-2 font-bold text-red-700 rounded-md"
      >
        X
      </button>
    </form>
  );
};

export default ExpenseForm;
