import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../utils/context";
export const AdminProtected = ({ children }) => {
  const { userData } = useContext(Context);

  if (!userData || userData.role !== "ad@min#") {
    return <Navigate to="/" />;
  }

  return children;
};
