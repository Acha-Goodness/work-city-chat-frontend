import { useState } from 'react';
import CommonForm from "@/components/common/form";
import { verifyOtpControls } from '@/components/config';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { verifyOtp } from '@/store/auth-slice';
import { toast } from 'sonner';


const VerifyOtp = () => {
const { isLoading } = useSelector(state => state.auth);
const [ formData, setFormData ] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();

const onSubmit = (e) => {
    e.preventDefault();

    const otp = Object.values(formData).join('');
    dispatch(verifyOtp(otp))
    .then((res) => {
        console.log(res);  
        if(res?.payload?.status === "success"){
            toast(res?.payload?.message);
        }else if(res?.error?.message === "Rejected"){
            throw new Error(res.payload || "Verification failed");
        }else{
            throw new Error("Verification failed")
        }
    }).catch((err) => {
        toast(err.message);
    });
  };

  return (
       <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Verify OTP</h1>
                <div className="flex justify-center items-center mt-2">
                    <p className="text-[white]">Please verify your email</p>
                </div>
            </div>
            <div className="w-[60%] mx-auto">
                <CommonForm
                    formControls={verifyOtpControls}
                    buttonText={"Verify Otp"}
                    formData={formData}
                    setFormData={setFormData}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                />
             </div>
            <div className="flex justify-center items-center mt-2">
                <p className="text-[white]">Click to resend</p>
                <h1 className="font-medium ml-2 text-[#D4AF37] hover:underline">Get OTP</h1>
            </div>
        </div>
  )
}

export default VerifyOtp;