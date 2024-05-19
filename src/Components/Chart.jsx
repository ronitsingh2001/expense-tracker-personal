import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "./Loader";

// Register the components Chart.js needs
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
};

function BarChart({ title, expenseArray, label }) {
  const [data, setData] = useState(null);

  const loadChart = () => {
    let dataset = {
      labels: label,
      datasets: [
        {
          label: title.toUpperCase() + " REPORTS",
          data: expenseArray,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    if (dataset) {
      setData(dataset);
    }
  };

  useEffect(() => {
    if (label && expenseArray && title) {
      loadChart();
    }
  }, [expenseArray, label, title]);
  
  if(!expenseArray || expenseArray?.length === 0){
    return <Loader />
  }
  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <>
          <div className="h-[75vh] overflow-y-scroll bg-gradient-to-r from-[#171D1C] to-blue-900 flex pt-4 md:pt-28 flex-col md:flex-row">
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </>
  );
}

export default BarChart;
