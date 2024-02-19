import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNearestBranch,
  setTravelType,
} from "../../redux/features/customize/customizeSlice";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  selectTravelType,
  setDestination,
  setState,
} from "../../redux/features/customize/customizeSlice";
import axios from "axios";

const filter = createFilterOptions();

const TravelType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState(null);

  const [selectedTravelType, setSelectedTravelType] = useState("");

  useEffect(() => {
    if (country !== null) {
      console.log(country);
      dispatch(setTravelType(country));
    }
  }, [country]);

  const travelType = useSelector(selectTravelType);

  const [destinationvalue, setDestinationValue] = useState(null);
  const [nearestBranchValue, setNearestBranchValue] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    if (destinationvalue !== null && travelType === "International") {
      console.log(destinationvalue.countryName);
      dispatch(setDestination(destinationvalue.countryName));
    } else if (destinationvalue !== null && travelType === "Domestic") {
      console.log(destinationvalue.stateName);
      dispatch(setState(destinationvalue.stateName));
    }

    if (travelType === "International") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/country/`)
        .then((countriesRes) => {
          setCountryList(countriesRes.data);
          console.log(countriesRes.data);
        })
        .catch((err) => console.log(err));
    } else if (travelType === "Domestic") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/domesticstate/statename`)
        .then((statesRes) => {
          setStateList(statesRes.data);
          console.log(statesRes.data);
        })
        .catch((err) => console.log(err));
    }
  }, [destinationvalue, selectedTravelType]);

  useEffect(() => {
    if (nearestBranchValue !== null) {
      console.log(nearestBranchValue.branch);
      dispatch(setNearestBranch(nearestBranchValue.branch));
      country &&
        nearestBranchValue &&
        destinationvalue &&
        navigate("/customize/travel-with");
    }
  }, [nearestBranchValue]);

  return (
    <>
      <div className=" lg:ml-[20%] mt-32 flex items-center justify-center w-auto">
        <div className=" flex flex-col items-center justify-center gap-7">
          <h1 className=" font-bold text-stone-800 text-3xl text-center font-sans">
            Travel Type
          </h1>
          <div className=" flex flex-col gap-3 sm:gap-6 mb-3">
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg sm:text-xl font-roboto font-semibold text-stone-800">
                Select Travel Type:
              </h1>
              <Autocomplete
                size="small"
                fullWidth
                value={selectedTravelType}
                onChange={(event, newValue) => {
                  setSelectedTravelType(newValue);
                  dispatch(setTravelType(newValue));
                  setCountry(newValue);
                  country &&
                    nearestBranchValue &&
                    destinationvalue &&
                    navigate("/customize/travel-with");
                }}
                options={["Domestic", "International"]}
                renderInput={(params) => (
                  <TextField {...params} label="Travel Type" />
                )}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg sm:text-xl font-roboto font-semibold text-stone-800">
                What's your pick for next vacation ?
              </h1>
              <div className=" flex border-b border-stone-300 rounded w-[340px] min-[450px]:w-[440px] sm:w-full">
                <Autocomplete
                  fullWidth
                  className="bg-stone-100"
                  value={destinationvalue}
                  onChange={(event, newValue) => {
                    setDestinationValue(newValue);
                    country &&
                      nearestBranchValue &&
                      destinationvalue &&
                      navigate("/customize/travel-with");
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={
                    travelType === "International" ? countryList : stateList
                  }
                  getOptionLabel={(option) => {
                    // Regular option
                    return option.countryName || option.stateName;
                  }}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      className="px-5 py-2 font-medium hover:text-white hover:bg-primary duration-300 rounded-lg cursor-pointer"
                    >
                      {option.countryName || option.stateName}
                    </li>
                  )}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0",
                      padding: "8px",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    ".MuiInputLabel-shrink": {
                      display: "none",
                    },
                    width: 500,
                  }}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="Search destination..." />
                  )}
                />

                <div className=" pl-2 pr-4 py-2 bg-stone-100">
                  <IoSearch className=" text-2xl text-stone-600" />
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg sm:text-xl font-roboto font-semibold text-stone-800">
                Where is your nearest branch?
              </h1>
              <div className=" flex border-b border-stone-300 rounded w-[340px] min-[450px]:w-[440px] sm:w-full">
                <Autocomplete
                  className="bg-stone-100"
                  value={nearestBranchValue}
                  onChange={(event, newValue) => {
                    setNearestBranchValue(newValue); // Update nearestBranchValue
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={nearestBranch}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.branch;
                  }}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      className="px-5 py-2 font-medium hover:text-white hover:bg-primary duration-300 rounded-lg cursor-pointer"
                    >
                      {option.branch}
                    </li>
                  )}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0",
                      padding: "8px",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    ".MuiInputLabel-shrink": {
                      display: "none",
                    },
                    width: 500,
                  }}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="Search airports..." />
                  )}
                />
                <div className=" pl-2 pr-4 py-2 bg-stone-100 h-full">
                  <IoSearch className=" text-2xl text-stone-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full flex items-end justify-end pr-[10%] mt-72">
        <button
          onClick={() => navigate("/")}
          className=" lg:hidden border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default TravelType;

const nearestBranch = [{ branch: "Chennai" }, { branch: "Coimbatore" }];
