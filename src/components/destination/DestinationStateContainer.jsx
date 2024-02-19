import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DestinationCard from "./common/DestinationCard";

const DestinationStateContainer = () => {
  const [allState, setAllState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 15;

  useEffect(() => {
    fetchAllStates();
  }, []);

  const fetchAllStates = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/domesticstate/`)
      .then((res) => {
        setAllState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Filter states based on search query
  const filteredStates = allState.filter((state) =>
    state.stateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate index of the first state for the current page
  const indexOfLastState = currentPage * countriesPerPage;
  const indexOfFirstState = indexOfLastState - countriesPerPage;
  const currentStates = filteredStates.slice(
    indexOfFirstState,
    indexOfLastState
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredStates.length / countriesPerPage);

  return (
    <>
      <div className="bg-white py-5 px-7">
        <div className="py-4 flex items-center justify-between px-20">
          <h1 className="font-bold text-stone-700 text-4xl">States</h1>
          <div className="grid grid-cols-[1fr_50px] gap-2">
            <input
              type="text"
              className="border border-stone-400 rounded-md py-2 pl-3 pr-6 focus:outline-none text-stone-700"
              placeholder="Search a State"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center justify-center bg-primary py-1.5 px-3 rounded-md">
              <FaSearch className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="py-10 flex justify-center flex-wrap gap-8">
          {currentStates.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {currentStates.length > 0 && (
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

export default DestinationStateContainer;
