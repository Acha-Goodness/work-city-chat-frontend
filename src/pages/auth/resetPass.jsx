import CommonForm from '@/components/common/form';
import { resetPasswordControls } from '@/components/config';
import { resetPassword } from '@/store/auth-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const initialState = {
    password : "",
    confirmPassword : ""
}

const ResetPass = () => {
  const [ formData, setFormData ] = useState(initialState);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault(); 

    dispatch(resetPassword(formData))
    .then((res) => {
        if(res?.payload?.status === "success"){
            toast(res.payload.message)
        }else if(res?.error?.message === "Rejected"){
            throw new Error(res.payload || "Password reset failed");
        }else{
            throw new Error("Password reset failed");
        }
    }).catch((err) => {
        toast(err.message);
    });
  };

  return (
      <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Reset Password</h1>
                <div className="mt-2">
                    <p className="text-[white]">Set a new password</p>
                </div>
            </div>
            <CommonForm
                formControls={resetPasswordControls}
                buttonText={"Reset Password"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                onSubmit={onSubmit}
            />
        </div>
  )
};

export default ResetPass;