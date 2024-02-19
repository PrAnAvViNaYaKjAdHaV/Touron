import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
// import ViewCustomer from "../../../layout/admin/customer/ViewCustomer";

const AdminBookingB2C = () => {
  const [viewId, setViewId] = useState();
  const [popupmode, setPopupmode] = useState("add");
  const [formData, setFormData] = useState({
    status: "",
    handledBy: "",
    username: "",
    mobileNumber: "",
    destination: "",
    travelWith: "",
    departureStation: "",
    dateItenary: {
      startDate: "",
      endDate: "",
    },
    tourPlan: "",
    surveyId: "",
    category: "",
  });
  const [bookingb2cData, setBookingb2cData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setFormData({
      status: "",
      handledBy: "",
      username: "",
      mobileNumber: "",
      destination: "",
      travelWith: "",
      departureStation: "",
      dateItenary: {
        startDate: "",
        endDate: "",
      },
      tourPlan: "",
      surveyId: "",
      category: "",
    });
  };

  const handleView = (id) => {
    setViewId(id);
    handleClickOpen();
  };

  const handleDelete = (id) => {
    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/api/login/delete`, { id })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookingb2c/`
        );
        const fetchedData = response.data;

        for (let booking of fetchedData) {
          const tourPlanResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/itinery/${booking.tourPlan}`
          );
          booking.tourPlanName = tourPlanResponse.data.itineryTitle;
        }

        setBookingb2cData(fetchedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className=" ml-16 sm:ml-52 lg:ml-80 py-20 px-4 sm:px-10">
      <div className=" flex flex-col sm:flex-row gap-2 justify-between sm:items-center pb-20">
        <h1 className=" text-2xl sm:text-4xl font-semibold text-stone-800">
          BookingB2C
        </h1>
        {/* <ViewCustomer
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          setOpen={open}
          formData={formData}
          setFormData={setFormData}
          viewId={viewId}
        /> */}
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
              {bookingb2cData.map((row, index) => (
                <tr
                  key={row._id}
                  className="text-center border-b border-stone-200"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">{row.surveyId}</td>
                  <td className="py-3 px-5">{row.username}</td>
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
                            handleView(row._id);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>
                      {/* <span>
                        <FaEdit
                          onClick={() => {
                            setPopupmode("edit");
                            // setEditId(id);
                            handleEdit(row._id);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>{" "} */}
                      <span
                        onClick={() => handleDelete(row._id)}
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

export default AdminBookingB2C;
