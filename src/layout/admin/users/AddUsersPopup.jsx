import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddUsersPopup = ({
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
  const handleChangeAdmin = (event) => {
    setFormData({ ...formData, admin: event.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (popupmode == "edit") {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/employee/update/${editId}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/employee/add`, formData)
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
        .get(`${import.meta.env.VITE_API_URL}/api/employee/${editId}`)
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
        <form onSubmit={onSubmit} className=" bg-white rounded-xl py-7 px-10 w-[500px]">
          <h1 className=" font-semibold text-2xl text-stone-800 mb-2">
            User Details
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
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Email
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Password
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Mobile number
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="number"
                name="mobileNumber"
                onChange={handleChange}
                value={formData.mobileNumber}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Designation
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="string"
                name="designation"
                onChange={handleChange}
                value={formData.designation}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Role
              </label>
              <select
                className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                name="role"
                id="role"
                onChange={handleChange}
                value={formData.role}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Sales Admin">Sales Admin</option>
              </select>
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
              className=" border border-primary bg-primary rounded text-white py-2 px-3"
            >
              {popupmode == "edit" ? "Save" : "Add User"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddUsersPopup;
