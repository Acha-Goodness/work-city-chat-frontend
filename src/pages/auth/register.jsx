import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner"

const initialState = {
    userName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const AuthRegister = () => {
    const { isLoading } = useSelector(state => state.auth)
    const [ formData, setFormData ] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(registerUser(formData))
          .then((res) => {
            if(res?.payload?.status === "success"){
                toast(res.payload.message);
                navigate("/auth/verifyOtp");
            }else if(res?.error?.message === "Rejected") {
                throw new Error(res.payload || "Registration failed");
            }else{
                throw new Error("Registration failed");
            };
        }).catch((err) => {
            toast(err.message);
        })
    };

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Create new account</h1>
                <div className="flex justify-center items-center mt-2">
                    <p className="text-[white]">Already have an account</p>
                    <Link className="font-medium ml-2 text-[#D4AF37] hover:underline" to="/auth/login">Login</Link>
                </div>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthRegister;