import { useState } from "react";
import FormInput from "../components/FormInput";
import { Link, Route } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const getEmail = async  (e) => {
        e.preventDefault();
        
        try {
           const res = await axios.post('http://127.0.0.1:8000/api/forgot-password', {
                email: email,
            }, {
                headers: {

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            setSuccess(res.data.message)
            console.log("response", res)
        } catch (error) {
            setErrors(error.response?.data.errors)
            console.log("response", error.response.data)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative">

            {success &&             <div className=" w-full py-2 bg-green-500 border-green-800 text-white rounded-md mb-4 text-center text-md font-bold">
                {success }
            </div>}


                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>

                <FormInput className="space-y-4" onSubmit={getEmail} >
                    <div>
                        <FormInput.Label>Email</FormInput.Label>
                        <FormInput.Input type="text" placeholder="your@email.com" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
                    </div>
                    <div className="grid grid-flow-col grid-cols-2 gap-4">
                    <Link to="/">
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-indigo-600 font-medium py-2.5 rounded-lg transition-colors">
                            Back
                        </button>
                    </Link>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Send
                    </button>
                    </div>
                    
                </FormInput>
            </div>
        </div>
    );
}
