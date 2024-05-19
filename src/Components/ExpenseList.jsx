import Loader from "./Loader";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({ expenseArray, subFilter = 'DEFAULT', altered = false }) => {
  return (
    <div className="w-full lg:w-3/4 px-1 lg:px-4 mb-4 lg:mb-0 mx-auto  overflow-y-scroll relative">
      {expenseArray?.length > 0 && altered && (
        <small className="font-semibold mb-4 text-white">
          Last few expense
        </small>
      )}
      {!expenseArray ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          {expenseArray?.length === 0 ? (
            <h1 className="text-white">No Expense Found!</h1>
          ) : (
            <>
              {expenseArray?.map((expense, index) => (
                <div
                  key={expense?.key ?? index}
                  className={"ps-1 mt-2 shadow "+ (subFilter !== 'DEFAULT' && subFilter !== expense?.key ? "hidden" : "")}
                >
                  <small className="text-white font-bold sticky top-0 bg-blue-950 py-1 px-2 rounded opacity-100 flex capitalize text-xl">
                    {expense?.key}
                  </small>
                  {expense?.expenses?.map((ex) => (
                    <ExpenseCard key={ex.id} data={ex} />
                  ))}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
// {expenseArray.reduce((acc, item) => acc + +item.amount, 0)}
