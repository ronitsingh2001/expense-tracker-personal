const ExpenseCard = ({data}) => {
  return (
    <>
      <div className="border-2 border-blue-950 rounded-md p-1 mt-1 text-white ms-2">
        <div className="flex items-center justify-between">
          <small className="font-semibold ">{data?.title}</small>
          <small className="muted">${data.amount}</small>
        </div>
        <small className="">{data?.date}</small>
      </div>
    </>
  );
};

export default ExpenseCard;
