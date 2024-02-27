import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import aboutusImg from "../../../assets/images/about-us/about-us.jpg";

const ItenaryOption = ({ itinery, countryData }) => {
  const itineraryDays = [
    {
      title: "Lake Nakuru National Park",
      description:
        "You can add your images, videos and itinerary route in lightbox for each itinerary as shown below, simply by changing the src path of each media.",
      images: [aboutusImg, aboutusImg, aboutusImg],
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      accommodations: [
        { type: "Shared Room", price: "Included in package" },
        { type: "Double Room", price: "Rs. 450 per person extra" },
        { type: "Single Room", price: "Rs. 800 per person extra" },
      ],
    },
    {
      title: "Hell's Gate National Park",
      description:
        "You can add your images, videos and itinerary route in lightbox for each itinerary as shown below, simply by changing the src path of each media.",
      images: [aboutusImg, aboutusImg, aboutusImg],
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      accommodations: [
        { type: "Shared Room", price: "Included in package" },
        { type: "Double Room", price: "Rs. 450 per person extra" },
        { type: "Single Room", price: "Rs. 800 per person extra" },
      ],
    },
    {
      title: "Lalibela Rock-Hewn Churches",
      description:
        "You can add your images, videos and itinerary route in lightbox for each itinerary as shown below, simply by changing the src path of each media.",
      images: [aboutusImg, aboutusImg, aboutusImg],
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      accommodations: [
        { type: "Shared Room", price: "Included in package" },
        { type: "Double Room", price: "Rs. 450 per person extra" },
        { type: "Single Room", price: "Rs. 800 per person extra" },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItenary = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2 pt-10" id="itinerary">
      <h1 className=" font-semibold text-stone-800 text-xl mb-4">
      Itineraries option
      </h1>
      {itinery?.days?.map((day, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg hover:bg-white duration-300 bg-stone-50"
        >
          <div
            className="flex justify-between items-center cursor-pointer text-stone-800"
            onClick={() => toggleItenary(index)}
          >
            <h5 className="text-lg font-semibold">Day {index + 1}</h5>
            <button>
              <span>
                <FaChevronDown
                  className={`${
                    activeIndex === index ? "rotate-180" : ""
                  } duration-700`}
                />
              </span>
            </button>
          </div>
          <div
            className={activeIndex === index ? "mt-2 text-gray-700" : "hidden"}
          >
            <div className=" p-6 rounded-lg shadow-sm">
              {day.morning && (
                <div className=" flex items-center gap-2">
                  <span className=" text-lg font-semibold text-stone-800">
                    Morning:{" "}
                  </span>
                  <span className=" mt-0.5 text-stone-600 fnt-medium">
                    {day.morning}
                  </span>
                </div>
              )}
              {day.afternoon && (
                <div className=" flex items-center gap-2">
                  <span className=" text-lg font-semibold text-stone-800">
                    Afternoon:{" "}
                  </span>
                  <span className=" mt-0.5 text-stone-600 fnt-medium">
                    {day.afternoon}
                  </span>
                </div>
              )}
              {day.evening && (
                <div className=" flex items-center gap-2">
                  <span className=" text-lg font-semibold text-stone-800">
                    Evening:{" "}
                  </span>
                  <span className=" mt-0.5 text-stone-600 fnt-medium">
                    {day.evening}
                  </span>
                </div>
              )}
              {day.night && (
                <div className=" flex items-center gap-2">
                  <span className=" text-lg font-semibold text-stone-800">
                    Night:{" "}
                  </span>
                  <span className=" mt-0.5 text-stone-600 fnt-medium">
                    {day.night}
                  </span>
                </div>
              )}
            </div>
            {/* <div className=" p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-2">{day.title}</h2>
              <p className="text-gray-700 mb-4">{day.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {day.images.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    className="rounded-lg"
                    src={src}
                    alt={`Itinerary image ${imgIndex + 1}`}
                  />
                ))}
              </div>

              <div className=" flex items-center gap-3 text-stone-800 py-6">
                <p className=" text-stone-500">Accommadation</p>
                <p>Meals</p>
                <p>Inclusion</p>
                <p>Special Info</p>
              </div>

              <div className="">
                <p className="text-gray-700">{day.details}</p>
              </div>

              <div className=" flex flex-col gap-2 py-6">
                <div className=" flex items-center gap-6">
                  <h2 className=" text-stone-500 font-medium">Shared Room</h2>
                  <p className=" text-stone-800">Included in Packaged</p>
                </div>
                <div className=" flex items-center gap-6">
                  <h2 className=" text-stone-500 font-medium">Double Room</h2>
                  <p className=" text-stone-800">Rs. 450 per person extra</p>
                </div>
                <div className=" flex items-center gap-6">
                  <h2 className=" text-stone-500 font-medium">Single Room</h2>
                  <p className=" text-stone-800">Rs. 800 per person extra</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {day.accommodations.map((acc, accIndex) => (
                  <div
                    key={accIndex}
                    className="border p-4 rounded-lg text-center"
                  >
                    <img src={aboutusImg} className=" rounded-lg mb-2" alt="" />
                    <p className="font-bold">{acc.type}</p>
                    <p className="text-gray-600">{acc.price}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItenaryOption;
