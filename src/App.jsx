import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Frame from "./pages/frame/Frame";
import Customize from "./pages/customizeTheTour/Customize";
import Contact from "./pages/contact/Contact";
import { Routes, Route } from "react-router-dom";
import Aboutus from "./pages/about-us/Aboutus";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NotFoundPage from "./components/common/NotFoundPage";
import Blogs from "./pages/blog/Blogs";
import BlogPage from "./pages/blog/BlogPage";
import ItenaryBody from "./components/itenary/ItenaryBody";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/user-dashboard/DashboardLayout";
import SalesAdminDashboardLayout from "./components/sales-admin/SalesAdminDashboardLayout";
import DestinationLayout from "./components/destination/DestinationLayout";
import ProtectedRouteLogin from "./components/auth/ProtectedRouteLogin";
import Logout from "./components/auth/Logout";
import ProtectedRouteSalesAdmin from "./components/auth/ProtectedRouteSalesAdmin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Policy from "./pages/legals/Policy";
import TermsCondition from "./pages/legals/TermsCondition";

function App() {
  return (
    <div className=" font-noto-sans">
      <Routes>
        <Route path="/privacypolicy" element={<Policy />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRouteLogin />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
        <Route path="/destination/*" element={<DestinationLayout />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/itenary/*" element={<ItenaryBody />} />
        <Route path="/state/frame/*" element={<Frame />} />
        <Route path="/country/frame/*" element={<Frame />} />
        <Route path="/customize/*" element={<Customize />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route element={<ProtectedRouteSalesAdmin />}>
          <Route path="/salesadmin/*" element={<SalesAdminDashboardLayout />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
