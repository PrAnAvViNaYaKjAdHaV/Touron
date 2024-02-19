import { Outlet, Navigate } from "react-router-dom";

function ProtectedRouteSuperAdmin() {
  let userToken = sessionStorage.getItem("userToken");
  let adminToken = sessionStorage.getItem("admin");

  const allowRoute = adminToken === "9047514717" || adminToken === "9123571239";

  return allowRoute ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouteSuperAdmin;
