import React, { useEffect, useState } from "react";
import TrendingDestinationComponents from "./TrendingDestinationComponents";
import axios from "axios";

const TrendingDestination = () => {
  const [trendingDestination, setTrendingDestination] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/country/category/Trending%20Plan`
      )
      .then((res) => {
        setTrendingDestination(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" py-20 px-8 sm:px-12 md:px-8 lg:px-16">
      <h1 className=" text-left font-josefin-sans font-medium text-2xl text-[#181818] py-5">
        TRENDING DESTINATION
      </h1>
      <div className=" flex flex-wrap justify-center items-center gap-5 lg:gap-10">
        {trendingDestination?.map((item, index) => (
          <TrendingDestinationComponents
            country={item.countryName}
            properties={item.idealDays}
            image={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingDestination;

