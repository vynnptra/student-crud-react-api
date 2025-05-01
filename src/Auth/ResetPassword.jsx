import { Link, useNavigate, useSearchParams } from "react-router";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {

    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [ errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const ResetPassword = async (e) => {
        e.preventDefault();

        try {
            
            const res = await axios.post('http://127.0.0.1:8000/api/reset-password', {
                email: email,
                token: token,
                password: password,
                password_confirmation: passwordConfirmation
            }, {
                headers: {

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            console.log("response", res);

        } catch (error) {

            setErrors(error.response?.data.errors)
            console.log("response", error.response.data)
        }
    }



    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Reset Password</h2>
    
        <FormInput className="space-y-4" onSubmit={ResetPassword} >
      <div>
        <FormInput.Label>Password</FormInput.Label>
        <FormInput.Input type="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}}  />
      </div>
      <div>
        <FormInput.Label>Password Confirmation</FormInput.Label>
        <FormInput.Input type="password" placeholder="********" value={passwordConfirmation} onChange={(e) => {setPasswordConfirmation(e.target.value)}} />
      </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password[0]}</p>}

        <div className="grid grid-flow-col grid-cols-2 gap-4">
                    <Link to="/">
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-indigo-600 font-medium py-2.5 rounded-lg transition-colors">
                            Back
                        </button>
                    </Link>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Reset
                    </button>
                    </div>
        </FormInput>

  </div>
</div>
        </>
    )
}