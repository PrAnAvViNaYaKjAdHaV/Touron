import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [data, setData] = useState([]);

  const userString = JSON.parse(sessionStorage.getItem("user"));

  try {
    const user = JSON.parse(userString);
    console.log("User:", user);

    useEffect(() => {
      if (user) {
        axios
          .get(
            `${import.meta.env.VITE_API_URL}/api/request/mobile/getdetails`,
            {
              params: {
                mobileNumber: user.mobileNumber,
              },
            }
          )
          .then((response) => {
            setData(response.data);
            console.log("Response Data:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        console.error("User object is missing");
      }
    }, []);
  } catch (error) {
    console.error("Error parsing user JSON:", error);
    console.log("User string:", userString);
  }

  return (
    <div className=" py-10 px-2 md:px-6 lg:px-10 h-screen">
      <h1 className=" text-stone-800 text-2xl font-semibold">Dashboard</h1>
      <div className=" my-10 overflow-x-auto ">
        <table className="min-w-full bg-white shadow-md rounded-md py-4 px-4 ">
          <thead className="bg-white text-stone-800 rounded-xl ">
            <tr className=" rounded-lg">
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                SL.NO
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                TRAVELLED COUNTRIES
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                CANCELLED TRIPS
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                COMPLETED TRIPS
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="text-center">
              <td className="py-3 px-5">{1}</td>
              <td className=" py-3 px-5">
                {data?.completedDestinations?.map((row, index) => (
                  <td key={index} className="py-3 px-5">{`${row} `}</td>
                ))}
              </td>
              <td className="py-3 px-5">
                {data.cancelledCount ? data.cancelledCount : 0}
              </td>
              <td className="py-3 px-5">
                {data.completedCount ? data.completedCount : 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
