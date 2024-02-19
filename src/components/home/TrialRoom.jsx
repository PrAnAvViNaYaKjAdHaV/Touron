import React from "react";
import trailRoomImg from "../../assets/images/home/trial-room.png";

const TrialRoom = () => {
  return (
    <div className=" relative my-7 mx-8 sm:mx-12 md:mx-8 lg:mx-16">
      <img className=" w-full min-h-[150px]" src={trailRoomImg} alt="" />
      <div className=" flex flex-col justify-center absolute left-[5%] md:left-12 top-[10%] bottom-[10%] md:top-[30%] md:bottom-[30%] font-noto-sans text-white">
        <div>
          <h1 className=" font-medium text-2xl md:text-4xl mb-2 md:mb-4">Explore our Trail Room</h1>
          <button className=" font-semibold bg-primary border border-primary rounded-md py-2 md:py-3 px-5 hover:opacity-80 duration-300">
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialRoom;
