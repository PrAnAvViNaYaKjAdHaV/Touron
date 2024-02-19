import React, { useState } from "react";

const OverviewItenary = ({ itinery, countryData }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="container mx-auto pt-10" id="overview">
      <h1 className=" font-semibold text-stone-800 text-xl mb-2">Overview</h1>
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          {countryData?.overview?.slice(0, 220)}
          {showMore && countryData?.overview?.slice(220, -1)}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 hover:text-blue-700"
        >
          {showMore ? "Show less..." : "Show more..."}
        </button>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              {/* <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Physical
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {itinery.noOfDays} Days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Beach
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Luxury
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      8
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      7+
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rome, Italy
                    </td>
                  </tr>
                </tbody>
              </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewItenary;
