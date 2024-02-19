import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { setDepartureStation } from "../../redux/features/customize/customizeSlice";
import { useDispatch } from "react-redux";

const filter = createFilterOptions();

const ArrivalStation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value !== null) {
      console.log(value.airport);
      dispatch(setDepartureStation(value.airport));
      navigate("/customize/date-itenary");
    }
  }, [value]);

  return (
    <>
      <div className=" lg:ml-[20%] mt-32 flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-7">
          <h1 className=" text-center text-3xl font-roboto font-semibold text-stone-800">
            Where are you travelling from?
          </h1>
          <div className=" flex items-center justify-center border-b border-stone-300 rounded w-[340px] min-[450px]:w-[440px] sm:w-full">
            <Autocomplete
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
              options={airportList}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.airport;
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  className="px-5 py-2 font-medium hover:text-white hover:bg-primary duration-300 rounded-lg cursor-pointer"
                >
                  {option.airport}
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
                <TextField {...params} label="Search airports..." />
              )}
            />
            <div className=" pl-2 pr-4 py-2 bg-stone-100 h-full">
              <IoSearch className=" text-2xl text-stone-600" />
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full flex items-end justify-end pr-[10%] mt-32">
        <button
          onClick={() => navigate("/customize/travel-with")}
          className=" lg:hidden border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default ArrivalStation;

const airportList = [
  { airport: "Port Blair, Andaman and Nicobar Islands" },
  { airport: "Visakhapatnam, Andhra Pradesh" },
  { airport: "Hyderabad, Telangana" },
  { airport: "Guwahati, Assam" },
  { airport: "New Delhi, Delhi" },
  { airport: "Dabolim (Village), Goa" },
  { airport: "Ahmedabad, Gujarat" },
  { airport: "Bengaluru, Karnataka" },
  { airport: "Mangalore, Karnataka" },
  { airport: "Kochi, Kerala" },
  { airport: "Kozhikode, Kerala" },
  { airport: "Thiruvananthapuram, Kerala" },
  { airport: "Mumbai, Maharashtra" },
  { airport: "Nagpur, Maharashtra" },
  { airport: "Imphal, Manipur" },
  { airport: "Bhubaneswar, Odisha" },
  { airport: "Amritsar, Punjab" },
  { airport: "Jaipur, Rajasthan" },
  { airport: "Chennai, Tamil Nadu" },
  { airport: "Coimbatore, Tamil Nadu" },
  { airport: "Tiruchirapalli, Tamil Nadu" },
  { airport: "Lucknow, Uttar Pradesh" },
  { airport: "Varanasi, Uttar Pradesh" },
  { airport: "Kolkata, West Bengal" },
  { airport: "Gaya, Bihar" },
  { airport: "Surat, Gujarat" },
  { airport: "Vadodara, Gujarat" },
  { airport: "Srinagar, Jammu & Kashmir" },
  { airport: "Kannur, Kerala" },
  { airport: "Pune, Maharashtra" },
  { airport: "Ranchi, Jharkhand" },
  { airport: "Siliguri, West Bengal" },
];
