import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children}) => {
  const location = useLocation();

 if(!isAuthenticated && location.pathname === "/"){
    return <Navigate to="/auth/login" replace />
  }

 if(!isAuthenticated && !location.pathname.startsWith("/auth")){
    return <Navigate to="/auth/login"/>
  }

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/chat/home" replace />;
  }

  if(isAuthenticated && location.pathname.startsWith("/auth")){
    return <Navigate to="/chat/home"/>
  }

  return <>{children}</>
}

export default CheckAuth;