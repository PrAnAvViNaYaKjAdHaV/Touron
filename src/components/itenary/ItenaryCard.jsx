import React, { useEffect, useState } from "react";
import aboutusImg from "../../assets/images/about-us/about-us.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItenaryCard = ({ itinery }) => {
  const navigate = useNavigate();

  const [countryDetails, setCountryDetails] = useState([])

  const handleNavigation = () => {
    navigate(`/itenary/${itinery._id}`);
  }

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/itinerydetails/${itinery.country}`)
      .then(res=>{
        setCountryDetails(res.data)
      })
      .catch(err=>console.log(err))
  },[])

  return (
    <div onClick={handleNavigation} className=" flex flex-col gap-1 rounded shadow-lg bg-white cursor-pointer w-96">
      <img
        className=" w-96 h-48 object-cover rounded-md"
        src={aboutusImg}
        alt="Cycling tour around Europe"
      />
      <div className="px-3 pt-2 pb-4">
        <div className="font-bold text-stone-800 text-xl mb-1">{itinery.itineryTitle}</div>
        {/* <p className="text-gray-500 text-base font-medium">{itinery?.category}</p> */}
        <p className=" text-sm text-stone-500">{countryDetails?.overview?.length > 120 ? countryDetails?.overview.slice(0, 120)+"..." : countryDetails?.overview}</p>
        <p className="text-gray-900 mt-1.5">
          Starts From <span className=" text-gray-500 text-sm ml-1">Rs.{itinery.priceRangeStart} per person</span>
        </p>
      </div>
    </div>
  );
};

export default ItenaryCard;
