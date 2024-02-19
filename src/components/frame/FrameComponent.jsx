import React, { useEffect, useRef, useState } from "react";
import arrow from "../../assets/images/frame/arrow.png";
import CountryDetails from "./CountryDetails";
import Tours from "./Tours";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import axios from "axios";
import { FaLessThan } from "react-icons/fa";

const FrameComponent = () => {
  const { pathname } = useLocation();
  const parts1 = pathname.split("/frame/");
  const wordAfterFrame1 = parts1.length > 1 ? parts1[1] : null;
  const countryName = wordAfterFrame1?.replace(/%20/g, " ");

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
          // setCurrentCountry(res.data[0]?.cityName);
        })
        .catch((err) => console.log(err));
    }
  }, [pathname]);
  const [currentCountry, setCurrentCountry] = useState(0);
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  const handleClickCountry = (index) => {
    setCurrentCountry(index);
    console.log(currentCountry);
  };

  // useEffect(() => {
  //   // Disable scrolling when currentCountry is undefined
  //   if (currentCountry === undefined) {
  //     document.body.style.overflow = "hidden";
  //     document.documentElement.style.overflow = "hidden"; // Apply to html element as well
  //   } else {
  //     document.body.style.overflow = "auto";
  //     document.documentElement.style.overflow = "auto"; // Remove overflow style
  //   }
  // }, [currentCountry]);

  return (
    <div className={`${currentCountry === undefined && ""}`}>
      {/* <div id="tour-main-norway" className="">
        
        <div
          className=" flex items-center duration-500 "
          // id={`${
          //   currentCountry === "norway"
          //     ? "tour-main-norway"
          //     : currentCountry === "iceland" && "tour-main-iceland"
          // }`}
        >
          <div className="  bg-stone-900 duration-500 px-10 h-screen w-96 ">
            <div className=" flex items-center gap-5 pb-8 pt-8">
              <Link
                to="/destination"
                className=" p-2 border-2 border-stone-100 rounded-full group hover:bg-white hover:text-stone-800 duration-300"
              >
                <FaLessThan className=" text-stone-100 group-hover:text-stone-800" />
              </Link>
              <h1 className=" text-2xl text-stone-50 font-bold uppercase">
                {countryName}
              </h1>
            </div>
            <div className=" flex flex-col justify-between items-center gap-3 text-[#0e0e0ef1] font-barlow-condensed w-full duration-500 xl:px-7 2xl:px-20">
              {destinationData?.map((country, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => handleClickCountry(index)}
                      className={`flex flex-col items-center justify-center cursor-pointer`}
                    >
                      <div className=" flex justify-start gap-5 text-white items-center w-full min-w-40">
                        <span className="text-5xl -mt-3">&#8226;</span>{" "}
                        <h1
                          className={`${
                            currentCountry === index
                              ? "text-4xl text-white"
                              : "text-2xl text-stone-200"
                          }`}
                        >
                          {country.cityName}
                        </h1>
                      </div>
                    </div>
                    <div
                      className={`${
                        index == destinationData?.length - 1 && "hidden"
                      } flex py-2 px-1 bg-[#c4c4c4de] rounded-3xl`}
                    ></div>
                  </>
                );
              })}
            </div>
          </div>
          <div
            className="w-36 h-screen 
  border-t-[0px] border-t-transparent
  border-l-[400px] border-l-stone-900
  border-b-[800px] border-b-transparent"
          ></div>
        </div>
      </div> */}
      <CountryDetails
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        destinationDataLength={destinationData.length}
      />
      <div ref={ref}>
        <Tours />
      </div>
      <div
        className={`${
          isIntersecting ? "flex" : "hidden"
        } fixed bottom-5 left-2 right-2  items-center justify-center font-noto-sans  z-50`}
      >
        <div className="grid grid-cols-3 items-start justify-center">
          <div className=" col-span-2 bg-[#D9D9D9] text-stone-900 text-lg font-medium py-2 px-2 sm:px-4 rounded-l-2xl">
            Create my itinerary
          </div>
          <a
            href="/customize"
            className=" bg-[#125EBA] text-lg py-2 px-2 sm:px-4 font-semibold text-stone-100 rounded-r-2xl"
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
