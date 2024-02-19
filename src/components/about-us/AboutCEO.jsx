import React from "react";
import ceoImg from "../../assets/images/about-us/ceo.jpg";

const AboutCEO = () => {
  return (
    <div className=" bg-stone-50 py-14 px-5 sm:px-12 md:px-16 lg:px-24 xl:px-44 2xl:px-52 grid md:grid-cols-5 items-center gap-5 sm:gap-10 lg:gap-24">
      <div className=" md:col-span-2 flex items-center justify-center md:justify-start">
        <img
          src={ceoImg}
          alt="Vikash Manoharan"
          className=" w-80 h-[400px] object-cover rounded-lg"
        />
      </div>
      <div className=" md:col-span-3 flex flex-col items-center justify-center">
        <div>
          <h1 className="text-5xl text-stone-800 font-bold">
            Mr. Vikash Manoharan
          </h1>
          <p className=" text-stone-500 mt-2 md:mt-3 mb-4 md:mb-7 text-xl">CEO, Founder</p>
          <p className="text-base text-justify text-stone-600">
            Founded in August of 2018, TourOn has since planned and lead more
            than 200 dream tours. Vikash Manoharan, Founder of TourOn, is a
            travel enthusiast and found TourOn to help others realize their
            wanderlust goals. Vikash used to work in the IT industry until one
            day he realized, a life confined to a desk is not one for him.
            TourOn took wings out of his passion for travel and has grown
            through his ideas as an experienced traveler.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCEO;
