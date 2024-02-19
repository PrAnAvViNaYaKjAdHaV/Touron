import React, { useEffect, useState } from "react";
import ItenaryCard from "./ItenaryCard";
import axios from "axios";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const ItenaryContainer = () => {
  const [currentOption, setCurrentOption] = useState("");
  const [allItineries, setAllItineries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itineriesPerPage = 18;

  const handleClickAll = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/itinery/`)
      .then((res) => {
        console.log(res.data);
        setAllItineries(res.data);
        setCurrentOption("all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleClickAll();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const name = e.target.innerText;
    setCurrentOption(name);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/itinery/getbyname?name=${encodeURIComponent(name)}`
      )
      .then((res) => {
        console.log(res.data);
        setAllItineries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Calculate index of the first itinerary for the current page
  const indexOfLastItinerary = currentPage * itineriesPerPage;
  const indexOfFirstItinerary = indexOfLastItinerary - itineriesPerPage;
  const currentItineries = allItineries.slice(
    indexOfFirstItinerary,
    indexOfLastItinerary
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allItineries.length / itineriesPerPage);

  return (
    <>
      <Navbar />
      <div className=" bg-white py-5 px-7">
        <div className=" border border-stone-300 rounded-md px-8 py-5 flex justify-between items-center mb-4">
          <h1 className=" font-semibold text-stone-800 text-2xl">Itineries</h1>
        </div>

        {/* Filter buttons */}
        <div className=" hidden md:grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_50px] gap-2 xl:gap-8 justify-around font-medium mb-4">
          <button className=" py-2 px-4 border border-stone-500 bg-stone-400 rounded-full text-white hover:bg-white hover:text-stone-500 duration-300">
            <span className=" lg:text-sm xl:text-xl">{"<"}</span>
          </button>
          <button
            onClick={handleClickAll}
            className={` ${
              currentOption === "all" && " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm mr-2 hover:bg-gray-500 hover:text-white duration-300`}
          >
            All
          </button>
          <button
            onClick={handleClick}
            className={` ${
              currentOption === "Trending plan" && " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm mr-2 hover:bg-gray-500 hover:text-white duration-300`}
          >
            Trending plan
          </button>
          <button
            onClick={handleClick}
            className={` ${
              currentOption === "VISA Free Plan" && " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm mr-2 hover:bg-gray-500 hover:text-white duration-300`}
          >
            VISA Free Plan
          </button>
          <button
            onClick={handleClick}
            className={` ${
              currentOption === "Honeymoon Plan" && " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm mr-2 hover:bg-gray-500 hover:text-white duration-300`}
          >
            Honeymoon Plan
          </button>
          <button
            onClick={handleClick}
            className={` ${
              currentOption === "Kid Friendly Plan" && " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm mr-2 hover:bg-gray-500 hover:text-white duration-300`}
          >
            Kid Friendly Plan
          </button>
          <button
            onClick={handleClick}
            className={` ${
              currentOption === "Unique & Rare Plan" &&
              " bg-gray-500 text-white"
            } border border-gray-300 rounded-xl px-6 py-3 text-sm hover:bg-gray-500 hover:text-white duration-300`}
          >
            Unique & Rare Plan
          </button>
          {/* Navigation arrows */}

          <button className=" py-2 px-4 border border-stone-500 bg-stone-400 rounded-full text-white hover:bg-white hover:text-stone-500 duration-300">
            <span className=" text-xl">{">"}</span>
          </button>
        </div>
        <div className=" py-10 flex justify-center flex-wrap gap-6">
          {allItineries.map((itinery) => {
            return <ItenaryCard key={itinery._id} itinery={itinery} />;
          })}
        </div>
        <div className="flex justify-center mt-4">
          {currentItineries.length > 0 && (
            <>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 text-gray-600 rounded mr-2"
              >
                Previous
              </button>
              {/* Display page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 bg-gray-200 text-gray-600 rounded mr-2 ${
                      pageNumber === currentPage ? "bg-gray-400" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 text-gray-600 rounded"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItenaryContainer;
