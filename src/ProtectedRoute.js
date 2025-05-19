import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { accounts } = useMsal();
  const token = localStorage.getItem("token");

  if (!accounts.length || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;