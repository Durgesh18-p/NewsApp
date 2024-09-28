/* eslint-disable react/prop-types */
// components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { getTokenFromCookies } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getTokenFromCookies(); // Get token from cookies

  // If no token is present, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token is present, allow access to the children component
  return children;
};

export default ProtectedRoute;
