import { useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import { useEffect, useRef, useState } from "react";
import {
  getAmount,
  getIndividualExpenses,
  getSubFilter,
  organizeExpensesByMonth,
} from "../utils/functions";
import { FILTER } from "../utils/constants";
import BarChart from "./Chart";

const Dashboard = ({ reports = false }) => {
  const expenseArray = useSelector((store) => store.expense);
  const [subFilter, setSubFilter] = useState(null);
  const [labels, setLabels] = useState(null);
  const [amount, setAmount] = useState(null);
  const [subFilterCurrent, setSubFilterCurrent] = useState("DEFAULT");
  const [mainFilterCurrent, setMainFilterCurrent] = useState(FILTER[0]);
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState(expenseArray);
  const mainFilterRef = useRef();
  const subFilterRef = useRef();

  const handleMainFilter = () => {
    setLoading(true);
    setMainFilterCurrent(mainFilterRef.current.value);
    let subFilterList = getSubFilter(mainFilterRef.current.value);
    setSubFilterCurrent("DEFAULT");
    setSubFilter(subFilterList?.map((e) => e.key));
    setExpense(subFilterList);
    setLoading(false);
    if (reports) {
      handleReports();
    }
  };

  const handleSubFilter = () => {
    setSubFilterCurrent(subFilterRef.current.value);
    if (reports) {
      handleReports(subFilterRef.current.value);
    }
  };

  const handleReports = (key = 'DEFAULT') => {
    let reports = getIndividualExpenses(expense, key);
    setLabels(reports.labels);
    setAmount(reports.amount);
  };

  useEffect(() => {
    setExpense(organizeExpensesByMonth(expenseArray ?? []));
    setSubFilter(getSubFilter(FILTER[0])?.map((e) => e.key));
    setMainFilterCurrent(FILTER[0]);
    setLoading(false);
  }, [expenseArray]);

  return (
    <div className="h-[100vh] bg-gradient-to-r from-[#171D1C] to-blue-900 flex pt-20 md:pt-28 flex-col p-4">
      <h1 className="font-bold text-white ps-5">Filters</h1>
      <div className="filters-container gap-16 flex items-center justify-around  text-xs px-4">
        <select
          className="w-full md:max-w-[15rem] p-3 rounded-md focus:outline-none focus:ring-2 focus:bg-blue-950 bg-white/20 text-white capitalize"
          name="main-filter"
          value={mainFilterCurrent}
          onChange={handleMainFilter}
          ref={mainFilterRef}
        >
          {FILTER.map((x) => (
            <option
              className="bg-gray-700 text-white hover:bg-gray-600 capitalize"
              key={x}
              value={x}
            >
              {x}
            </option>
          ))}
        </select>
        <select
          className="w-full md:max-w-[15rem] p-3 rounded-md focus:outline-none focus:ring-2 focus:bg-blue-950 bg-white/20 text-white capitalize"
          name="sub-filter"
          defaultValue="DEFAULT"
          ref={subFilterRef}
          onChange={handleSubFilter}
        >
          <option value="DEFAULT">Show All</option>
          {!loading ? (
            subFilter?.map((x) => (
              <option
                className="bg-gray-700 text-white hover:bg-gray-600 capitalize"
                key={x}
                value={x}
              >
                {x}
              </option>
            ))
          ) : (
            <option className="text-white">Loading...</option>
          )}
        </select>
      </div>
      <hr className="mt-3 border-dotted" />
      {reports ? (
        <BarChart
          title={mainFilterCurrent}
          label={labels ?? subFilter}
          expenseArray={amount ?? getAmount(expense)}
        />
      ) : (
        <ExpenseList
          subFilter={subFilterCurrent}
          expenseArray={expense}
          altered={false}
        />
      )}
    </div>
  );
};

export default Dashboard;
