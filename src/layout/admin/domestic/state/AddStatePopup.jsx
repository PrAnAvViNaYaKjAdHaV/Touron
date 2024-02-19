import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddStatePopup = ({
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
        .post(`${import.meta.env.VITE_API_URL}/api/domesticstate/update/${editId}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/domesticstate/add`, formData)
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
        .get(`${import.meta.env.VITE_API_URL}/api/domesticstate/${editId}`)
        .then((response) => {
            const data = response.data;
            if (data.bestTimeToVisit && data.bestTimeToVisit.length > 0) {
              data.bestTimeToVisit = data.bestTimeToVisit[0];
            }
            setFormData(data);
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
            Domestic State Details
          </h1>
          <div className=" flex flex-col gap-3">
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
                About State
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                placeholder="About State"
                name="aboutState"
                onChange={handleChange}
                value={formData.aboutState}
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Image Url
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
                Best time to visit
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
                Best places
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
              {popupmode == "edit" ? "Save" : "Add State"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddStatePopup;
