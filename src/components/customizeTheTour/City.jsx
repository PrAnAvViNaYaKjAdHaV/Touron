import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectState,
  selectTravelType,
  setCity,
  setDestination,
  setState,
} from "../../redux/features/customize/customizeSlice";
import axios from "axios";

const filter = createFilterOptions();

const City = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateName = useSelector(selectState);

  const [value, setValue] = useState(null);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    if (value !== null) {
      console.log(value.cityName);
      dispatch(setCity(value.cityName));
      navigate("/customize/travel-with");
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/domesticcity/state`, {
        params: {
          stateName: stateName,
        },
      })
      .then((res) => {
        setCityList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [value]);

  return (
    <>
      <div className=" lg:ml-[20%] mt-32 flex items-center justify-center w-auto">
        <div className=" flex flex-col items-center justify-center gap-7">
          <h1 className=" text-center text-2xl sm:text-3xl font-roboto font-semibold text-stone-800">
            Select a city you would like to travel
          </h1>
          <div className=" flex items-center justify-center border-b border-stone-300 rounded w-[340px] min-[450px]:w-[440px] sm:w-full">
            <Autocomplete
              fullWidth
              className="bg-stone-100"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={cityList}
              getOptionLabel={(option) => {
                // Regular option
                return option.cityName;
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  className="px-5 py-2 font-medium hover:text-white hover:bg-primary duration-300 rounded-lg cursor-pointer"
                >
                  {option.cityName}
                </li>
              )}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0",
                  padding: "8px",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                ".MuiInputLabel-shrink": {
                  display: "none",
                },
                width: 500,
              }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Search Cityname..." />
              )}
            />

            <div className=" pl-2 pr-4 py-2 bg-stone-100">
              <IoSearch className=" text-2xl text-stone-600" />
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full flex items-end justify-end pr-[10%] mt-72">
        <button
          onClick={() => navigate("/destination")}
          className=" lg:hidden border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default City;
