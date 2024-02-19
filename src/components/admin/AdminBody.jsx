import React from "react";
import AdminDashboard from "./AdminDashboard";
import { Route, Routes } from "react-router-dom";
import Analytics from "./Analytics";
import AdminBlog from "./AdminBlog";
import NotFoundPage from "../common/NotFoundPage";
import AdminItinery from "./itinery/AdminItinery";
import AdminTeamMembers from "./team-members/AdminTeamMembers";
import AdminVendor from "./vendor/AdminVendor";
import AdminTestimonials from "./testimonials/AdminTestimonials";
import AdminUsers from "./users/AdminUsers";
import AdminRequest from "./sales/request/AdminRequest";
import AdminCustomer from "./customer/AdminCustomer";
import AdminBookingB2B from "./sales/bookingb2b/AdminBookingB2B";
import AdminBookingB2C from "./sales/bookingb2c/AdminBookingB2C";
import AdminDomesticState from "./domestic/state/AdminDomesticState";
import AdminDomesticCity from "./domestic/city/AdminDomesticCity";
import AdminInternationalCity from "./international/city/AdminInternationalCity";
import AdminInternationalCountry from "./international/country/AdminInternationalCountry";
import ProtectedRouteSuperAdmin from "../auth/ProtectedRouteSuperAdmin";
import BookingDRecord from "./bookingDRecords/BookingDRecord";
import ChatPageView from "./chat/page-view";

const AdminBody = () => {
  return (
    <Routes>
      <Route index path="/" element={<AdminDashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/sales/request" element={<AdminRequest />} />
      <Route path="/sales/bookingb2b" element={<AdminBookingB2B />} />
      <Route path="/sales/bookingb2c" element={<AdminBookingB2C />} />
      <Route path="/domestic/state" element={<AdminDomesticState />} />
      <Route path="/domestic/city" element={<AdminDomesticCity />} />
      <Route path="/international/country" element={<AdminInternationalCountry />} />
      <Route path="/international/city" element={<AdminInternationalCity />} />
      <Route path="/blogs" element={<AdminBlog />} />
      <Route path="/itinary" element={<AdminItinery />} />
      <Route path="/teammembers" element={<AdminTeamMembers />} />
      <Route path="/chatbox" element={<ChatPageView />} />
      <Route path="/testimonials" element={<AdminTestimonials />} />
      <Route element={<ProtectedRouteSuperAdmin />}>
        <Route path="/customers" element={<AdminCustomer />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/vendor" element={<AdminVendor />} />
        <Route path="/bookingdrecords" element={<BookingDRecord />} />
      </Route>
      <Route path="*" element={<NotFoundPage to="/" />} />
    </Routes>
  );
};

export default AdminBody;
