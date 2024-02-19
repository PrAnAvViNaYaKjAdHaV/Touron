import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DestinationCard from "./common/DestinationCard";

const DestinationContainer = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const countriesPerPage = 15;

  const handleClickAll = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/country/`)
      .then((res) => {
        console.log(res.data);
        setAllCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleClickAll();
  }, []);

  // Filter countries based on search query
  const filteredCountries = allCountries.filter(
    (destination) =>
      destination.countryName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (destination.stateName &&
        destination.stateName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate index of the first country for the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  return (
    <>
      <div className=" bg-white py-5 px-7">
        <div className=" py-4 px-4 sm:px-10 md:px-20 lg:px-12 xl:px-16 2xl:px-28  flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <h1 className=" font-bold text-stone-700 text-3xl sm:text-3xl md:text-4xl">
            Destinations
          </h1>
          <div className=" grid grid-cols-[1fr_50px] gap-2">
            <input
              type="text"
              className=" border border-stone-400 rounded-md py-1 sm:py-2 pl-3 pr-6 focus:outline-none text-stone-700"
              placeholder="Search a Country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className=" flex items-center justify-center bg-primary py-1 sm:py-1.5 px-3 rounded-md">
              <FaSearch className=" text-white text-xl" />
            </div>
          </div>
        </div>

        <div className=" py-10 flex justify-center flex-wrap gap-8">
          {currentCountries.map((destination) => {
            return (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            );
          })}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {currentCountries.length > 0 && (
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
    </>
  );
};

export default DestinationContainer;
