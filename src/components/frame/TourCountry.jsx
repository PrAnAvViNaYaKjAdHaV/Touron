import React from "react";

const TourCountry = ({ image, name, customStyle }) => {
  return (
    <div className=" group rounded-[3.2rem] cursor-pointer relative w-fit h-fit  duration-300 overflow-hidden">
      <img className=" w-44 sm:w-60 lg:min-w-[14rem] h-64 sm:h-72 md:h-96 lg:h-auto rounded-3xl group-hover:scale-125 duration-300" src={image} alt="" />
      <div className=" absolute left-1 right-1 bottom-5 flex justify-center w-full">
        <p className={` font-noto-sans duration-300 ${customStyle} text-white text-2xl group-hover:text-3xl font-extrabold sm:text-2xl`}>{name}</p>
      </div>
    </div>
  );
};

export default TourCountry;
