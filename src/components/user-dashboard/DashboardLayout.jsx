import React from "react";
import SidebarUser from "./common/SidebarUser";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../common/NotFoundPage";
import UserDashboard from "./UserDashboard";
import UserRequest from "./UserRequest";
import UserProfile from "./UserProfile";

const DashboardLayout = () => {
  return (
    <div>
      <SidebarUser />
      <div className=" ml-16 sm:ml-52 lg:ml-80 bg-stone-50">
        <Routes>
          <Route index path="/" element={<UserDashboard />} />
          <Route path="/request" element={<UserRequest />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
