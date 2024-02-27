import React from "react";
import { Link } from "react-router-dom";

const TopbarCustomize = () => {
  return (
    <div className=" fixed top-0 left-0 lg:left-[19%] xl:left-[22%] right-0 py-2 sm:py-5 space-y-1 font-noto-sans text-md sm:text-xl text-stone-600 bg-[#ebebeb] z-10 px-10">
      <p>Well done, You're few steps away to find your dream vacation</p>

      <div>
        <Link
          to="/"
          // className=" border border-primary text-white bg-primary rounded-md w-20 ml-2xl py-1 lg:py-1.5 px-3 font-medium hover:bg-white hover:text-primary duration-300 hidden lg:flex"
        >
          Home
        </Link>
      </div>
      <div />
    </div>
  );
};

export default TopbarCustomize;
