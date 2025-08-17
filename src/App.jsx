
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import VerifyOtp from "./pages/auth/verifyOtp";
import ForgotPass from "./pages/auth/forgotPass";
import ResetPass from "./pages/auth/resetPass";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { toast } from "sonner";
import { MoonLoader } from 'react-spinners';
import { Skeleton } from "@/components/ui/skeleton"
import logo from "./assets/logo.png";
import HomeLayout from "./components/home-view/layout";
import Home from "./pages/main/home";
import NavBar from "./components/Nav/navbar";
import Profile from "./pages/main/profile-page";
import { RiMessage3Fill } from "react-icons/ri";

function App() {
  const { user, isAuthenticated, isLoading} = useSelector( (state) => state.auth)
  const dispatch = useDispatch();
  // const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth())
    .then((res) => {
      if(res?.payload?.status === "success"){
        toast(res.payload.message)
      }else if(res?.error?.message === "Rejected"){
        throw new Error(res.payload || "Authentication failed");
      }else{
        throw new Error("Authentication Failed")
      }
    }).catch((err) => {
      toast(err.message)
    })
  }, [dispatch]);


  return (
    <>
    {
      isLoading ? 
      (
        <div className="h-[100vh] flex justify-center items-center">
            <Skeleton className="w-[250px]">
                  <RiMessage3Fill size={100} className="text-white"/>
            </Skeleton>
        </div> 
      )
        :  
      (
        <div className="flex flex-col overflow-hidden bg-white">
          {/* COMMON COMPONENT */}
          <NavBar/>
          <Routes>
              <Route path="/auth" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout/>
                </CheckAuth>
              }>
                  <Route path="login" element={<AuthLogin/>}/>
                  <Route path="register" element={<AuthRegister/>}/>
                  <Route path="verifyOtp" element={<VerifyOtp/>}/>
                  <Route path="forgotPassword" element={<ForgotPass/>}/>
                  <Route path="resetPassword" element={<ResetPass/>}/>
              </Route>
                <Route path="/chat" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <HomeLayout/>
                </CheckAuth>
                }>
                  <Route path="home" element={<Home/>}/>
                  <Route path="profile" element={<Profile/>}/>
              </Route>
              <Route path="/unauth-page" element={<UnauthPage/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      )
     }
    </>
  )
}

export default App;
