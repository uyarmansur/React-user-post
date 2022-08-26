import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {
  const auth = localStorage.getItem("token");;
  if (!auth) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
}
