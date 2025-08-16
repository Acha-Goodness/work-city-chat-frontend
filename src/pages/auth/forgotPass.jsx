import { useState } from 'react'
import { forgotPasswordControls } from '@/components/config';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { forgotPassword } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const initialState = {
    email : ""
}

const ForgotPass = () => {
  const  [ formData, setFormData ] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(formData))
    .then((res) => {
        if(res?.payload?.status === "success"){
            toast(res.payload.message);
            navigate("/auth/resetPassword");
        }else if(res?.error?.message === "Rejected"){
            throw new Error(res.payload || "Email failed")
        }else{
            throw new Error("Email failed")
        }
    }).catch((err) => {
        toast(err.message)
    })
  }

  return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Reset Password</h1>
                <div className="mt-2">
                    <p className="text-[white]">Enter your email to reset password</p>
                </div>
            </div>
            <CommonForm
                formControls={forgotPasswordControls}
                buttonText={"Send"}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                onSubmit={onSubmit}
            />
             <div className="flex justify-center items-center mt-2">
                 <p className="text-[white]">Return to</p>
                <Link className="font-medium ml-2 text-[#D4AF37] hover:underline" to="/auth/login">Login</Link>
             </div>
        </div>
  )
}

export default ForgotPass;