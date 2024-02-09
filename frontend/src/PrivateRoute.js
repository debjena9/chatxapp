import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
