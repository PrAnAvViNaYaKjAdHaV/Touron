import React from "react";
import { useNavigate } from "react-router-dom";

const DestinationCountry = ({ country, properties, image, customStyle }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (country === "India" || country === "india") {
      navigate(`/destination/states`);
    } else {
      navigate(`/country/frame/${country}`);
    }
  };
  return (
    <div
      className={` relative ${customStyle} cursor-pointer `}
      onClick={handleNavigation}
    >
      <img
        className=" w-full h-full object-cover rounded-lg transition duration-700 ease-in-out hover:-translate-y-2 hover:scale-120"
        src={image}
        alt=""
      />
      <div className="absolute left-2 sm:left-5 bottom-4 text-white">
        <h1 className=" font-sf-pro-display font-medium text-lg sm:text-xl">
          {country}
        </h1>
        <p className=" font-noto-sans text-xs sm:text-sm ">{properties}</p>
      </div>
    </div>
  );
};

export default DestinationCountry;
