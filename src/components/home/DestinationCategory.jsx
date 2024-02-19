import React, { useEffect, useState } from "react";
import DestinationCountry from "./DestinationCountry";
import australiaBig from "../../assets/images/home/australia-big.png";
import greece from "../../assets/images/home/greece.png";
import japan from "../../assets/images/home/japan.png";
import newZealand from "../../assets/images/home/new-zealand.png";
import axios from "axios";

const DestinationCategory = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Our top picks");
  const [categoryData, setCategoryData] = useState([]);
  console.log(selectedCategory);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/country/category/${selectedCategory}`
      )
      .then((res) => {
        setCategoryData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  return (
    <div className="bg-[#EEF8FF] py-5 font-noto-sans">
      <div className="grid grid-cols-5 sm:flex items-center justify-center text-[10px] leading-3 sm:text-sm md:text-[15px] px-1 sm:px-5 md:px-8 lg:px-16">
        <button
          onClick={() => setSelectedCategory("Our top picks")}
          className={` border border-primary ${
            selectedCategory === "Our top picks"
              ? " bg-primary text-white "
              : " bg-white text-[#4F4F4F] "
          } hover:bg-primary hover:text-white rounded-tl py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-4 h-full duration-300`}
        >
          Our top picks
        </button>
        <button
          onClick={() => setSelectedCategory("Adventure Destinations")}
          className={` border border-primary py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-4 ${
            selectedCategory === "Adventure Destinations"
              ? " bg-primary text-white "
              : " bg-white text-[#4F4F4F] "
          } hover:bg-primary hover:text-white h-full duration-300`}
        >
          Adventure Destinations
        </button>
        <button
          onClick={() => setSelectedCategory("Nature & Wildlife Destinations")}
          className={` border border-primary py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-4 ${
            selectedCategory === "Nature & Wildlife Destinations"
              ? " bg-primary text-white "
              : " bg-white text-[#4F4F4F] "
          } hover:bg-primary hover:text-white h-full duration-300`}
        >
          Nature & Wildlife Destinations
        </button>
        <button
          onClick={() => setSelectedCategory("Romantic Destinations")}
          className={` border border-primary py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-4 ${
            selectedCategory === "Romantic Destinations"
              ? " bg-primary text-white "
              : " bg-white text-[#4F4F4F] "
          } hover:bg-primary hover:text-white h-full duration-300`}
        >
          Romantic Destinations
        </button>
        <button
          onClick={() => setSelectedCategory("Family-Friendly Destinations")}
          className={`border border-primary rounded-tr py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-4 ${
            selectedCategory === "Family-Friendly Destinations"
              ? " bg-primary text-white "
              : " bg-white text-[#4F4F4F] "
          } hover:bg-primary hover:text-white h-full duration-300`}
        >
          Family-Friendly Destinations
        </button>
      </div>
      <div className=" border border-black rounded-[28px] p-2 sm:p-5 mx-3 sm:mx-5 md:mx-8 lg:mx-16">
        {/* <div className=" flex items-start justify-center gap-3 sm:gap-8 text-[15px] text-[#333333]">
          <div className=" flex flex-col gap-2 justify-center min-w-[12px] sm:min-w-[35px]">
            <button className="" onClick={() => setSelectedCountry("All")}>
              All
            </button>
            <div
              className={` ${
                selectedCountry === "All" ? "flex" : "hidden"
              } bg-primary py-0.5 px-4 border-none rounded-xl `}
            ></div>
          </div>
          <div className=" flex flex-col gap-2 justify-center min-w-[12px] sm:min-w-[35px]">
            <button onClick={() => setSelectedCountry("Asia")}>Asia</button>
            <div
              className={` ${
                selectedCountry === "Asia" ? "flex" : "hidden"
              } bg-primary py-0.5 px-4 border-none rounded-xl`}
            ></div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-center">
            <button onClick={() => setSelectedCountry("Europe")}>Europe</button>
            <div
              className={` ${
                selectedCountry === "Europe" ? "flex" : "hidden"
              } bg-primary py-0.5 px-4 border-none rounded-xl`}
            ></div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-center">
            <button onClick={() => setSelectedCountry("Oceania")}>
              Oceania
            </button>
            <div
              className={` ${
                selectedCountry === "Oceania" ? "flex" : "hidden"
              } bg-primary py-0.5 px-4 border-none rounded-xl`}
            ></div>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-center">
            <button onClick={() => setSelectedCountry("Middle East")}>
              Middle East
            </button>
            <div
              className={` ${
                selectedCountry === "Middle East" ? "flex" : "hidden"
              } bg-primary py-0.5 px-4 border-none rounded-xl`}
            ></div>
          </div>
        </div> */}
        <div className=" grid grid-rows-[150px_150px_150px] grid-cols-7 gap-2 sm:gap-4 pt-3">
          {categoryData?.map((item, index) => {
            return (
              index < 5 && (
                <DestinationCountry
                  key={index} // Don't forget to add a key prop when using map
                  country={item.countryName}
                  properties={item.idealDays}
                  image={item.imageUrl}
                  customStyle={
                    index === 0
                      ? " row-start-1 row-end-4 col-start-1 col-end-4 "
                      : index === 1
                      ? " row-start-1 row-end-3 col-start-4 col-end-6 "
                      : index === 2
                      ? " row-start-3 row-end-4 col-start-4 col-end-6 "
                      : index === 3
                      ? "row-start-1 row-end-3 col-start-6 col-end-8 "
                      : " row-start-3 row-end-4 col-start-6 col-end-8 "
                  }
                />
              )
            );
          })}

          {/* <DestinationCountry
            country={"Australia"}
            properties={"15 tour places"}
            image={australiaBig}
            customStyle={" row-start-1 row-end-4 col-start-1 col-end-4 "}
          />
          <DestinationCountry
            country={"Japan"}
            properties={"15 tour places"}
            image={japan}
            customStyle={" row-start-1 row-end-3 col-start-4 col-end-6 "}
          />
          <DestinationCountry
            country={"Greece"}
            properties={"15 tour places"}
            image={greece}
            customStyle={" row-start-3 row-end-4 col-start-4 col-end-6 "}
          />
          <DestinationCountry
            country={"New Zealand"}
            properties={"15 tour places"}
            image={newZealand}
            customStyle={" row-start-1 row-end-3 col-start-6 col-end-8 "}
          />
          <DestinationCountry
            country={"Australia"}
            properties={"15 tour places"}
            image={japan}
            customStyle={" row-start-3 row-end-4 col-start-6 col-end-8 "}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DestinationCategory;
