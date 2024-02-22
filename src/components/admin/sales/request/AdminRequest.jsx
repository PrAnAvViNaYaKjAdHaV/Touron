import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import moment from "moment";
import AddRequestPopup from "../../../../layout/admin/sales/request/AddRequestPopup";

const AdminRequest = () => {
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
    travelWith: "couple",
    departureStation: "Port Blair, Andaman and Nicobar Islands",
    dateItenary: {
      startDate: "",
      endDate: "",
    },
    tourPlan: "",
    surveyId: "",
    category: "BookingB2C",
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
      travelWith: "couple",
      departureStation: "Port Blair, Andaman and Nicobar Islands",
      dateItenary: {
        startDate: "",
        endDate: "",
      },
      tourPlan: "",
      surveyId: "",
      category: "BookingB2C",
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
          `${import.meta.env.VITE_API_URL}/api/request/`
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

  const userToken = sessionStorage.getItem("userToken");

  const handleChangeStatus = (e, row) => {
    if (e.target && e.target.value !== undefined) {
      row.status = e.target.value;
      const { status, surveyId } = row;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      axios
        .post(
          `${
            import.meta.env.VITE_API_URL
          }/api/request/update-status/${surveyId}`,
          { status }, // Send only the status property
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Error: e.target or e.target.value is undefined.");
    }
  };

  const [salesAdminList, setSalesAdminList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/employee/salesadmin`)
      .then((res) => {
        console.log(res.data);
        setSalesAdminList(res.data);
        setFormData({ ...formData, handledBy: res.data[0]?.name });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeSalesAdmin = (e, row) => {
    const newHandledBy = e.target.value;
    // Update the handledBy field for the corresponding row
    const updatedRequests = requests.map((request) =>
      request.surveyId === row.surveyId
        ? { ...request, handledBy: newHandledBy }
        : request
    );
    setRequests(updatedRequests);

    // Update the formData state
    setFormData((prevState) => ({
      ...prevState,
      handledBy: newHandledBy,
    }));

    // Send the update request to the backend
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/request/update-handledBy/${
          row.surveyId
        }`,
        { handledBy: newHandledBy }, // Send only the handledBy property
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" ml-16 sm:ml-52 lg:ml-80 py-20 px-4 sm:px-10">
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
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ACTION
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
                    <select
                      className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                      name="handledBy"
                      id="handledBy"
                      onChange={(e) => handleChangeSalesAdmin(e, row)} // Pass the event object (e) and the current row
                      value={row.handledBy}
                    >
                      {salesAdminList?.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-5">
                    {/* {row.status} */}

                    <select
                      className="border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                      name="status"
                      id="status"
                      onChange={(e) => handleChangeStatus(e, row)} // Pass the event object (e) as the first argument
                      value={row.status}
                    >
                      <option value="Query Received">Query Received</option>
                      <option value="On Progress">On Progress</option>
                      <option value="Plan Shared">Plan Shared</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Duplicate Query">Duplicate Query</option>
                      <option value="Tour Booked">Tour Booked</option>
                      <option value="Awaiting Payment">Awaiting Payment</option>
                      <option value="Cancellation Requested">
                        Cancellation Requested
                      </option>
                      <option value="Estimated">Estimated</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
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

export default AdminRequest;
