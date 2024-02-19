import React from "react";
import australia from "../../assets/images/home/australia.png";
import { useNavigate } from "react-router-dom";

const TrendingDestinationComponents = ({ country, properties, image }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/customize");
  };

  return (
    <div
      onClick={handleNavigation}
      className="group flex flex-col gap-1 cursor-pointer"
    >
      <div className=" w-fit h-fit overflow-hidden rounded-[34px]">
        <img
          className=" group-hover:scale-125 w-56 h-40 rounded-[34px] transition duration-700 ease-in-out hover:-translate-y-2 hover:scale-90"
          src={image}
          alt=""
        />
      </div>
      <div className=" text-[#181818] group-hover:text-[#3d3d3d] duration-300 pl-4">
        <h1 className=" font-sf-pro-display font-medium text-xl">{country}</h1>
        <p className=" font-noto-sans text-sm ">{properties}</p>
      </div>
    </div>
  );
};

export default TrendingDestinationComponents;
