import React from "react";
import aboutusImg from "../../assets/images/about-us/about-us.png";

const AboutusInfo = () => {
  return (
    <div className="bg-white p-3 sm:px-10 md:px-4 lg:px-6 xl:px-20 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x lg:space-x-6 2xl:space-x-24">
      <div className="flex-1 lg:py-4 xl:py-24">
        <h2 className="text-lg xl:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 lg:mb-8 xl:mb-10">
          About us
        </h2>
        <h1 className=" text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-5 xl:mb-6">
          Travel your dreams today with touron
        </h1>
        <p className=" flex flex-col gap-3 text-gray-600 text-sm lg:text-base text-justify">
          <p>
            TourOn is the one-stop-shop for all your travel plans and needs. We
            work with you to manage all elements of your travel in an efficient
            and cost-effective manner. In a world filled with options, why
            should you settle for less when we give you more! TourOn's fully
            customizable travel packages give you a tour that is tailored
            exactly the way you like it. Leave all the hard work to us! We will
            make your dream vacation a reality. Based on a survey of your tastes
            and destination preferences, TourOn's algorithm provides a wide
            range of choices with the best prices. All you need to do is pick!
          </p>
          <p>
            Since its inception, with the support of avid travel enthusiasts,
            tourOn has managed to carve out a niche for itself in the
            customised-tour market in India. The numbers speak for themselves!
          </p>
        </p>
      </div>
      <div className="flex-1">
        <div className=" sm:p-4 rounded-lg">
          <img className=" sm:w-[620px]" src={aboutusImg} alt="" />
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-gray-100 p-2 lg:p-3 rounded-lg text-center">
              <span className=" text-lg sm:text-xl font-semibold">
                Aug - 2018
              </span>
              <p className="text-gray-600 text-sm">Founded</p>
            </div>
            <div className="bg-gray-100 p-2 lg:p-3 rounded-lg text-center">
              <span className="text-lg sm:text-xl font-semibold">18</span>
              <p className="text-gray-600 text-sm">Countries Certified</p>
            </div>
            <div className="bg-gray-100 p-2 lg:p-3 rounded-lg text-center">
              <span className="text-lg sm:text-xl font-semibold">765+</span>
              <p className="text-gray-600 text-sm">Successful Tours</p>
            </div>
            <div className="bg-gray-100 p-2 lg:p-3 rounded-lg text-center">
              <span className="text-lg sm:text-xl font-semibold">2571+</span>
              <p className="text-gray-600 text-sm">Happy Travellers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutusInfo;
