import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const ViewCustomer = ({ open, handleClose, formData, setFormData, viewId }) => {
  useEffect(() => {
    if (viewId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/login/${viewId}`)
        .then((res) => {
          console.log(res.data);
          setFormData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className=" bg-white rounded-xl py-7 px-10">
          <h1 className=" font-semibold text-2xl text-stone-800">
            Customer Details
          </h1>
          <div className=" flex flex-col gap-2 mt-2 mb-5">
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Username
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="username"
                value={formData.username}
                readOnly={true}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                email
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="email"
                name="email"
                value={formData.email}
                readOnly={true}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                mobile number
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                readOnly={true}
                required
              />
            </div>
          </div>

          <button
            onClick={handleClose}
            className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3 w-full"
          >
            Cancel
          </button>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default ViewCustomer;
