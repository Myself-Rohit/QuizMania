import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { loggedInUser } = useAuthContext();

  return <>{loggedInUser ? <Outlet /> : <Navigate to={"/auth"} />}</>;
};

export default ProtectedRoute;
