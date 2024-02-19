import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import AddStatePopup from "../../../../layout/admin/domestic/state/AddStatePopup";

const AdminDomesticState = () => {
  const [popupmode, setPopupmode] = useState("add");
  const [editId, setEditId] = useState();
  const [formData, setFormData] = useState({
    bestTimeToVisit: [],
    stateName: "",
    aboutState: "",
    imageUrl: "",
    bestPlaces: "",
  });
  const [domesticState, setDomesticState] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPopupmode("add");
    setOpen(false);
    setFormData({
      bestTimeToVisit: "",
      stateName: "",
      aboutState: "",
      imageUrl: "",
      bestPlaces: "",
    });
  };

  const handleAdd = () => {
    setPopupmode("add");
    handleClickOpen();
  };
  const handleView = (id) => {
    setEditId(id);
    setPopupmode("view");
    handleClickOpen();
  };
  const handleEdit = (id) => {
    setEditId(id);
    setPopupmode("edit");
    handleClickOpen();
  };

  const handleDelete = (id) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/domesticstate/delete`, { id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/domesticstate/`)
      .then((response) => {
        const data = response.data;
        if (data.bestTimeToVisit && data.bestTimeToVisit.length > 0) {
          data.bestTimeToVisit = data.bestTimeToVisit[0];
        }
        setDomesticState(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className=" ml-16 sm:ml-52 lg:ml-80 py-20 px-4 sm:px-10">
      <div className=" flex flex-col sm:flex-row gap-2 justify-between sm:items-center pb-20">
        <h1 className=" text-2xl sm:text-4xl font-semibold text-stone-800">
          Domestic State
        </h1>
        <button
          onClick={handleAdd}
          className=" bg-primary py-1.5 px-2 sm:px-4 font-medium text-white rounded w-fit"
        >
          Add Domestic State
        </button>
        <AddStatePopup
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          setOpen={open}
          formData={formData}
          setFormData={setFormData}
          popupmode={popupmode}
          editId={editId}
        />
      </div>
      <div className=" flex items-center justify-center gap-3 flex-wrap">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-xl rounded-2xl">
            <thead className=" border-b bg-stone-50 border-b-stone-300 text-stone-800 ">
              <tr className=" py-2">
                <th className="py-5 px-4 uppercase font-semibold text-sm">
                  SL.NO
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  STATE NAME
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ABOUT STATE
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  BEST PLACES
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  BEST TIME TO VISIT
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {domesticState.map((row, index) => (
                <tr
                  key={row._id}
                  className="text-center border-b border-stone-200"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">{row.stateName}</td>
                  <td className="py-3 px-5">{row.aboutState}</td>
                  <td className="py-3 px-5">{row.bestPlaces}</td>
                  <td className="py-3 px-5">{row.bestTimeToVisit}</td>
                  <td className="py-3 px-5">
                    <div className=" flex items-center gap-3 text-xl">
                      <span>
                        <IoMdEye
                          onClick={() => {
                            setPopupmode("view");
                            // setEditId(id);
                            handleView(row._id);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>
                      <span>
                        <FaEdit
                          onClick={() => {
                            setPopupmode("edit");
                            // setEditId(id);
                            handleEdit(row._id);
                          }}
                          className=" cursor-pointer"
                        />
                      </span>{" "}
                      <span
                        onClick={() => handleDelete(row._id)}
                        className=" cursor-pointer"
                      >
                        <MdDelete />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDomesticState;
