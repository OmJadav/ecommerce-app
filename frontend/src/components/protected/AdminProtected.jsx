import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../utils/context";

export const AdminProtected = ({ children }) => {
  const { userData, userLoading } = useContext(Context);
  // console.log(userData);

  if (!userData || userData.role !== "ad@min#") {
    return <Navigate to="/" />;
  }

  return children;
};
