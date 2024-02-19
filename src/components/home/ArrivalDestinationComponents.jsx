import React from "react";
import { useNavigate } from "react-router-dom";

const ArrivalDestinationComponents = ({ image, country, properties }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/customize");
  };
  return (
    <div
      onClick={handleNavigation}
      className=" flex flex-col items-center justify-center gap-3 cursor-pointer"
    >
      <img
        className=" w-[280px] h-[350px] lg:w-[300px] lg:h-[180px] xl:w-[250px] xl:h-[300px] rounded-full lg:rounded-full object-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        src={image}
        alt=""
      />
      <div className=" text-[#181818] flex flex-col items-center gap-1 ">
        <h1 className=" font-sf-pro-display font-medium text-xl">{country}</h1>
        <p className=" font-noto-sans text-sm ">{properties}</p>
      </div>
    </div>
  );
};

export default ArrivalDestinationComponents;
