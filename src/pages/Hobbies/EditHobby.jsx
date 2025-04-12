import { Link, useNavigate, useParams } from "react-router";
import FormInput from "../../components/FormInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

export default function EditHobby() {
    const {id} = useParams();
    const {token} = useContext(AppContext)

    const [hobby, setHobby] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const fecthHobby = async () => {
        await axios.get(`http://127.0.0.1:8000/api/hobby/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setHobby(res.data.data[0].name)
        });

    }

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/hobby/${id}`, {name: hobby},{
                headers: {
                    'Authorization': `Bearer ${token}`,
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
        
        <div className="pt-36">
        <div className="p-8 rounded border shadow-md border-gray-200 w-9/12 ml-96">
          <h1 className="font-medium text-3xl">Edit Hobbies</h1>
          <p className="text-gray-600 mt-6">Isi informasi pengguna dengan benar.</p>
  
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
            </div>
        </div>
            
    )
}