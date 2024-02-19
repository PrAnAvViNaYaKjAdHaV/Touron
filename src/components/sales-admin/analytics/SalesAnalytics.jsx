import React, { useEffect, useState } from "react";
import PieChartCard from "../../admin/common/PieChartCard";
import { StatisticsCard } from "../../admin/common/StatisticsCard";
import axios from "axios";

const SalesAnalytics = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    upcomingCount: 0,
    currentCount: 0,
    cancelledCount: 0,
    completedCount: 0,
  });
  useEffect(() => {
    const mobileNumber = user.mobileNumber;
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/request/upcomingtrips/mobile/mobile`,
        {
          params: {
            mobileNumber: mobileNumber,
          },
        }
      )
      .then((res) => {
        console.log(res.data.count);
        setStats({ ...stats, upcomingCount: res.data.count });
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/request/currenttrips/mobile`, {
        params: {
          mobileNumber: mobileNumber,
        },
      })
      .then((res) => {
        console.log(res.data.count);
        setStats({ ...stats, currentCount: res.data.count });
      });

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/request/cancelledtrips/mobile`,
        {
          params: {
            mobileNumber: mobileNumber,
          },
        }
      )
      .then((res) => {
        console.log(res.data.count);
        setStats({ ...stats, cancelledCount: res.data.count });
      });

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/request/completedtrips/mobile`,
        {
          params: {
            mobileNumber: mobileNumber,
          },
        }
      )
      .then((res) => {
        console.log(res.data.count);
        setStats({ ...stats, completedCount: res.data.count });
      });

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/request/mobile`,
          {
            params: {
              mobileNumber: mobileNumber,
            },
          }
        );
        const fetchedRequests = response.data;
        console.log(fetchedRequests);

        for (let request of fetchedRequests) {
          const tourPlanResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/itinery/${request.tourPlan}`
          );
          request.tourPlanName = tourPlanResponse.data.itineryTitle;
        }

        setRequests(fetchedRequests);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);
  return (
    <div className="py-10 px-4 sm:px-6 md:px-7 lg:px-4 xl:px-5 2xl:px-9 min-h-screen">
      <div className=" flex gap-5 justify-center">
        <div className=" flex flex-col gap-5 min-w-80">
          <div className="flex gap-6 bg-white rounded-xl shadow-md py-5 px-8 min-w-[300px] h-fit">
            <StatisticsCard
              title={"Upcoming trips in 7 days"}
              count={stats.upcomingCount}
            />
          </div>
          <div className="flex gap-6 bg-white rounded-xl shadow-md py-5 px-8 min-w-[300px] h-fit">
            <StatisticsCard
              title={"Current progress trips "}
              count={stats.currentCount}
            />
          </div>
          <div className="flex gap-6 bg-white rounded-xl shadow-md py-5 px-8 min-w-[300px] h-fit">
            <StatisticsCard
              title={"Cancelled trips "}
              count={stats.cancelledCount}
            />
          </div>
          <div className="flex gap-6 bg-white rounded-xl shadow-md py-5 px-8 min-w-[300px] h-fit">
            <StatisticsCard
              title={"Completed trips "}
              count={stats.completedCount}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-x-12 gap-y-9 flex-wrap">
          <PieChartCard
            type={"Upcoming trips in 7 days"}
            cancelledCount={stats.upcomingCount}
          />
          <PieChartCard
            type={"Current progress trips "}
            cancelledCount={stats.currentCount}
          />
          <PieChartCard
            type={"Cancelled Count"}
            cancelledCount={stats.cancelledCount}
          />
          <PieChartCard
            type={"Completed trips "}
            cancelledCount={stats.completedCount}
          />
        </div>
      </div>

      <div className=" pt-10">
        <table className="min-w-full bg-white shadow-xl rounded-2xl">
          <thead className=" border-b bg-stone-50 border-b-stone-300 text-stone-800 ">
            <tr className=" py-2">
              <th className="py-5 px-4 uppercase font-semibold text-sm">
                SL.NO
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                Survey Id
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                username
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                mobileNumber
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                destination
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                tour plan
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                handled by
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">
                status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {requests.map((row, index) => (
              <tr
                key={row._id}
                className="text-center border-b border-stone-200"
              >
                <td className="py-3 px-5">{index + 1}</td>
                <td className="py-3 px-5">{row.surveyId}</td>
                <td className="py-3 px-5">{row.username}</td>
                <td className="py-3 px-5">{row.mobileNumber}</td>
                <td className="py-3 px-5">{row.destination}</td>
                <td className="py-3 px-5">{row.tourPlanName}</td>
                <td className="py-3 px-5">
                  {row.handledBy ? row.handledBy : "Not Assigned"}
                </td>
                <td className="py-3 px-5">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesAnalytics;
