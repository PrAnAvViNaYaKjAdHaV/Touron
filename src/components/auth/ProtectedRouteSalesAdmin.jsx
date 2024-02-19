import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRouteSalesAdmin() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userToken = sessionStorage.getItem("userToken");
  const adminToken = sessionStorage.getItem("admin");

  // useEffect(() => {

  //   if (user) {
  //     console.log("Parsed user:", user);
  //     setUser(user);
  //   }

  //   if (userToken) {
  //     console.log("User token:", userToken);
  //     setUserToken(userToken);
  //   }

  //   if (adminToken) {
  //     console.log("Admin token:", adminToken);
  //     setAdminToken(adminToken);
  //   }

  //   console.log("User, userToken, adminToken:", user, userToken, adminToken);
  // }, []);

  const allowRoute =
    String(adminToken) === "9047514717" ||
    (user && user.mobileNumber === "9047514717") ||
    String(adminToken) === "9123571239" ||
    (user && user.mobileNumber === "9123571239") ||
    String(adminToken) === "9362402696" ||
    (user && user.mobileNumber === "9362402696");

  console.log("allowRoute:", allowRoute);

  return allowRoute ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouteSalesAdmin;
