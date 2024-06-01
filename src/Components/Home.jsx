import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useSelector } from "react-redux";
import { organizeExpensesByMonth } from "../utils/functions";
import Loader from "./Loader";

const Home = () => {
  const expenseArray = useSelector((store) => store.expense);
  const user = useSelector((store) => store.user);
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    if(expenseArray){
      console.log(expenseArray)
      let newExpenseObject = organizeExpensesByMonth(
        expenseArray?.slice(0, 5) ?? []
        );
        setExpense(newExpenseObject);
      }
  }, [expenseArray]);

  return (
    <div className="h-[100vh] overflow-scroll bg-gradient-to-r from-[#171D1C] to-blue-900 flex pt-20 md:pt-28 flex-col md:flex-row p-4">
      {!user ? (
        <Loader />
      ) : (
        <>
          <div className="">
            <ExpenseForm />
          </div>
          <ExpenseList expenseArray={expense} altered={true} />
        </>
      )}
    </div>
  );
};

export default Home;
