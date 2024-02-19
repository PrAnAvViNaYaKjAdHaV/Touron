import React, { useEffect, useState } from "react";
import heroImg from "../../assets/images/home/hero.png";
import location from "../../assets/icons/location.png";
import calendar from "../../assets/icons/calendar.png";
import userSquare from "../../assets/icons/user-square.png";
import InputFieldHome from "../common/InputFieldHome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

const filter = createFilterOptions();

const HeroSection = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/country/`)
      .then((countriesRes) => {
        setCountryList(countriesRes.data);
        console.log(countriesRes.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value && value.countryName) {
      navigate(`/country/frame/${value.countryName}`);
    }
  };

  return (
    <div className=" relative h-fit w-fit px-8 md:px-12 xl:px-20 py-2  font-noto-sans">
      <img
        className=" w-screen min-h-[350px] "
        src={heroImg}
        alt="Hero Images"
      />
      <div className=" absolute top-[40%] bottom-[40%] left-[10%] right-[10%] sm:left-[20%] sm:right-[20%] lg:left-[30%] lg:right-[30%] flex flex-col justify-center items-center sm:gap-2">
        <h1 className=" font-bold text-2xl sm:text-[35px] leading-[50px] text-white">
          Enjoy Your Dream Vacation
        </h1>
        <p className=" text-white text-sm sm:text-lg lg:text-xl text-left">
          Plan and book our perfect trip with expert advice, travel tips,
          destination information and inspiration from us
        </p>
      </div>
      <div className=" absolute -bottom-6 sm:-bottom-8 md:-bottom-6 left-[5%] right-[5%] sm:left-[15%] sm:right-[15%] flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="flex justify-center items-center gap-2 bg-white border border-white rounded-lg shadow-lg py-2 px-2 w-full max-w-[600px]"
        >
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
            options={countryList}
            getOptionLabel={(option) => {
              // Regular option
              return option.countryName;
            }}
            renderOption={(props, option) => (
              <li
                {...props}
                className="px-5 py-2 font-medium hover:text-white hover:bg-primary duration-300 rounded-lg cursor-pointer"
              >
                {option.countryName}
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
            }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Search destination..." />
            )}
          />
          <button
            type="submit"
            className=" border border-primary text-white bg-primary rounded-md py-2 px-5 font-medium hover:bg-white hover:text-primary duration-300"
          >
            Explore
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
