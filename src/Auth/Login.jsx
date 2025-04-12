import { Link, useNavigate } from "react-router"
import FormInput from "../components/FormInput"
import { useContext, useState } from "react"
import axios from "axios";
import { AppContext } from "../Context/AppContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [authErrors, setAuthErrors] = useState("");
    const navigation = useNavigate();
    const {token, setToken} = useContext(AppContext)

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            }, {
                headers: {

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);

            navigation('/')

        } catch (error) {
            console.log("response", error.response.data)
            if (error.response.data.status === 401) {
              setAuthErrors("email or password incorrect.")
            } else {
              setErrors(error.response?.data.errors)
            }
        }
    }

    return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
        <FormInput className="space-y-4" onSubmit={login} >
          {token}

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
      {authErrors && <p className="text-sm text-red-500">{authErrors}</p>}

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors  ">
        Sign In
      </button>
        </FormInput>

    <div className="mt-6 text-center text-sm text-gray-600">
      Don't have an account? 
      <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
      Sign up
      </Link>
    </div>
  </div>
</div>
    )
}