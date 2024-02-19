import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

const UserRequest = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  // const [userData, setUserData] = useState()

  const userString = JSON.parse(sessionStorage.getItem("user"));

  try {
    const user = JSON.parse(userString);
    console.log("User:", user);

    useEffect(() => {
      if (user) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/request/mobile`, {
            params: {
              mobileNumber: user.mobileNumber,
            },
          })
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
    <div className="py-10 px-2 md:px-6 lg:px-10 h-screen">
      <h1 className="text-stone-800 text-2xl font-semibold">My Request</h1>
      <div className="my-10 overflow-x-auto ">
        <table className="min-w-full bg-white shadow-md py-4 px-4 ">
          <thead className="border-b border-b-stone-300 py-3 bg-white text-stone-800 rounded-xl">
            <tr className="rounded-lg py-3">
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                SL.NO
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                SURVEY ID
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                DESTINATION
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                ITENARY
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                DEPARTURE DATE
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                HANDLED BY
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className=" text-gray-700">
            {data.map((row, index) => (
              <tr key={index} className=" text-center">
                <td className="py-3 px-5">{index + 1}</td>
                <td className="py-3 px-5">{row.surveyId}</td>
                <td className="py-3 px-5">{row.destination}</td>
                <td className="py-3 px-5">{row.tourPlan}</td>
                <td className="py-3 px-5">{row.dateItenary.startDate}</td>
                <td className="py-3 px-5">{row.handledBy}</td>
                <td className=" relative py-3 px-5 flex justify-center">
                  <button onClick={handleClick}>
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequest;
