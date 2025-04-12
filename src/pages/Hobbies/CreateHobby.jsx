import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useState } from "react";
import axios from "axios";


export default function CreateHobbies(){
    const api = 'http://127.0.0.1:8000/api/hobby'

    const [hobby, setHobby] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    const submitForm = async (e) => {
        e.preventDefault()

        try {
            await axios.post(api, {name: hobby}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            navigate('/hobby')
        } catch (error) {
            if (error.response?.data.errors) {
                setError(error.response.data.errors);
            }
        }
    }



    return (
        <FormInput onSubmit={submitForm} title="Create Hobby" >
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <FormInput.Label>Name</FormInput.Label>
                    <FormInput.Input type="text" value={hobby} onChange={ (e) => setHobby(e.target.value)} placeholder="Enter hobby name" />
                        {error.name && <p className="text-red-500 text-sm">{error.name[0]}</p>}
                </div>
            </div>
            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton  >Create Hobby</FormInput.SubmitButton>
                <Link to="/hobby">
                <FormInput.CancelButton >Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
    )
}