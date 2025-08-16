import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
    email : "",
    password : ""
}

const AuthLogin = () => {
    const [ formData, setFormData ] = useState(initialState);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData))
        .then((res) => {
            if(res?.payload?.status === "success"){
                toast(res.payload.message)
            }else if(res?.error?.message === "Rejected"){
                throw new Error(res.payload || "Login failed");
            }else{
                throw new Error("Login failed");
            }
        }).catch((err) => {
            toast(err.message)
        })
    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Sign in to your account</h1>
                <div className="flex justify-center items-center mt-2">
                    <p className="text-[white]">Don't have an account</p>
                    <Link className="font-medium ml-2 text-[#D4AF37] hover:underline" to="/auth/register">Register</Link>
            </div>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={"Login"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                onSubmit={onSubmit}
            />
            <div className="flex justify-end items-center mt-2">
                <p className="text-[white]">Forgot password?</p>
                <Link className="font-medium ml-2 text-[#D4AF37] hover:underline" to="/auth/forgotPassword">Reset Password</Link>
            </div>
        </div>
    );
}

export default AuthLogin;