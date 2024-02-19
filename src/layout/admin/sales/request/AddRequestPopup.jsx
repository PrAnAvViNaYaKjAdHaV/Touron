import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { parseISO, isValid, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRequestPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const userToken = sessionStorage.getItem("userToken");
  const [countryList, setCountryList] = useState([]);
  const [salesAdminList, setSalesAdminList] = useState([]);
  const [tourPlanData, setTourPlanData] = useState([]);
  const [viewDate, setViewDate] = useState({
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "destination") {
      if (formData.state !== "") {
        const country = "India";
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`, {
            params: { country },
          })
          .then((res) => {
            setTourPlanData(res.data);
            console.log(res.data);
            setFormData((prevFormData) => ({
              ...prevFormData,
              tourPlan: res.data[0]._id,
            }));
          })
          .catch((err) => {
            console.log("Error fetching tour plans:", err);
          });
      } else {
        const country = e.target.value;
        if (country) {
          console.log(country);
          axios
            .get(`${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`, {
              params: { country },
            })
            .then((res) => {
              setTourPlanData(res.data);
              console.log(res.data);
              setFormData((prevFormData) => ({
                ...prevFormData,
                tourPlan: res.data[0]?._id,
              }));
            })
            .catch((err) => {
              console.log("Error fetching tour plans:", err);
            });
        }
      }
    }
  };
  const handleChangeStartDate = (newStartDate) => {
    console.log(formData.tourPlan);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateItenary: {
        ...prevFormData.dateItenary,
        startDate: newStartDate,
      },
    }));
  };
  const handleChangeEndDate = (newEndDate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateItenary: {
        ...prevFormData.dateItenary,
        endDate: newEndDate,
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    console.log(formData);
    if (popupmode == "edit") {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/request/update`,
          formData,
          config
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/request/add`,
          formData,
          config
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(popupmode);
    if (popupmode === "view" || popupmode === "edit") {
      console.log(editId);
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/request/surveyid/${editId}`)
        .then((res) => {
          const data = res.data[0];
          console.log(res.data[0]);
          setViewDate({
            startDate: res.data[0].dateItenary.startDate,
            endDate: res.data[0].dateItenary.endDate,
          });
          const parsedStartDate = parseISO(data.dateItenary.startDate);
          const parsedEndDate = parseISO(data.dateItenary.endDate);
          data.dateItenary.startDate = isValid(parsedStartDate)
            ? parsedStartDate
            : null;
          data.dateItenary.endDate = isValid(parsedEndDate)
            ? parsedEndDate
            : null;
          setFormData(data);
          console.log(data);
          if (data.state !== "") {
            const country = "India";
            axios
              .get(`${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`, {
                params: { country },
              })
              .then((res) => {
                setTourPlanData(res.data);
                console.log(res.data);
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  tourPlan: res.data[0]._id,
                }));
              })
              .catch((err) => {
                console.log("Error fetching tour plans:", err);
              });
          } else {
            const country = formData.destination;
            if (country) {
              axios
                .get(
                  `${import.meta.env.VITE_API_URL}/api/itinery/getbycountry`,
                  {
                    params: { country },
                  }
                )
                .then((res) => {
                  setTourPlanData(res.data);
                  console.log(res.data);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    tourPlan: res.data[0]?._id,
                  }));
                })
                .catch((err) => {
                  console.log("Error fetching tour plans:", err);
                });
            }
          }

          console.log(data);
        })
        .catch((err) => console.log(err));
    } else if (popupmode === "add") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/country/`)
        .then((countriesRes) => {
          setCountryList(countriesRes.data);
          setFormData({
            ...formData,
            destination: countriesRes.data[0]?.countryName,
          });
        })
        .catch((err) => console.log(err));

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
    }
  }, [editId, popupmode]);

  // useEffect(() => {
  //   if (popupmode === "add" || popupmode === "edit") {
  //     if (formData.destination && formData.destination !== "") {
  //       console.log(
  //         "Fetching tour plans for destination:",
  //         formData.destination
  //       );
  //       const country = formData.destination;

  //     } else {
  //       console.log("Destination is empty or undefined.");
  //     }
  //   }
  // }, [formData.destination]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={onSubmit} className=" bg-white rounded-xl py-7 px-10">
          <h1 className=" font-semibold text-2xl text-stone-800">
            Request Details
          </h1>
          <div className=" grid grid-cols-2 gap-6 my-5">
            <div className=" flex flex-col gap-3">
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Survey Id
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="surveyId"
                  placeholder="Survey Id"
                  // onChange={handleChange}
                  value={formData.surveyId}
                  readOnly={true}
                  // required={popupmode == "add" ? true : false}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  username
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={formData.username}
                  readOnly={popupmode == "view" ? true : false}
                  required={popupmode == "add" ? true : false}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Mobile no
                </label>
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                  readOnly={popupmode == "view" ? true : false}
                  required={popupmode == "add" ? true : false}
                />
              </div>
              {formData.state == "" ? (
                <div className=" flex flex-col gap-1">
                  <label className=" text-sm font-medium text-stone-800">
                    Destination
                  </label>
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="destination"
                    id="destination"
                    onChange={handleChange}
                    value={formData.destination}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                    required={popupmode == "add" ? true : false}
                  >
                    {countryList?.map((item, index) => (
                      <option key={index} value={item.countryName}>
                        {item.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Travel With
                </label>
                <select
                  className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                  name="travelWith"
                  id="travelWith"
                  onChange={handleChange}
                  value={formData.travelWith}
                  defaultValue={"couple"}
                  readOnly={popupmode == "view" ? true : false}
                  disabled={popupmode == "view" ? true : false}
                  required={popupmode == "add" ? true : false}
                >
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Departure Station
                </label>
                {popupmode == "view" ? (
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="departureDate"
                    placeholder="Departure Date"
                    onChange={handleChange}
                    value={formData.departureStation}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="departureStation"
                    id="departureStation"
                    onChange={handleChange}
                    value={formData.departureStation}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                    required={popupmode == "add" ? true : false}
                  >
                    {airportList.map((item, index) => (
                      <option key={index} value={item.airport}>
                        {item.airport}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Tour Plan
                </label>
                {popupmode == "view" ? (
                  <input
                    className="border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="tourPlan"
                    placeholder="Tour Plan"
                    onChange={handleChange}
                    value={tourPlanData[0]?.itineryTitle}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="tourPlan"
                    id="tourPlan"
                    onChange={handleChange}
                    value={formData.tourPlan}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                    required={popupmode == "add" ? true : false}
                  >
                    {tourPlanData?.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.itineryTitle}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="w-fit mx-auto p-4 bg-white shadow-md rounded-md my-10">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600">
                    Start Date:
                  </label>
                  <div
                    className={`${
                      popupmode === "view" ? " hidden " : " flex "
                    }`}
                  >
                    <DatePicker
                      selected={formData.dateItenary.startDate}
                      onChange={(date) => handleChangeStartDate(date)}
                      value={formData.dateItenary.startDate}
                      selectsStart
                      startDate={formData.dateItenary.startDate}
                      endDate={formData.dateItenary.endDate}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    className={`${
                      popupmode === "view" ? " flex " : " hidden "
                    } w-full p-2 border border-gray-300 rounded-md`}
                    value={viewDate?.startDate}
                    readOnly={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    End Date:
                  </label>
                  <div
                    className={`${
                      popupmode === "view" ? " hidden " : " flex "
                    }`}
                  >
                    <DatePicker
                      selected={formData.dateItenary.endDate}
                      onChange={(date) => handleChangeEndDate(date)}
                      selectsEnd
                      startDate={formData.dateItenary.startDate}
                      endDate={formData.dateItenary.endDate}
                      minDate={formData.dateItenary.startDate}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    className={`${
                      popupmode === "view" ? " flex " : " hidden "
                    } w-full p-2 border border-gray-300 rounded-md`}
                    value={viewDate?.endDate}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Category
                </label>
                {popupmode === "view" ? (
                  <input
                    type="text"
                    className={`${
                      popupmode === "view" ? " flex " : " hidden "
                    } w-full p-2 border border-gray-300 rounded-md`}
                    value={formData.category}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={formData.category}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                    required={popupmode == "add" ? true : false}
                  >
                    <option value="BookingB2C">BookingB2C</option>
                    <option value="BookingB2B">BookingB2B</option>
                  </select>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  handled by
                </label>
                {popupmode === "view" ? (
                  <input
                    className="border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="handledBy"
                    placeholder="Handled by"
                    onChange={handleChange}
                    value={formData?.handledBy}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="handledBy"
                    id="handledBy"
                    onChange={handleChange}
                    value={formData.handledBy}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                  >
                    {salesAdminList?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className=" flex flex-col gap-1">
                <label className=" text-sm font-medium text-stone-800">
                  Status
                </label>
                {popupmode == "view" ? (
                  <input
                    className="border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="status"
                    placeholder="Status"
                    onChange={handleChange}
                    value={formData.status}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="status"
                    id="status"
                    onChange={handleChange}
                    value={formData.status}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
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
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Plan Category
                </label>
                {popupmode === "view" ? (
                  <input
                    className="border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="planCategory"
                    placeholder="Plan Category"
                    onChange={handleChange}
                    value={formData.planCategory}
                    readOnly={true}
                  />
                ) : (
                  <select
                    className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                    name="planCategory"
                    id="planCategory"
                    onChange={handleChange}
                    value={formData.planCategory}
                    readOnly={popupmode == "view" ? true : false}
                    disabled={popupmode == "view" ? true : false}
                  >
                    <option value="Trending Plan">Trending Plan</option>
                    <option value="VISA Free Plan">VISA Free Plan</option>
                    <option value="Honeymoon Plan">Honeymoon Plan</option>
                    <option value="Kid Friendly Plan">Kid Friendly Plan</option>
                    <option value="Unique & Rare Plan">
                      Unique & Rare Plan
                    </option>
                  </select>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Departure In Days
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="departureInDays"
                  placeholder="Departure In Days"
                  onChange={handleChange}
                  value={formData.departureInDays}
                  readOnly={popupmode === "view"}
                  required={popupmode === "add"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Tour Cost
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="tourCost"
                  placeholder="Tour Cost"
                  onChange={handleChange}
                  value={formData.tourCost}
                  readOnly={popupmode === "view"}
                  required={popupmode === "add"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Query From
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="queryFrom"
                  placeholder="Query From"
                  onChange={handleChange}
                  value={formData.queryFrom}
                  readOnly={popupmode === "view"}
                  required={popupmode === "add"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Travel Type
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="travelType"
                  placeholder="Travel Type"
                  onChange={handleChange}
                  value={formData.travelType}
                  readOnly={popupmode === "view"}
                  required={popupmode === "add"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  State
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  value={formData.state}
                  readOnly={popupmode === "view"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  City
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  value={formData.city}
                  readOnly={popupmode === "view"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Number of Child
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="noOfChild"
                  placeholder="Number of Child"
                  onChange={handleChange}
                  value={formData.noOfChild}
                  readOnly={popupmode === "view"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Number of Adults
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="noOfAdults"
                  placeholder="Number of Adults"
                  onChange={handleChange}
                  value={formData.noOfAdults}
                  readOnly={popupmode === "view"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-stone-800">
                  Nearest Branch
                </label>
                <input
                  className="border border-stone-500 rounded-md py-2 px-3"
                  type="text"
                  name="nearestBranch"
                  placeholder="Nearest Branch"
                  onChange={handleChange}
                  value={formData.nearestBranch}
                  readOnly={popupmode === "view"}
                  required={popupmode === "add"}
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 items-center justify-center">
            <button
              onClick={handleClose}
              className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={popupmode == "view" ? true : false}
              className=" border border-primary bg-primary rounded text-white py-2 px-3 disabled:opacity-80"
            >
              {popupmode == "edit" ? "Save" : "Add Request"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddRequestPopup;

const airportList = [
  { airport: "Port Blair, Andaman and Nicobar Islands" },
  { airport: "Visakhapatnam, Andhra Pradesh" },
  { airport: "Hyderabad, Telangana" },
  { airport: "Guwahati, Assam" },
  { airport: "New Delhi, Delhi" },
  { airport: "Dabolim (Village), Goa" },
  { airport: "Ahmedabad, Gujarat" },
  { airport: "Bengaluru, Karnataka" },
  { airport: "Mangalore, Karnataka" },
  { airport: "Kochi, Kerala" },
  { airport: "Kozhikode, Kerala" },
  { airport: "Thiruvananthapuram, Kerala" },
  { airport: "Mumbai, Maharashtra" },
  { airport: "Nagpur, Maharashtra" },
  { airport: "Imphal, Manipur" },
  { airport: "Bhubaneswar, Odisha" },
  { airport: "Amritsar, Punjab" },
  { airport: "Jaipur, Rajasthan" },
  { airport: "Chennai, Tamil Nadu" },
  { airport: "Coimbatore, Tamil Nadu" },
  { airport: "Tiruchirapalli, Tamil Nadu" },
  { airport: "Lucknow, Uttar Pradesh" },
  { airport: "Varanasi, Uttar Pradesh" },
  { airport: "Kolkata, West Bengal" },
  { airport: "Gaya, Bihar" },
  { airport: "Surat, Gujarat" },
  { airport: "Vadodara, Gujarat" },
  { airport: "Srinagar, Jammu & Kashmir" },
  { airport: "Kannur, Kerala" },
  { airport: "Pune, Maharashtra" },
  { airport: "Ranchi, Jharkhand" },
  { airport: "Siliguri, West Bengal" },
];
