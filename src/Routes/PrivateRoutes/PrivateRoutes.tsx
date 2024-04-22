import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { authInfo } = useContext(AuthContext);
  const { user, loading } = authInfo;

  if (loading) {
    return <CustomSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
