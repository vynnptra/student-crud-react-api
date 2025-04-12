import { Link, useNavigate } from "react-router"
import FormInput from "../components/FormInput"
import { useState } from "react"
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigation = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register', {
                name: username,
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            navigation('/login')

        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response?.data.errors)
        }
    }

    return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>
    
        <FormInput className="space-y-4" onSubmit={register} >

      <div>
        <FormInput.Label>Username</FormInput.Label>
        <FormInput.Input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
      </div>

      <div>
        <FormInput.Label>Email</FormInput.Label>
        <FormInput.Input type="text" placeholder="your@email.com" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
      </div>

      <div>
        <FormInput.Label>Password</FormInput.Label>
        <FormInput.Input type="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        {errors.password && <p className="text-sm text-red-500">{errors.password[0]}</p>}
      </div>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors  ">
        Sign up
      </button>
        </FormInput>

    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account? 
      <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
      Sign in
      </Link>
    </div>
  </div>
</div>
    )
}