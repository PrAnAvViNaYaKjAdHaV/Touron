import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddInternationalCountryPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const handleChange = (e) => {
    console.log("Selected Value:", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (popupmode == "edit") {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/country/update/${editId}`,
          formData
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
        .post(`${import.meta.env.VITE_API_URL}/api/country/add`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (popupmode === "edit" || popupmode === "view") {
      if (editId) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/country/${editId}`)
          .then((response) => {
            setFormData(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
            International Country Details
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
                readOnly={popupmode == "view" ? true : false}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                About Country
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="About Country"
                name="aboutCountry"
                onChange={handleChange}
                value={formData.aboutCountry}
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
                Currency in words
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Currency"
                name="currency"
                onChange={handleChange}
                value={formData.currency}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Time Zone
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Time Zone"
                name="timeZone"
                onChange={handleChange}
                value={formData.timeZone}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Best Time to Visit
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Best time to visit"
                name="bestTimeToVisit"
                onChange={handleChange}
                value={formData.bestTimeToVisit}
                readOnly={popupmode == "view" ? true : false}
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
                On Arrival
              </label>
              <select
                className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                name="onArrival"
                id="onArrival"
                onChange={handleChange}
                value={formData.onArrival}
                readOnly={popupmode == "view" ? true : false}
                disabled={popupmode == "view" ? true : false}
                required={popupmode == "add" ? true : false}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Cost
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Cost"
                name="cost"
                onChange={handleChange}
                value={formData.cost}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Best Places
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Best Places"
                name="bestPlaces"
                onChange={handleChange}
                value={formData.bestPlaces}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Country flag image url
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="Country flag image url"
                name="countryFlagImage"
                onChange={handleChange}
                value={formData.countryFlagImage}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Category
              </label>
              {popupmode === "view" ? (
                <input
                  className={`  border border-stone-500 rounded-md py-2 px-3`}
                  type="text"
                  placeholder="Category"
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  readOnly={popupmode == "view" ? true : false}
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
                  <option value="Trending Plan">Trending Plan</option>
                  <option value="VISA Free Plan">VISA Free Plan</option>
                  <option value="Honeymoon Plan">Honeymoon Plan</option>
                  <option value="Kid Friendly Plan">Kid Friendly Plan</option>
                  <option value="Unique & Rare Plan">Unique & Rare Plan</option>
                  <option value="Our top picks">Our top picks</option>
                  <option value="Adventure Destinations">
                    Adventure Destinations
                  </option>
                  <option value="Nature & Wildlife Destinations">
                    Nature & Wildlife Destinations
                  </option>
                  <option value="Romantic Destination">
                    Romantic Destination
                  </option>
                  <option value="Family-Friendly Destinations">
                    Family-Friendly Destinations
                  </option>
                </select>
              )}
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
              {popupmode == "edit" ? "Save" : "Add Country"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddInternationalCountryPopup;
