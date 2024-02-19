import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimelineCustomize from "./TimelineCustomize";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  setDateItenary,
  setTourPlanId,
} from "../../redux/features/customize/customizeSlice";
import axios from "axios";
import AuthPopup from "../../layout/auth/AuthPopup";

const DateAndItenary = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tourPlan, setTourPlan] = useState([]);
  const [tourPlanIndex, setTourPlanIndex] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [country, setCountry] = useState(useSelector(selectDestination));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleNextBtn = () => {
    const data = {
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    };
    console.log(data);
    dispatch(setDateItenary(data));
    dispatch(setTourPlanId(tourPlan[tourPlanIndex]._id));
    navigate("/customize/query-submission");
  };

  const handleGetTour = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      if (country != "" && country != null) {
        console.log("no");
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`, {
            params: { country },
          })
          .then((res) => {
            setTourPlan(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        setCountry("India");
        console.log("yes");
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`, {
            params: { country },
          })
          .then((res) => {
            setTourPlan(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const showTourPlan = (index) => {
    setTourPlanIndex(index);
  };

  return (
    <div className="  lg:ml-[23%] flex flex-col sm:flex-row gap-4">
      <div className=" flex flex-col justify-start gap-7 px-10 sm:px-4 md:px-10 lg:px-12 py-10 overflow-hidden bg-white lg:w-[500px] xl:w-[600px]">
        <div className=" py-10">
          <div className="w-fit mx-auto p-4 bg-white shadow-md rounded-md my-10">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Start Date:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                minDate={new Date()}
                startDate={startDate}
                // endDate={endDate}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                End Date:
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                // startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className=" flex align-middle justify-center lg:justify-end">
            {/* <button className=" border border-primary hover:bg-white hover:text-primary duration-300 bg-primary w-full h-10 rounded-md font-semibold text-stone-50">
              GET TOUR PLAN
            </button>  */}
            <button
              onClick={handleGetTour}
              className="text-white border border-primary hover:bg-white hover:text-primary duration-300 bg-primary font-medium rounded-md text-sm px-4 py-3 text-center mr-2 mb-2 flex md:w-1/2 w-full"
            >
              <span className="w-full align-middle justify-center text-center font-bold">
                GET TOUR PLAN
              </span>
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-3 items-center justify-center font-medium">
          {Array.isArray(tourPlan) &&
            tourPlan.map((tour, index) => {
              return (
                index < 3 && (
                  <div
                    onClick={() => showTourPlan(index)}
                    key={index}
                    className={`flex items-center gap-2 text-primary ${
                      tourPlanIndex === index && " underline font-bold "
                    } hover:underline cursor-pointer`}
                  >
                    <div className=" p-2 bg-primary rounded-full"></div>
                    <p>{index + 1} TOUR PLAN</p>
                  </div>
                )
              );
            })}
        </div>
        {/* <AuthPopup
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        /> */}
        <div className=" flex items-center justify-center gap-4 lg:justify-end">
          <button
            onClick={() => navigate("/customize/departure-station")}
            className=" lg:hidden border border-primary hover:bg-primary hover:text-white duration-300 bg-white py-2 px-4 rounded-md font-medium text-primary"
          >
            Back
          </button>
          <button
            onClick={handleNextBtn}
            className=" border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="  mt-10 sm:mt-24 flex flex-col gap-3 bg-[#F4F7FB] py-14 sm:px-5 h-full w-full overflow-y-scroll">
        <h1 className=" underline font-medium text-xl text-stone-800 px-6">
          TOUR PLAN 1
        </h1>
        <TimelineCustomize tourPlan={tourPlan[tourPlanIndex]} />
      </div>
    </div>
  );
};

export default DateAndItenary;
