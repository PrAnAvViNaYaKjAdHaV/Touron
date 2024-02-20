import React, { useEffect, useState } from "react";
import ArrivalDestinationComponents from "./ArrivalDestinationComponents";
import australia from "../../assets/images/home/australia-big.png";
import japan from "../../assets/images/home/japan.png";
import newZealand from "../../assets/images/home/new-zealand.png";
import greece from "../../assets/images/home/greece.png";
import axios from "axios";

const ArrivalDestination = () => {
  const [arrivalData, setArrivalData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/country/category/VISA%20Free%20Plan`
      )
      .then((res) => {
        setArrivalData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" py-8 px-8 sm:px-12 md:px-8 lg:px-16">
      <h1 className=" text-left font-josefin-sans font-medium text-2xl text-[#181818] py-5">
        VISA ON ARRIVAL DESTINATION
      </h1>
      <div className=" grid sm:grid-cols-2 lg:flex justify-center items-center gap-5 lg:gap-3 xl:gap-10">
        {arrivalData?.map((item, index) => (
          <ArrivalDestinationComponents
          key={index}
            image={item.imageUrl}
            country={item.countryName}
            properties={item.idealDays}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrivalDestination;
