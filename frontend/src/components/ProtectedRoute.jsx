import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import Auth from "../pages/Auth";

const ProtectedRoute = () => {
  const { loggedInUser } = useAuthContext();
  return <>{loggedInUser ? <Outlet /> : <Auth />}</>;
};

export default ProtectedRoute;
