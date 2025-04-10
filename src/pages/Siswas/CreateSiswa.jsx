import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useEffect, useState } from "react";
import axios from "axios";



export default function CreateSiswa() {
    const api = "http://127.0.0.1:8000"
    
    const [dataHobbies, getHobbies] = useState([]);
    const [name, setName] = useState("");
    const [nisn, setNisn] = useState("");
    const [phones, setPhones] = useState([""]);
    const [hobbies, setHobbies] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    
    async function getAllHobbies(){
        const response = await axios.get(`${api}/api/hobby`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
        });
    
    
        getHobbies(response.data.data);
    }

    const storePost = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${api}/api/siswa`, {
                name,
                nisn,
                phone_number: phones,
                hobbies: hobbies,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log(response.data);
            navigate("/siswa");
        } catch (errors) {
            console.log(errors);
            console.log(errors.response.data.errors)
            if (errors.response?.data.errors) {
                setErrors(errors.response.data.errors);
            }
        }
        
    }

    const handleHobbies = (id) => {
        if (hobbies.includes(id)) {
            setHobbies(hobbies.filter((h) => h !== id));
        } else {
            setHobbies([...hobbies, id]);
        }
    }
    
    const handlePhoneChange = (index, value) => {
        const newPhones = [...phones];
        newPhones[index] = value,
        setPhones(newPhones);
    }


    useEffect(() => {getAllHobbies()}, []);

    return (

        <FormInput onSubmit={storePost} >
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <FormInput.Label > Name </FormInput.Label>
                    <FormInput.Input type="text" value={name} onChange={(e) => setName(e.target.value) } />
                        {errors.name && <p className="text-red-500 text-sm" >{errors.name[0]}</p> }
                </div>
                <div>
                    <FormInput.Label> NISN </FormInput.Label>
                    <FormInput.Input type="number" value={nisn} onChange={(e) => setNisn(e.target.value)}/>
                        {errors.nisn && <p className="text-red-500 text-sm">{errors.nisn[0]} </p>}
                </div>
                <div>
                    <div className="mb-5">
                    <FormInput.Label>Select Hobby</FormInput.Label>
                    </div>
                    <div>
                    <FormInput.Checkbox onChange={setHobbies}>
                        {dataHobbies.map((h) => (
                            <FormInput.Checkbox.Item key={h.id} value={h.id} checked={hobbies.includes(h.id)} onChange={() => handleHobbies(h.id)} >{h.name}</FormInput.Checkbox.Item>
                        ))}
                    </FormInput.Checkbox>
                    {errors.hobbies && <p className="text-red-500 text-sm mt-4">{errors.hobbies[0]} </p>}
                    </div>
                </div>
                <div>
                    <FormInput.Label > Phone </FormInput.Label>
                    {
                        phones.map((phone, index) => (
                            <div key={index} >
                                <FormInput.Input type="number" value={phone} onChange={(e) => handlePhoneChange(index, e.target.value)} />
                                    
                            </div>
                        ))
                    }
                        {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number[0]} </p>}
                </div>
            </div>
            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton>Create</FormInput.SubmitButton>
                <Link to="/siswa">
                    <FormInput.CancelButton>Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
        
    )
}