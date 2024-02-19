import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";


const PieChartCard = ({ type, cancelledCount }) => {
  const data = {
    // labels: ["Others", "Onboarding", "Offboarding"],
    datasets: [
      {
        label: type,
        data: [cancelledCount ? cancelledCount : 1],
        backgroundColor: ["#8271ab"],
        borderColor: ["#8271ab"],
        // borderWidth: 1,
      },
    ],
  };
  const options = {
    cutout: "60%", // Adjust this value to increase or decrease inner width
  };
  return (
    <div className=" py-4 px-6 bg-white rounded-lg shadow h-full min-w-[200px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-gray-800">{`Total ${type}`}</h3>
        {/* <select className="border-none focus:outline-none text-sm py-1 px-1.5 bg-stone-50 rounded text-gray-700">
          <option>All Time</option>
        </select> */}
      </div>
      <div className=" relative w-fit h-48">
        <Doughnut data={data} options={options} />
        {/* <div className=" absolute top-[23%] left-[23%]">
          <div className=" flex flex-col justify-center items-center gap-1.5 bg-white p-3 ml-3 mt-5 rounded-full shadow-xl">
            <h1 className=" text-xl text-stone-900 font-bold">121</h1>
            <p className=" text-stone-500 text-xs">Total Sales</p>
          </div>
        </div> */}
      </div>
      <div className="mt-3 flex flex-col gap-2 font-medium">
        <p className=" flex items-center justify-between text-sm text-gray-700 ">
          <div className=" flex items-center gap-2">
            <span className="h-3 w-3 bg-[#8271ab] inline-block mr-2 rounded-full"></span>
            <p>{type}</p>
          </div>
          <p>{cancelledCount}</p>
        </p>
        {/* <p className=" flex items-center justify-between text-sm text-gray-700 ">
          <div className=" flex items-center gap-2">
            <span className="h-3 w-3 bg-[#50c878] inline-block mr-2 rounded-full"></span>
            <p>Offboarding</p>
          </div>
          <p>27</p>
        </p>
        <p className=" flex items-center justify-between text-sm text-gray-700 ">
          <div className=" flex items-center gap-2">
            <span className="h-3 w-3 bg-[#b2b0ea] inline-block mr-2 rounded-full"></span>
            <p>Others</p>
          </div>
          <p>23</p>
        </p> */}
      </div>
    </div>
  );
};

export default PieChartCard;
