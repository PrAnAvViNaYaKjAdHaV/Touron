import { Outlet, Navigate } from "react-router-dom";

function ProtectedRouteLogin() {

  let userToken = sessionStorage.getItem("userToken");
  let user = sessionStorage.getItem("user");

  const allowRoute = userToken && user


  return allowRoute ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRouteLogin;