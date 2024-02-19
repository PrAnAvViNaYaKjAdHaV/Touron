import React, { useState } from "react";
import AddItineryDetailsPopup from "../../../layout/admin/itinery/AddItineryDetailsPopup";

const AdminItineryDetails = ({ type }) => {
  const [formData, setFormData] = useState({
    country: "",
    overview: "",
    inclusion: "",
    weather: "",
    review: [],
    faq: [],
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      country: "",
      overview: "",
      inclusion: "",
      weather: "",
      review: [],
      faq: [],
    });
  };

  const handleAdd = () => {
    handleClickOpen();
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className=" bg-primary py-1.5 px-4 font-medium text-white rounded"
      >
        {type === "add" ? "Add" : "Edit"} Details
      </button>
      <AddItineryDetailsPopup
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={open}
        formData={formData}
        setFormData={setFormData}
        popupmode={type}
        // editId={editId}
      />
    </>
  );
};

export default AdminItineryDetails;
