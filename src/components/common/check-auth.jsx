import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children}) => {
  const location = useLocation();

  if(!isAuthenticated && !(location.pathname.includes("auth"))){
    return <Navigate to="/auth/login"/>
  }

  if(isAuthenticated && (location.pathname.includes("auth"))){
    if(user?.user?.role === "admin"){
        return <Navigate to="/admin/dashboard"/>
    }else{
        return <Navigate to="/shop/home"/>
    }
  }

  if(isAuthenticated && user?.user?.role !== "admin" && location.pathname.includes("admin")){
    return <Navigate to="/unauth-page"/>
  }

  if(isAuthenticated && user?.user?.role === "admin" && location.pathname.includes("shop")){
    return <Navigate to="/admin/dashboard"/>
  }

  return <>{children}</>
}

export default CheckAuth;