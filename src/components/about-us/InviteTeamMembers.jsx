import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InviteTeamMembers = () => {
  const [inputNumber, setInputNumber] = useState([1, 2, 3]);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  return (
    <div className=" bg-stone-100 flex justify-center items-center py-14">
      <div className=" flex flex-col gap-4">
        <div className=" flex items-center justify-center">
          <div className=" flex justify-center items-center bg-stone-200 pl-3 pr-2 py-2 rounded w-fit">
            <FaUserPlus className=" text-6xl text-primary" />
          </div>
        </div>
        <h1 className=" text-stone-900 font-bold text-4xl text-center">
          Invite your team members
        </h1>
        <h2 className=" text-stone-500 text-center mb-3">
          Get your projects up and running faster by directly inviting your team
          members to your project
        </h2>
        <div className=" hidden sm:grid grid-cols-2 gap-3 font-semibold -mb-2 px-6">
          <h1 className=" text-sm text-stone-600">Email address</h1>
          <h1 className=" text-sm text-stone-600">Role</h1>
        </div>
        {inputNumber.map((res, index) => {
          return (
            <div className=" grid sm:grid-cols-2 gap-3 px-6">
              <input
                type="text"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                className=" border border-stone-300 rounded py-1.5 px-4 focus:outline-none bg-stone-50"
              />
              <Box>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          );
        })}
        <div className=" border border-stone-300 text-primary py-2 px-4 font-medium text-center mx-6 rounded-lg">
          + Add more
        </div>
        <div className=" flex justify-center items-center">
          <button className=" mt-2 border border-primary bg-primary py-2 px-5 text-white font-medium rounded-md">
            Send invitation
          </button>
        </div>
        <div className=" text-center text-primary font-medium">
          Invite later
        </div>
      </div>
    </div>
  );
};

export default InviteTeamMembers;
