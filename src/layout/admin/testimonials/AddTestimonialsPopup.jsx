import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddTestimonialsPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const handleImage = (e) => {
    const file = e.target.files[0];
    convertToBase64(file);
    console.log(file);
  };
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (popupmode == "edit") {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/testimonials/update/${editId}`,
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
          .post(`${import.meta.env.VITE_API_URL}/api/testimonials/add`, formData)
          .then((res) => {
            console.log(res.data);
            handleClose();
          })
          .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(popupmode);
    if (popupmode == "edit") {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/testimonials/${editId}`)
          .then((res) => {
            console.log(res.data);
            setFormData(res.data);
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
        <form
          onSubmit={onSubmit}
          className=" bg-white rounded-xl py-7 px-10 w-[500px]"
        >
          <h1 className=" font-semibold text-2xl text-stone-800 mb-2">
            Testimonials Details
          </h1>
          <div className=" flex flex-col gap-3">
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Name
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Comment
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="comment"
                placeholder="Comment"
                onChange={handleChange}
                value={formData.comment}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Tour place
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="tourPlace"
                placeholder="Tour place"
                onChange={handleChange}
                value={formData.tourPlace}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Field
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="field"
                placeholder="Field"
                onChange={handleChange}
                value={formData.field}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Image
              </label>
              <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                <div className="text-center">
                  {formData.image === "" || formData.image == null ? (
                    "No Image"
                  ) : (
                    <img
                      className="mx-auto h-24 w-44 object-cover"
                      src={formData.image}
                      alt="Testimonials"
                    />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/"
                        className="sr-only"
                        onChange={handleImage}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 items-center justify-center mt-5">
            <button
              onClick={handleClose}
              className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" border border-primary bg-primary rounded text-white py-2 px-3"
            >
              {popupmode == "edit" ? "Save" : "Add Testimonials"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTestimonialsPopup;
