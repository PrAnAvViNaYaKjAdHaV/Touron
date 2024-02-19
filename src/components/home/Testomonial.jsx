import React from "react";
import quotes from "../../assets/images/home/quotes.png";

const Testomonial = ({ item }) => {
  return (
    <div className=" flex items-center justify-center gap-2 md:gap-5">
      <img src={item.image.url} className=" w-20 h-20 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full" alt="" />
      <div className=" flex flex-col justify-between gap-1 sm:gap-2 md:gap-4">
        <div className=" flex justify-end items-center mr-2 sm:mr-0">
          <img className=" w-2 sm:w-auto" src={quotes} alt="" />
          <img className="w-2 sm:w-auto" src={quotes} alt="" />
        </div>
        <div className=" flex flex-col justify-center items-start gap-1 md:gap-2 bg-[#F6F6F6] text-[#2D2E2E] font-inter text-xs sm:text-base md:px-4 border-none rounded w-[250px] h-full sm:w-[300px] sm:h-full md:w-[387px] md:h-[149px] p-1">
          <p className="">
            {item.comment.length>140 ? item.comment.slice(0,140)+"..." : item.comment}
          </p>
          <h2 className=" font-semibold">{item.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Testomonial;
