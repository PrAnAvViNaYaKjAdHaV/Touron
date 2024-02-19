import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCustomizeData } from "../../redux/features/customize/customizeSlice";
import axios from "axios";

const QuerySubmission = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const customizeData = useSelector(selectCustomizeData);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      console.log(customizeData);
      setData(customizeData);
    }
  }, []);

  const handleDone = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/request/add`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" lg:ml-[20%]">
      <div className=" flex justify-center items-center h-screen">
        <div className=" flex flex-col gap-6 justify-center items-center mb-16 w-[600px] px-5 py-5">
          <div className=" flex justify-center items-center">
            <FaCheckCircle className=" text-5xl sm:text-7xl text-primary" />
          </div>
          <div className=" flex flex-col gap-1">
            <h1 className=" text-stone-700 font-semibold text-3xl text-center">
              {`Hey ${
                user.username ? user.username : "traveller"
              } You are going to ${
                data.destination
                  ? data.destination
                  : data.state
                  ? data.state
                  : data.city
              }`}
            </h1>
            {/* <p className=" text-stone-500 text-center text-sm sm:text-base">
              Indulge in a realistic and personalized travel experience with our
              carefully designed tour plan. Explore the world confidently with
              our realistic and tailored approach to create lasting memories on
              your journey.
            </p> */}
          </div>
          <div className=" flex items-center gap-3">
            <Link
              to={`/itenary/${data.tourPlan}`}
              onClick={handleDone}
              className="border border-primary bg-transparent py-1.5 sm:py-2 px-4 sm:px-6 font-semibold text-primary text-sm sm:text-lg rounded hover:text-primary hover:bg-white duration-300"
            >
              View Itinery
            </Link>
            <Link
              to="/dashboard/request"
              onClick={handleDone}
              className="border border-primary bg-transparent py-1.5 sm:py-2 px-4 sm:px-6 font-semibold text-primary text-sm sm:text-lg rounded hover:text-primary hover:bg-white duration-300"
            >
              Manage Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySubmission;
