import React, { useEffect, useState } from "react";
import soloImg from "../../assets/images/customize/solo.jpg";
import coupleImg from "../../assets/images/customize/couple.jpg";
import familyImg from "../../assets/images/customize/family.jpg";
import friendsImg from "../../assets/images/customize/friends.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTravelWith } from "../../redux/features/customize/customizeSlice";

const TravelWith = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected !== "") {
      console.log(selected);
      dispatch(setTravelWith(selected));
      navigate("/customize/departure-station");
    }
  }, [selected]);

  return (
    <>
      <div className=" lg:ml-[20%] mt-32 flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-12">
          <h1 className=" text-center text-3xl font-roboto font-semibold text-stone-800">
            Who is travelling with you?
          </h1>
          <div className=" grid grid-cols-3 justify-center gap-4 sm:gap-7 md:gap-10">
            {/* <div
              onClick={() => setSelected("solo")}
              className={`${
                selected === "solo" && "scale-110"
              } duration-300 relative flex flex-col items-center justify-center gap-3 cursor-pointer`}
            >
              <img
                className=" max-[500px]:w-32 sm:w-44 w-52 rounded-2xl"
                src={soloImg}
                alt=""
              />
              <h1 className=" font-reem-kufi-fun text-xl font-medium text-stone-700">
                SOLO
              </h1>
              {selected === "solo" && (
                <div className=" absolute -top-4 -right-4">
                  <FaCheckCircle className=" text-5xl text-primary" />
                </div>
              )}
            </div> */}
            <div
              onClick={() => setSelected("couple")}
              className={`${
                selected === "couple" && "scale-110"
              } duration-300 relative flex flex-col items-center justify-center gap-3 cursor-pointer`}
            >
              <img
                className=" max-[500px]:w-32 sm:w-44 w-52 rounded-2xl h-full"
                src={coupleImg}
                alt=""
              />
              <h1 className=" font-reem-kufi-fun text-xl font-medium text-stone-700">
                COUPLE
              </h1>
              {selected === "couple" && (
                <div className=" absolute -top-4 -right-4">
                  <FaCheckCircle className=" text-5xl text-primary" />
                </div>
              )}
            </div>
            <div
              onClick={() => setSelected("family")}
              className={`${
                selected === "family" && "scale-110"
              } duration-300 relative flex flex-col items-center justify-center gap-3 cursor-pointer`}
            >
              <img
                className=" max-[500px]:w-32 sm:w-44 w-52 rounded-2xl"
                src={familyImg}
                alt=""
              />
              <h1 className=" font-reem-kufi-fun text-xl font-medium text-stone-700">
                FAMILY
              </h1>
              {selected === "family" && (
                <div className=" absolute -top-4 -right-4">
                  <FaCheckCircle className=" text-5xl text-primary" />
                </div>
              )}
            </div>
            <div
              onClick={() => setSelected("friends")}
              className={`${
                selected === "friends" && "scale-110"
              } duration-300 relative flex flex-col items-center justify-center gap-3 cursor-pointer`}
            >
              <img
                className=" max-[500px]:w-32 sm:w-44 w-52 rounded-2xl"
                src={friendsImg}
                alt=""
              />
              <h1 className=" font-reem-kufi-fun text-xl font-medium text-stone-700">
                FRIENDS
              </h1>
              {selected === "friends" && (
                <div className=" absolute -top-4 -right-4">
                  <FaCheckCircle className=" text-5xl text-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full flex items-end justify-end pr-[10%] mt-32">
        <button
          onClick={() => navigate("/customize/")}
          className=" lg:hidden border border-primary hover:bg-white hover:text-primary duration-300 bg-primary py-2 px-4 rounded-md font-medium text-stone-50"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default TravelWith;
