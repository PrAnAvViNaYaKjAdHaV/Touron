import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddInternationalCityPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (popupmode == "edit") {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/internationalcity/update/${editId}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/internationalcity/add`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (popupmode === "edit" || popupmode === "view") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/internationalcity/${editId}`)
        .then((response) => {
            setFormData(response.data);
          })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [popupmode]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={onSubmit} className=" bg-white rounded-xl py-7 px-10">
          <h1 className=" font-semibold text-2xl text-stone-800 mb-2">
            International City Details
          </h1>
          <div className=" flex flex-col gap-3">
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Country name
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Country name"
                name="countryName"
                onChange={handleChange}
                value={formData.countryName}
                readOnly={true }
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              City name
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="City name"
                name="cityName"
                onChange={handleChange}
                value={formData.cityName}
                readOnly={popupmode == "view" ? true : false}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                About city
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="About city"
                name="aboutCity"
                onChange={handleChange}
                value={formData.aboutCity}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Image url
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Image url"
                name="imageUrl"
                onChange={handleChange}
                value={formData.imageUrl}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Weather
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Weather"
                name="weather"
                onChange={handleChange}
                value={formData.weather}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Latitude
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Latitude"
                name="latitude"
                onChange={handleChange}
                value={formData.latitude}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Longitude
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Longitude"
                name="longitude"
                onChange={handleChange}
                value={formData.longitude}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Travel duration
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="travel duration"
                name="travelDuration"
                onChange={handleChange}
                value={formData.travelDuration}
                readOnly={popupmode == "view" ? true : false}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Ideal days
              </label>
              <select
                className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                name="idealDays"
                id="idealDays"
                onChange={handleChange}
                value={formData.idealDays}
                readOnly={popupmode == "view" ? true : false}
                disabled={popupmode == "view" ? true : false}
                required={popupmode == "add" ? true : false}
              >
                <option value="3-4 days">3-4 days</option>
                <option value="4-5 days">4-5 days</option>
                <option value="5-6 days">5-6 days</option>
                <option value="6-7 days">6-7 days</option>
                <option value="7-8 days">7-8 days</option>
                <option value="8-10 days">8-10 days</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Famous Place to visit
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Famous Place to visit"
                name="famousPlacesToVisit"
                onChange={handleChange}
                value={formData.famousPlacesToVisit}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Airport type
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Airport type"
                name="airportType"
                onChange={handleChange}
                value={formData.airportType}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Airport name
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Airport name"
                name="airportName"
                onChange={handleChange}
                value={formData.airportName}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Food joints
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Food Joints"
                name="foodJoints"
                onChange={handleChange}
                value={formData.foodJoints}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Things To Pack
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Things to pack"
                name="thingsToPack"
                onChange={handleChange}
                value={formData.thingsToPack}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Tips
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Tips"
                name="tips"
                onChange={handleChange}
                value={formData.tips}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              Documents required
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Documents required"
                name="documentsRequired"
                onChange={handleChange}
                value={formData.documentsRequired}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 items-center justify-center mt-4">
            <button
              onClick={handleClose}
              className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={popupmode == "view" ? true : false}
              className=" border border-primary bg-primary rounded text-white py-2 px-3"
            >
              {popupmode == "edit" ? "Save" : "Add City"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddInternationalCityPopup;
