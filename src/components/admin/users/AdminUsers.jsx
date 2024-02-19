import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import AddUsersPopup from "../../../layout/admin/users/AddUsersPopup";

const AdminUsers = () => {
  const [popupmode, setPopupmode] = useState("add");
  const [editId, setEditId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    designation: "",
    role: "Admin",
  });
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      designation: "",
      role: "Admin",
    });
  };

  const handleEdit = (id) => {
    setEditId(id);
    setPopupmode("edit");
    handleClickOpen();
  };

  const handleDelete = (id) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/employee/delete`, { id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/employee/`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" ml-16 sm:ml-52 lg:ml-80 py-20 px-4 sm:px-10">
      <div className=" flex flex-col sm:flex-row gap-2 justify-between sm:items-center pb-20">
        <h1 className=" text-2xl sm:text-4xl font-semibold text-stone-800">
          Users
        </h1>
        <button
          onClick={handleClickOpen}
          className=" bg-primary py-1.5 px-2 sm:px-4 font-medium text-white rounded w-fit"
        >
          Add Users
        </button>
        <AddUsersPopup
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
                  NAME
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  EMAIL
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  PASSWORD
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  MOBILE NUMBER
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ROLE
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((row, index) => (
                <tr
                  key={row._id}
                  className="text-center border-b border-stone-200"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">{row.name}</td>
                  <td className="py-3 px-5">{row.email}</td>
                  <td className="py-3 px-5">
                    {row.password?.length > 20
                      ? `${row.password.slice(0, 20)}...`
                      : row.password}
                  </td>
                  <td className="py-3 px-5">{row.mobileNumber}</td>
                  <td className="py-3 px-5">{row.role}</td>
                  <td className="py-3 px-5">
                    <div className=" flex items-center gap-3 text-xl">
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

export default AdminUsers;
