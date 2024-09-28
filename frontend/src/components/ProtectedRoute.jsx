/* eslint-disable react/prop-types */
// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token !== undefined; // Checks if token exists
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children; // If authenticated, render the children
};

export default ProtectedRoute;
