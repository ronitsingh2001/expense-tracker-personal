import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useSelector } from "react-redux";
import { organizeExpensesByMonth } from "../utils/functions";
import Loader from "./Loader";
import Backdrop from "./Backdrop";

const Home = () => {
  const expenseArray = useSelector((store) => store.expense);
  const user = useSelector((store) => store.user);
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    if(expenseArray){
      let newExpenseObject = organizeExpensesByMonth(
        expenseArray?.slice(0, 7) ?? []
        );
        setExpense(newExpenseObject);
      }
  }, [expenseArray]);

  return (
    <div className="h-[100vh] overflow-scroll bg-gradient-to-r from-[#171D1C] to-blue-900 flex pt-20 md:pt-28 flex-col md:flex-row p-4">
      {!user ? (
        <Backdrop isOpen={true} />
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
