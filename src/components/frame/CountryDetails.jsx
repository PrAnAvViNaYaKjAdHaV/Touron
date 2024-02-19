import React, { useEffect, useState } from "react";
import norwayImg from "../../assets/images/frame/norway-img.png";
import icelandImg from "../../assets/images/frame/iceland-img.png";
import arrowCurve from "../../assets/images/frame/arrow-curve.png";
import clockImg from "../../assets/images/frame/clock.png";
import cloudyImg from "../../assets/images/frame/cloudy.png";
import passportImg from "../../assets/images/frame/passport.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaGreaterThan } from "react-icons/fa6";
import Navbar from "../common/Navbar";

const CountryDetails = ({
  currentCountry,
  setCurrentCountry,
  destinationDataLength,
}) => {
  const { pathname } = useLocation();
  const [destinationData, setDestinationData] = useState([]);
  useEffect(() => {
    if (pathname.slice(0, 6) === "/state") {
      const parts = pathname.split("/frame/");
      const wordAfterFrame = parts.length > 1 ? parts[1] : null;
      const formattedWord = wordAfterFrame?.replace(/%20/g, " ");
      console.log(formattedWord);

      axios
        .get(`${import.meta.env.VITE_API_URL}/api/domesticcity/state`, {
          params: {
            stateName: formattedWord,
          },
        })
        .then((res) => {
          setDestinationData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      const parts = pathname.split("/frame/");
      const wordAfterFrame = parts.length > 1 ? parts[1] : null;
      const formattedWord = wordAfterFrame?.replace(/%20/g, " ");
      console.log(formattedWord);

      axios
        .get(`${import.meta.env.VITE_API_URL}/api/internationalcity/country`, {
          params: {
            countryName: formattedWord,
          },
        })
        .then((res) => {
          setDestinationData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [pathname, currentCountry]);

  useEffect(() => {
    if (destinationData && destinationData.length > 0) {
      // console.log(destinationData[0]?.imageUrl);
    } else {
      console.log("No destination data available");
    }
  }, [destinationData]);

  if (!destinationData || destinationData.length === 0) {
    return (
      <div>
        {/* You can render a message or loading indicator here */}
        No destination data available.
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (destinationDataLength > currentCountry + 1) {
      setCurrentCountry(currentCountry + 1);
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    if (currentCountry > 0) {
      setCurrentCountry(currentCountry - 1);
    }
  };

  return (
    <div className=" relative" id="tour-bg">
      <Navbar type="frame" />
      <div className=" py-12 px-5 md:px-16 lg:px-20 xl:px-32">
        {/* <div className=" text-stone-700 font-medium pb-4 px-10 flex items-center gap-3">
          <Link
            to="/"
            className=" hover:underline hover:text-stone-500 duration-300"
          >
            Home
          </Link>
          <FaGreaterThan />
          <Link
            to="/destination"
            className=" hover:underline hover:text-stone-500 duration-300"
          >
            Destination
          </Link>
          <FaGreaterThan />
          <p className=" hover:underline hover:text-stone-500 duration-300">
            Frame
          </p>
        </div> */}
        <div className=" flex flex-col gap-4 md:gap-3 border-4 border-stone-50 rounded-3xl px-6 py-5">
          <div className=" relative px-3 md:px-0 lg:px-6 w-fit h-fit">
            <div className=" flex flex-col md:flex-row justify-between gap-5 sm:gap-10 md:gap-14 lg:gap-16 xl:gap-32 2xl:gap-44">
              <div className=" flex flex-col gap-4 mt-20">
                <h1 className=" font-noto-sans font-bold text-3xl md:text-5xl text-[#000000]">
                  {destinationData[currentCountry]?.cityName}
                </h1>
                <h2 className=" text-base sm:text-lg lg:text-2xl font-noto-sans text-[#000000]">
                  {destinationData[currentCountry]?.aboutCity}
                </h2>
              </div>
              <img
                className=" z-10 w-full h-[20rem] md:h-[23rem] lg:h-[410px] md:w-[14rem] lg:w-[380px] object-cover rounded-md"
                src={destinationData[currentCountry]?.imageUrl}
                alt=""
              />
            </div>
            {/* <div className=" hidden md:flex absolute -top-5 left-[45%]">
              <img src={arrowCurve} alt="" />
            </div> */}
          </div>
          <div className=" w-full flex gap-8 items-center justify-end pt-5 pb-2">
            <button
              onClick={handleBack}
              className=" hover:bg-primary hover:text-white duration-300 bg-transparent border border-primary text-primary font-semibold py-1.5 px-6 rounded-md"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className=" hover:bg-transparent hover:text-primary duration-300 bg-primary border border-primary text-white font-semibold py-1.5 px-6 rounded-md"
            >
              Next
            </button>
          </div>
          {/* <div className="flex justify-center items-center">
            <div className=" flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-6 md:gap-0 border border-[#000000] rounded-3xl mt-6 xl:mt-28 xl:mx-6 px-4 md:px-4 xl:px-14 py-1 md:py-4 text-[#000000] w-fit md:w-full">
              <div className=" flex flex-col items-center justify-center md:gap-1">
                <img
                  className=" w-16 md:w-[55%] lg:w-[55%] xl:w-auto"
                  src={cloudyImg}
                  alt=""
                />
                <h2 className=" font-montserrat font-medium sm:text-lg md:text-xl lg:text-lg xl:text-2xl">
                  Weather Conditions
                </h2>
                <h3 className=" font-noto-sans font-bold text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-3xl">
                  -7 to 21 C
                </h3>
              </div>
              <div className=" flex flex-col items-center justify-center md:gap-1">
                <img className=" w-16 md;w-auto" src={passportImg} alt="" />
                <h2 className=" font-montserrat font-medium sm:text-lg md:text-xl lg:text-lg xl:text-2xl">
                  Eligible for Visa on Arrival
                </h2>
                <h3 className=" font-noto-sans font-bold text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-3xl">
                  No
                </h3>
              </div>
              <div className=" flex flex-col items-center justify-center md:gap-1">
                <img
                  className=" w-16 md:w-[55%] lg:w-[55%] xl:w-auto"
                  src={clockImg}
                  alt=""
                />
                <h2 className=" font-montserrat font-medium sm:text-lg md:text-xl lg:text-lg xl:text-2xl">
                  Time Difference
                </h2>
                <h3 className=" font-noto-sans font-bold text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-3xl">
                  -3.5 Hours
                </h3>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
