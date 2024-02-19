import React, { useEffect, useState } from "react";
import TourCountry from "./TourCountry";
import toursBgNorway from "../../assets/images/frame/tour-norway.png";
import toursBgIceland from "../../assets/images/frame/tour-iceland.png";
import oslo from "../../assets/images/frame/oslo.png";
import tromso from "../../assets/images/frame/tromso.png";
import lofoten from "../../assets/images/frame/lofoten.png";
import bergen from "../../assets/images/frame/bergen.png";
import gothenburg from "../../assets/images/frame/gothenburg.png";
import stockholm from "../../assets/images/frame/stockholm.png";
import swedishLapland from "../../assets/images/frame/swedish-lapland.png";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Tours = () => {
  const { pathname } = useLocation();
  const [destinationData, setDestinationData] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname.slice(0, 6) === "/state") {
          const parts = pathname.split("/frame/");
          const wordAfterFrame = parts.length > 1 ? parts[1] : null;
          const formattedWord = wordAfterFrame?.replace(/%20/g, " ");

          const destinationResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/domesticcity/state`,
            {
              params: {
                stateName: formattedWord,
              },
            }
          );

          setDestinationData(destinationResponse.data);

          if (destinationResponse.data && destinationResponse.data.length > 0) {
            const countryName = destinationResponse.data[0].countryName;
            console.log(countryName);
            const itineryResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`,
              {
                params: { country: countryName },
              }
            );

            setFormData(itineryResponse.data);
            console.log(itineryResponse.data);
          }
        } else {
          const parts = pathname.split("/frame/");
          const wordAfterFrame = parts.length > 1 ? parts[1] : null;
          const formattedWord = wordAfterFrame?.replace(/%20/g, " ");
          console.log(formattedWord);

          const destinationResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/internationalcity/country`,
            {
              params: {
                countryName: formattedWord,
              },
            }
          );
          setDestinationData(destinationResponse.data);
          if (destinationResponse.data && destinationResponse.data.length > 0) {
            const countryName = destinationResponse.data[0].countryName;
            console.log(countryName);
            const itineryResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`,
              {
                params: { country: countryName },
              }
            );

            setFormData(itineryResponse.data);
            console.log(itineryResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pathname]);

  return (
    <div className={` relative py-3`} id={"norway-bg"}>
      <div className="px-3 md:px-6 lg:px-8 xl:px-12">
        <h1
          className={` font-patrick-hand text-3xl sm:text-4xl lg:text-5xl xl:text-6xl  `}
        >
          TOURS
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-y-12 gap-x-10 lg:gap-10 py-10 lg:px-20">
          {formData?.map((item, index) => (
            <TourCountry key={index} image={lofoten} name={item.itineryTitle} />
          ))}
          {/* <div className="flex items-center justify-center invisible opacity-0 group-hover:opacity-100 group-hover:visible -mt-7 md:-mt-12 duration-300 text-lg">
              <p className="">Read More</p>
              <FaArrowRightLong className="ml-3 mt-0.5 text-orange-700 scale-x-150" />
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Tours;
