import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import moment from "moment";
import AddRequestPopup from "../../../../layout/admin/sales/request/AddRequestPopup";

const SalesQuery = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [pendingAssign, setPendingAssign] = useState(0);
  const [popupmode, setPopupmode] = useState("add");
  const [editId, setEditId] = useState();
  const [tourPlan, setTourPlan] = useState("");
  const [formData, setFormData] = useState({
    status: "Query Received",
    handledBy: "",
    username: "",
    mobileNumber: "",
    destination: "Australia",
    travelWith: "",
    departureStation: "",
    dateItenary: {
      startDate: "",
      endDate: "",
    },
    tourPlan: "",
    surveyId: "",
    category: "",
    planCategory: "Trending Plan",
    departureInDays: "",
    tourCost: "",
    queryFrom: "",
    travelType: "",
    state: "",
    city: "",
    noOfChild: "",
    noOfAdults: "",
    nearestBranch: "",
  });
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPopupmode("add");
    setOpen(false);
    setFormData({
      status: "Query Received",
      handledBy: "",
      username: "",
      mobileNumber: "",
      destination: "Australia",
      travelWith: "",
      departureStation: "",
      dateItenary: {
        startDate: "",
        endDate: "",
      },
      tourPlan: "",
      surveyId: "",
      category: "",
      planCategory: "Trending Plan",
      departureInDays: "",
      tourCost: "",
      queryFrom: "",
      travelType: "",
      state: "",
      city: "",
      noOfChild: "",
      noOfAdults: "",
      nearestBranch: "",
    });
  };

  const handleAdd = () => {
    setPopupmode("add");
    handleClickOpen();
  };

  const handleView = (surveyId) => {
    setEditId(surveyId);
    setPopupmode("view");
    handleClickOpen();
  };

  const handleEdit = (surveyId) => {
    setEditId(surveyId);
    setPopupmode("edit");
    handleClickOpen();
  };

  const handleDelete = (surveyId) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/request/delete`, { surveyId })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/request/mobile`,
          {
            params: {
              mobileNumber: user.mobileNumber,
            },
          }
        );
        const fetchedRequests = response.data;
        console.log(fetchedRequests);

        for (let request of fetchedRequests) {
          await axios
            .get(
              `${import.meta.env.VITE_API_URL}/api/itinery/${request.tourPlan}`
            )
            .then((res) => {
              request.tourPlanName = res.data.itineryTitle;
            })
            .catch((err) => {
              console.log(err);
            });
        }

        const pendingAssign = fetchedRequests.filter(
          (request) => request.status === "Query Received"
        ).length;
        setPendingAssign(pendingAssign);

        setRequests(fetchedRequests);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className=" py-20 px-4 sm:px-10">
      <div className=" flex flex-col sm:flex-row gap-2 justify-between sm:items-center pb-20">
        <h1 className=" text-2xl sm:text-4xl font-semibold text-stone-800">
          Requests ({pendingAssign})
        </h1>
        <button
          onClick={handleAdd}
          className=" bg-primary py-1.5 px-2 sm:px-4 font-medium text-white rounded w-fit"
        >
          Add Request
        </button>
        <AddRequestPopup
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          setOpen={open}
          formData={formData}
          setFormData={setFormData}
          popupmode={popupmode}
          editId={editId}
        />
      </div>
      <div className=" flex items-center justify-center gap-3 flex-wrap">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-xl rounded-2xl">
            <thead className=" border-b bg-stone-50 border-b-stone-300 text-stone-800 ">
              <tr className=" py-2">
                <th className="py-3 px-4 uppercase font-semibold text-sm">
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
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requests.map((row, index) => (
                <tr key={row._id} className="text-left">
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
                  <td className="py-3 px-5">
                    <div className=" flex items-center gap-3 text-xl">
                      <span>
                        <IoMdEye
                          onClick={() => {
                            setPopupmode("view");
                            // setEditId(id);
                            handleView(row.surveyId);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>
                      <span>
                        <FaEdit
                          onClick={() => {
                            setPopupmode("edit");
                            // setEditId(id);
                            handleEdit(row.surveyId);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>{" "}
                      <span
                        onClick={() => handleDelete(row.surveyId)}
                        className=" cursor-pointer"
                      >
                        <MdDelete />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesQuery;
