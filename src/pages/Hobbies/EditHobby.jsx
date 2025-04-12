import { Link, useNavigate, useParams } from "react-router";
import FormInput from "../../components/FormInput";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditHobby() {
    const {id} = useParams();

    const [hobby, setHobby] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const fecthHobby = async () => {
        await axios.get(`http://127.0.0.1:8000/api/hobby/${id}`)
        .then((res) => {
            setHobby(res.data.data[0].name)
        });

    }

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/hobby/${id}`, {name: hobby},{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
            }
        });
        navigate('/hobby')
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    useEffect(() => {
        
        fecthHobby();

    }, []);


    return (
        <FormInput title="Edit Hobby" onSubmit={submitForm} >
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <FormInput.Label >Name</FormInput.Label>
                    <FormInput.Input type="text" value={hobby} onChange={ (e) => {setHobby(e.target.value)} } placeholder="Enter hobby name" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
                </div>
            </div>
            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton>Create Hobby</FormInput.SubmitButton>
                <Link to="/hobby">
                <FormInput.CancelButton >Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
    )
}