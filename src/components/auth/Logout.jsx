import { Navigate } from "react-router-dom";

function Logout() {
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("admin");
  sessionStorage.removeItem("user");

  return <Navigate to="/" />;
}

export default Logout;
