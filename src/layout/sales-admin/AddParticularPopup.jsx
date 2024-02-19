import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddParticularPopup = ({
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
          .post(`${import.meta.env.VITE_API_URL}/api/particular/updateparticular/${editId}`, formData)
          .then((res) => {
            console.log(res.data);
            handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
        axios
          .post(`${import.meta.env.VITE_API_URL}/api/particular/addparticular`, formData)
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
          .get(`${import.meta.env.VITE_API_URL}/api/particular/${editId}`)
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
        <form onSubmit={onSubmit} className=" bg-white rounded-xl py-7 px-10">
          <h1 className=" font-semibold text-2xl text-stone-800 mb-2">
            Particular Details
          </h1>
          <div className=" flex flex-col gap-1">
            <label className=" text-sm font-medium text-stone-800">Name</label>
            <input
              className=" border border-stone-500 rounded-md py-2 px-3"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
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
              {popupmode == "edit" ? "Save" : "Add particular"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddParticularPopup;
