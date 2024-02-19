import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { setNearestBranch } from "../../redux/features/customize/customizeSlice";
import { useDispatch } from "react-redux";

const filter = createFilterOptions();

const NearestBranch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  return (
    <>
      <div className=" lg:ml-[20%] mt-32 flex items-center justify-center">
        
      </div>
      <div className=" h-full flex items-end justify-end pr-[10%] mt-32">
        <button
          onClick={() => navigate("/customize/date-itenary")}
          className=" lg:hidden border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default NearestBranch;

