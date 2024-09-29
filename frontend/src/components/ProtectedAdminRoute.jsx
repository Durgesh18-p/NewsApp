/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = Cookies.get("admin") === "true"; 

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedAdminRoute;
