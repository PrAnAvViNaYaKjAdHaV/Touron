import React from "react";
import { FaCity, FaLocationDot } from "react-icons/fa6";
import { MdOutlineTravelExplore, MdTravelExplore } from "react-icons/md";
import { FaPlaneUp } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { PiSquareHalfLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../../assets/images/common/touronWhileLogo.png";
import { useSelector } from "react-redux";
import {
  selectDateItenaryEndDate,
  selectDateItenaryStartDate,
  selectDepartureStation,
  selectDestination,
  selectTravelWith,
  selectTravelType,
  selectState,
  selectCity,
  selectTourPlan,
  selectNearestBranch,
} from "../../../redux/features/customize/customizeSlice";

const SidebarCustomize = () => {
  const { pathname } = useLocation();

  const travelType = useSelector(selectTravelType);
  const state = useSelector(selectState);
  const city = useSelector(selectCity);
  const destination = useSelector(selectDestination);
  const travelWith = useSelector(selectTravelWith);
  const departureStation = useSelector(selectDepartureStation);
  const dateItenaryStart = useSelector(selectDateItenaryStartDate);
  const dateItenaryEnd = useSelector(selectDateItenaryEndDate);
  const tourPlan = useSelector(selectTourPlan);
  const nearestBranch = useSelector(selectNearestBranch);

  return (
    <div className="hidden lg:flex lg:fixed left-0 top-0 bottom-0 xl:w-[23%] bg-gradient-to-b from-[#6a85ff] to-[#0D4DD0] text-stone-50 font-noto-sans text-xl font-semibold py-2 md:px-6 lg:px-10 z-20">
      <div className=" flex flex-col items-start justify-center gap-12 h-full w-full -mt-10">
        <div className=" flex justify-center items-center w-full">
          <img className=" w-24" src={logoImg} alt="" />
        </div>
        <Link
          to={`/customize`}
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize" && "scale-110 text-[#aadcff]"
          } hover:text-stone-400  duration-300`}
        >
          <MdTravelExplore />
          <h1>Travel Type</h1>
        </Link>
        {/* <Link
          to={travelType != "" ? `/customize/destination` : "#"}
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/destination" && "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <FaLocationDot />
          <h1>Destination</h1>
        </Link> */}
        <Link
          to={
            (destination != "" || state != "") && nearestBranch != ""
              ? `/customize/travel-with`
              : "#"
          }
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/travel-with" && "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <MdOutlineTravelExplore />
          <h1>Travel With</h1>
        </Link>
        <Link
          to={
            (destination != "" || state != "") &&
            nearestBranch != "" &&
            travelWith != ""
              ? `/customize/departure-station`
              : "#"
          }
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/departure-station" &&
            "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <FaPlaneUp className=" rotate-45" />
          <h1>Departure Station</h1>
        </Link>
        <Link
          to={
            (destination != "" || state != "") &&
            nearestBranch != "" &&
            travelWith != "" &&
            departureStation != ""
              ? `/customize/date-itenary`
              : "#"
          }
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/date-itenary" && "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <FaCalendarAlt />
          <h1>Date & Itenary</h1>
        </Link>
        {/* <Link
          to={
            (destination != "" || state != "") &&
            departureStation != "" &&
            dateItenaryStart != "" &&
            dateItenaryEnd != "" &&
            tourPlan != ""
              ? `/customize/nearest-branch`
              : "#"
          }
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/nearest-branch" &&
            "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <FaCalendarAlt />
          <h1>Nearest branch</h1>
        </Link> */}
        <Link
          to={
            (destination != "" || state != "") &&
            nearestBranch != "" &&
            travelWith != "" &&
            departureStation != "" &&
            dateItenaryStart != "" &&
            dateItenaryEnd != ""
              ? `/customize/query-submission`
              : "#"
          }
          className={` flex items-center justify-center gap-2 ${
            pathname === "/customize/query-submission" &&
            "scale-110 text-[#90CEFA]"
          } hover:text-stone-400  duration-300`}
        >
          <PiSquareHalfLight />
          <h1>Query Submission</h1>
        </Link>
      </div>
    </div>
  );
};

export default SidebarCustomize;
