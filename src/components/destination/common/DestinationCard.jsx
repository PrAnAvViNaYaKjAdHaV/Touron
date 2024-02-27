import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const [countryDetails, setCountryDetails] = useState([]);

  const handleNavigation = () => {
    if (destination.stateName) {
      navigate(`/state/frame/${destination.stateName}`);
    } else {
      if (destination.countryName === "India") {
        navigate(`/destination/states`);
      } else {
        navigate(`/country/frame/${destination.countryName}`);
      }
    }
    // navigate(`/country/${destination._id}`);
  };

  //   useEffect(() => {
  //     if (destination.countryName) {
  //         console.log(destination.countryName);
  //       axios
  //         .get(`${import.meta.env.VITE_API_URL}/api/country/getbyname`, {
  //           countryName: destination.countryName,
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //           setCountryDetails(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, []);

  return (
    <div className=" flex flex-col gap-1 rounded shadow-lg bg-white cursor-pointer w-96">
      <img
        className=" w-96 h-56 object-cover rounded-md"
        src={destination.imageUrl}
        alt={destination.countryName || destination.stateName}
      />
      <div className=" grid grid-rows-[30px_25px_90px_50px] px-3 pt-2 pb-7">
        <div className="font-bold text-stone-900 text-2xl">
          {destination.countryName || destination.stateName}
        </div>
        <p className="text-primary text-sm mt-2 font-semibold">
          {destination?.idealDays || destination?.bestTimeToVisit[0]}
        </p>
        <p className=" text-sm mt-1 text-stone-600">
          {destination?.aboutCountry?.length > 180
            ? destination?.aboutCountry?.slice(0, 180) + "..."
            : destination?.aboutCountry || destination?.aboutState?.length > 180
            ? destination?.aboutState?.slice(0, 180) + "..."
            : destination?.aboutState}
        </p>
        <button
          onClick={handleNavigation}
          className="mt-2 py-1.5 px-4 font-semibold w-40 text-black border border-black rounded"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
