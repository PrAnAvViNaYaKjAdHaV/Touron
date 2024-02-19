import React from "react";
import SalesAdminSidebar from "./common/SalesAdminSidebar";
import NotFoundPage from "../common/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import SalesAnalytics from "./analytics/SalesAnalytics";
import SalesDashboard from "./dashboard/SalesDashboard";
import SalesProfile from "./profile-settings/SalesProfile";
import SalesQuery from "./bookings/query/SalesQuery";
import SalesBookingB2B from "./bookings/bookingB2B/SalesBookingB2B";
import SalesBookingB2C from "./bookings/bookingB2C/SalesBookingB2C";
import SalesAdminParticulars from "./particulars/SalesAdminParticulars";
import SalesAdminPayments from "./payments/SalesAdminPayments";
import TodoListcontainer from "./todolist/TodoListcontainer";

const SalesAdminDashboardLayout = () => {
  return (
    <div className=" flex w-full">
      <SalesAdminSidebar />
      <div className=" ml-16 sm:ml-52 lg:ml-80 w-full bg-stone-100 min-h-screen ">
        <Routes>
          <Route index path="/" element={<SalesDashboard />} />
          <Route path="/analytics" element={<SalesAnalytics />} />
          <Route path="/booking/query" element={<SalesQuery />} />
          <Route path="/booking/bookingb2b" element={<SalesBookingB2B />} />
          <Route path="/booking/bookingb2c" element={<SalesBookingB2C />} />
          <Route path="/profile" element={<SalesProfile />} />
          <Route path="/particulars" element={<SalesAdminParticulars />} />
          <Route path="/payments" element={<SalesAdminPayments />} />
          <Route path="/todolist" element={<TodoListcontainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default SalesAdminDashboardLayout;
