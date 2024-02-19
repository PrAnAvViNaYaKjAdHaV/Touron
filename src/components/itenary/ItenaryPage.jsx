import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import aboutusImg from "../../assets/images/about-us/about-us.jpg";
import ImageSliderItenary from "./ImageSliderItenary";
import OverviewItenary from "./common/OverviewItenary";
import ItineraryOption from "./common/ItenaryOption";
import InclusionsOption from "./common/InclusionsOption";
import ReviewsOption from "./common/ReviewsOption";
import FAQOption from "./common/FAQOption";
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaGreaterThan } from "react-icons/fa";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ItenaryCard from "./ItenaryCard";
import { IoLocation } from "react-icons/io5";

const ItenaryPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [images, setImages] = useState([]);
  const [allItineries, setAllItineries] = useState([]);

  const tabs = [
    { name: "Overview", href: "#overview" },
    { name: "Itinerary", href: "#itinerary" },
    { name: "Inclusions", href: "#inclusions" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];
  const [activeTab, setActiveTab] = useState("Day 1");

  const { id } = useParams();
  const [countryIndex, setCountryIndex] = useState(0);
  const [itineryData, setItineryData] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/itinery/${id}`)
      .then((res) => {
        console.log(res.data);
        setItineryData(res.data);
        setImages([
          res.data.image1.url,
          res.data.image2.url,
          res.data.image3.url,
          res.data.image4.url,
          res.data.image5.url,
        ]);
        console.log(itineryData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Dependency on 'id' so that this runs when 'id' changes

  useEffect(() => {
    // Only make the request if 'country' is defined
    if (itineryData?.country) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/itinerydetails/${
            itineryData.country
          }`
        )
        .then((res) => {
          setCountryData(res.data);
          console.log(countryData);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/itinery/`)
      .then((res) => {
        setAllItineries(res.data);
        console.log(res.data);
        console.log(allItineries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itineryData]);

  const handleTabClick = (item, index = 0) => {
    if (itineryData.days.length > index) {
      setActiveTab(item);
      setCountryIndex(index);
      console.log(activeTab, countryIndex);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" grid lg:grid-cols-2 gap-2 items-center">
        <img
          src={images[0]}
          className=" h-full w-full rounded object-cover min-h-96"
          alt=""
        />
        <div className=" py-7 px-6 sm:px-10 md:px-12 lg:px-10 xl:p-10 xl:pr-20 space-y-2">
          <div className=" py-1 px-3 rounded-full bg-yellow-200 text-yellow-800 w-fit font-semibold text-sm">
            {itineryData.category}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {itineryData.itineryTitle}
          </h1>
          <p className=" text-xs text-stone-600">
            {countryData.review?.length + " reviews"}
          </p>
          <p className=" text-sm sm:text-base text-justify text-stone-600 mt-3">
            {countryData?.overview?.slice(0, 400) + "..."}
          </p>
          <div className=" flex justify-between items-center">
            <div className=" text-xl sm:text-3xl font-bold text-stone-800">
              Rs.{itineryData.priceRangeStart}{" "}
              <span className="text-sm font-medium text-stone-600">
                {" "}
                /per person
              </span>
            </div>
            <Link
              to={"/customize/"}
              className=" bg-primary py-1.5 px-4 text-sm sm:text-base rounded font-semibold text-white"
            >
              Start now
            </Link>
          </div>
        </div>
      </div>

      <div className=" py-10 px-4 sm:px-8 md:px-10 lg:px-10 xl:px-12 2xl:px-20">
        <h1 className=" text-3xl text-stone-700 font-bold mb-4">Itinerary</h1>
        <div className=" grid lg:grid-cols-3 gap-14">
          <div>
            <h1 className=" text-2xl font-semibold text-stone-700">
              Day {countryIndex + 1}
            </h1>

            <div className=" py-3 ml-2 space-y-3 ">
              {itineryData.days &&
                itineryData.days.length > 0 &&
                itineryData.days[countryIndex].morning && (
                  <div className="grid grid-cols-[20px_1fr] gap-2">
                    <div>
                      <IoLocation className="text-xl text-primary mt-2 -ml-2" />
                      <div className="w-1 rounded-full max-h-20 h-full bg-primary"></div>
                    </div>
                    <div className="py-1">
                      <h1 className="text-lg text-stone-700 font-semibold">
                        Morning
                      </h1>
                      <p className="text-stone-500 text-justify text-sm ml-2">
                        {itineryData.days &&
                          itineryData.days.length > 0 &&
                          itineryData.days[countryIndex ? countryIndex : 0]
                            .morning}
                      </p>
                    </div>
                  </div>
                )}

              {itineryData.days &&
                itineryData.days.length > 0 &&
                itineryData.days[countryIndex].afternoon && (
                  <div className="grid grid-cols-[20px_1fr] gap-2">
                    <div>
                      <IoLocation className="text-xl text-primary mt-2 -ml-2" />
                      <div className="w-1 rounded-full max-h-20 h-full bg-primary"></div>
                    </div>
                    <div className="py-1">
                      <h1 className="text-lg text-stone-700 font-semibold">
                        Afternoon
                      </h1>
                      <p className="text-stone-500 text-justify text-sm ml-2">
                        {itineryData.days &&
                          itineryData.days.length > 0 &&
                          itineryData.days[countryIndex ? countryIndex : 0]
                            .afternoon}
                      </p>
                    </div>
                  </div>
                )}
              {itineryData.days &&
                itineryData.days.length > 0 &&
                itineryData.days[countryIndex].evening && (
                  <div className="grid grid-cols-[20px_1fr] gap-2">
                    <div>
                      <IoLocation className="text-xl text-primary mt-2 -ml-2" />
                      <div className="w-1 rounded-full max-h-20 h-full bg-primary"></div>
                    </div>
                    <div className="py-1">
                      <h1 className="text-lg text-stone-700 font-semibold">
                        Evening
                      </h1>
                      <p className="text-stone-500 text-justify text-sm ml-2">
                        {itineryData.days &&
                          itineryData.days.length > 0 &&
                          itineryData.days[countryIndex ? countryIndex : 0]
                            .evening}
                      </p>
                    </div>
                  </div>
                )}
              {itineryData.days &&
                itineryData.days.length > 0 &&
                itineryData.days[countryIndex].night && (
                  <div className="grid grid-cols-[20px_1fr] gap-2">
                    <div>
                      <IoLocation className="text-xl text-primary mt-2 -ml-2" />
                      <div className="w-1 rounded-full max-h-20 h-full bg-primary"></div>
                    </div>
                    <div className="py-1">
                      <h1 className="text-lg text-stone-700 font-semibold">
                        Night
                      </h1>
                      <p className="text-stone-500 text-justify text-sm ml-2">
                        {itineryData.days &&
                          itineryData.days.length > 0 &&
                          itineryData.days[countryIndex ? countryIndex : 0]
                            .night}
                      </p>
                    </div>
                  </div>
                )}
            </div>
            <div
              onClick={() =>
                handleTabClick(`Day ${countryIndex + 2}`, countryIndex + 1)
              }
              className=" text-2xl font-semibold text-stone-400 mt-10 cursor-pointer"
            >
              Next Day
            </div>
          </div>
          <div className=" lg:col-span-2 space-y-4">
            <div className=" bg-stone-50 shadow-sm flex items-center justify-between sm:px-4 overflow-x-scroll" id="scroll-x">
              <div
                className={` border-t-[4px] ${
                  activeTab === "Inclusion"
                    ? " text-primary border-primary"
                    : "text-stone-800 border-white"
                } p-4 font-semibold cursor-pointer`}
                onClick={() => handleTabClick("Inclusion", 0)}
              >
                Inclusion
              </div>
              <div
                className={` border-t-[4px] ${
                  activeTab === "Review"
                    ? " text-primary border-primary"
                    : "text-stone-800 border-white"
                } p-4 font-semibold cursor-pointer`}
                onClick={() => handleTabClick("Review", 0)}
              >
                Review
              </div>
              {itineryData?.days?.map((item, index) => (
                <div
                  key={index}
                  className={` border-t-[4px] ${
                    activeTab === `Day ${index + 1}`
                      ? " text-primary border-primary"
                      : "text-stone-800 border-white"
                  } p-4 font-semibold cursor-pointer`}
                  onClick={() => handleTabClick(`Day ${index + 1}`, index)}
                >
                  Day {index + 1}
                </div>
              ))}
            </div>
            <div className=" px-6 py-4 ">
              {activeTab === "Inclusion" ? (
                <p className=" text-stone-600 font-medium">
                  {countryData?.inclusion}
                </p>
              ) : activeTab === "Review" ? (
                <div>
                  {countryData.review.map((item, index) => {
                    return <ReviewsOption itinery={item} />;
                  })}
                </div>
              ) : !isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={10}
                >
                  <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" pt-6 px-7 sm:px-10 md:px-12 lg:px-16 xl:px-20">
        <h1 className=" text-2xl text-stone-700 font-bold">Related Itinery</h1>
        <div className=" py-4 flex flex-wrap gap-6">
          {allItineries.map((itinery, index) => {
            return <ItenaryCard key={index} itinery={itinery} />;
          })}
        </div>
      </div>

      <div className=" py-10 px-4 sm:px-10 md:px-12 lg:px-16 xl:px-20 w-full max-w-[600px] flex flex-col items-center justify-center">
        {countryData.faq?.map((item, index) => (
          <Accordion className=" w-full">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* <div className=" py-7 px-3 sm:px-8">
        <ImageSliderItenary images={images} />
        <div className=" grid lg:grid-cols-3 gap-8 lg:gap-1 pt-14">
          <div className=" lg:col-span-2">
            <div className="container mx-auto px-4 py-6">
              <div className=" text-stone-700 font-medium pb-4 flex items-center gap-3">
                <Link
                  to="/"
                  className=" hover:underline hover:text-stone-500 duration-300"
                >
                  Home
                </Link>
                <FaGreaterThan />
                <Link
                  to="/itenary"
                  className=" hover:underline hover:text-stone-500 duration-300"
                >
                  Itenary
                </Link>
                <FaGreaterThan />
                <p className=" hover:underline hover:text-stone-500 duration-300">
                  {itineryData.itineryTitle}
                </p>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {itineryData.itineryTitle}
              </h1>
              <p className="text-gray-600 mt-2">
                {countryData?.review?.length} Reviews
              </p>
            </div>
            <div className=" py-4" id="scroll-itinery">
              <ul className="flex cursor-pointer py-3">
                {tabs.map((tab) => (
                  <li
                    key={tab.name}
                    className={`mr-1 ${
                      activeTab === tab.name ? "border-b-2 border-teal-500" : ""
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    <a
                      href={tab.href}
                      className={`inline-block py-4 px-1 sm:px-4 text-sm sm:text-base ${
                        activeTab === tab.name
                          ? "text-teal-600 font-semibold"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
              <OverviewItenary
                itinery={itineryData}
                countryData={countryData}
              />
              <ItineraryOption
                itinery={itineryData}
                countryData={countryData}
              />
              <InclusionsOption
                itinery={itineryData}
                countryData={countryData}
              />
              <div className=" flex flex-col gap-2 pt-10" id="reviews">
                <h1 className=" font-semibold text-stone-800 text-xl mb-2">
                  Reviews
                </h1>
                {countryData?.review?.map((item, index) => {
                  return <ReviewsOption itinery={item} />;
                })}
              </div>
              <FAQOption itinery={itineryData} countryData={countryData} />
            </div>
          </div>

          <div className="max-w-sm lg:mx-auto bg-white shadow-md p-4 rounded-lg h-fit w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-gray-500">Price Starts</div>
                <div className="text-4xl font-bold">
                  Rs.{itineryData.priceRangeStart}{" "}
                  <span className="text-base font-normal">inc. taxes</span>
                </div>
                <div className="text-xs text-gray-400">
                  *Price based on selections bellow.
                </div>
              </div>
              <div className="bg-green-500 rounded-full p-2 text-white">
                <MdDone className=" text-3xl font-bold" />
              </div>
            </div>
            <Link
              to={"/customize/"}
              className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Start now
            </Link>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default ItenaryPage;
