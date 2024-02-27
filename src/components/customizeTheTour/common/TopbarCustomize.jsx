import React from "react";
import { Link } from "react-router-dom";

const TopbarCustomize = () => {
  return (
    <div className=" fixed top-0 left-0 lg:left-[19%] xl:left-[22%] right-0 py-2 sm:py-5 space-y-1 font-reem-kufi-fun text-xl sm:text-2xl text-stone-600 bg-[#ebebeb] z-10 px-10">
      <p>Itinerary</p>
      <div className=" text-base  text-stone-700 font-medium flex items-center gap-3">
        <Link
          to="/"
          className=" hover:underline hover:text-stone-500 duration-300"
        >
          Home
        </Link>    
        </div>
    </div>
  );
};

export default TopbarCustomize;
