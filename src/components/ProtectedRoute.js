import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ProtectedRoute({ children, guestOnly = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8000/api/supplier/profile");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [location]);

  if (isAuthenticated === null) {
    return null;
  }

  if (guestOnly) {
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}