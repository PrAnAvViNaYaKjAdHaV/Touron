import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddDomesticCityPopup = ({
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
        .post(`${import.meta.env.VITE_API_URL}/api/domesticCity/update/${editId}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/domesticCity/add`, formData)
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
        .get(`${import.meta.env.VITE_API_URL}/api/domesticCity/${editId}`)
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
            Domestic City Details
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
              Suggested Combinations
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Suggested Combinations"
                name="suggestedCombinations"
                onChange={handleChange}
                value={formData.suggestedCombinations}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
              State name
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="State name"
                name="stateName"
                onChange={handleChange}
                value={formData.stateName}
                readOnly={popupmode == "view" ? true : false}
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
                Ideal Days
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Ideal days"
                name="idealDays"
                onChange={handleChange}
                value={formData.idealDays}
                readOnly={popupmode == "view" ? true : false}
                required
              />
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

export default AddDomesticCityPopup;
