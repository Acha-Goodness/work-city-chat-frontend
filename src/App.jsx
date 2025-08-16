
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import VerifyOtp from "./pages/auth/verifyOtp";
import ForgotPass from "./pages/auth/forgotPass";
import ResetPass from "./pages/auth/resetPass";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { toast } from "sonner";
import { MoonLoader } from 'react-spinners';
import { Skeleton } from "@/components/ui/skeleton"
import logo from "./assets/logoo.png";
import Orders from "./pages/shopping-view/orders";
import Wishlist from "./pages/shopping-view/wishlist";
import Services from "./pages/shopping-view/services";
import AboutUs from "./pages/shopping-view/aboutUs";
import Contact from "./pages/shopping-view/contact";
import Gallery from "./pages/shopping-view/gallery";
import Faq from "./pages/shopping-view/faq";
import HelpCenter from "./pages/shopping-view/helpCenter";
import PaymentOptions from "./pages/shopping-view/paymentOptions";
import TrackOrder from "./pages/shopping-view/trackOrder";
import CancelOrder from "./pages/shopping-view/cancelOrder";
import ReturnRefunds from "./pages/shopping-view/returnRefunds";
// import Header from "./components/shopping-view/header";

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
              <img src={logo} alt="logo"/>
            </Skeleton>
        </div> 
      )
        :  
      (
        <div className="flex flex-col overflow-hidden bg-white">
          {/* COMMON COMPONENT */}
          {/* {
            location.pathname.includes("auth") ? <></> :
            <Header/>
          } */}
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
              <Route path="/admin" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout/>
                </CheckAuth>
                }>
                  <Route path="dashboard" element={<AdminDashboard/>}/>
                  <Route path="products" element={<AdminProducts/>}/>
                  <Route path="orders" element={<AdminOrders/>}/>
                  <Route path="features" element={<AdminFeatures/>}/>
              </Route>
              <Route path="/shop" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout/>
                </CheckAuth>
                }>
                  <Route path="home" element={<ShoppingHome/>}/>
                  <Route path="listing" element={<ShoppingListing/>}/>
                  <Route path="checkout" element={<ShoppingCheckout/>}/>
                  <Route path="account" element={<ShoppingAccount/>}/>
                  <Route path="orders" element={<Orders/>}/>
                  <Route path="wishlist" element={<Wishlist/>}/>
                  <Route path="services" element={<Services/>}/>
                  <Route path="about" element={<AboutUs/>}/>
                  <Route path="contact" element={<Contact/>}/>
                  <Route path="gallery" element={<Gallery/>}/>
                  <Route path="faq" element={<Faq/>}/>
                  <Route path="help-center" element={<HelpCenter/>}/>
                  <Route path="pay-options" element={<PaymentOptions/>}/>
                  <Route path="track" element={<TrackOrder/>}/>
                  <Route path="cancel-order" element={<CancelOrder/>}/>
                  <Route path="return-refunds" element={<ReturnRefunds/>}/>
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
