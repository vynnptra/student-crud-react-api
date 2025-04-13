import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";



export default function CreateSiswa() {
    const api = "http://127.0.0.1:8000"
    
    const [dataHobbies, getHobbies] = useState([]);
    const [name, setName] = useState("");
    const [nisn, setNisn] = useState("");
    const [phones, setPhones] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const cleanedPhones = phones.filter((p) => p.trim() !== "")

    const {token} = useContext(AppContext);
    
    async function getAllHobbies(){
        const response = await axios.get(`${api}/api/hobby`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
        });
    
    
        getHobbies(response.data.data);
    }

    const storePost = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`${api}/api/siswa`, {
                name,
                nisn,
                phone_number: cleanedPhones,
                hobbies: hobbies,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type':  'application/json',
                },
            });

            navigate("/siswa");
        } catch (errors) {
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

    const addPhone = () => {
        setPhones([...phones, ""])
    };

    const removePhones = (index) => {
        setPhones(phones.filter((_, i) => index !== i))
    }


    useEffect(() => {
        if (phones.length === 0) {
            setPhones([""]);
        }
    }, [phones])
    useEffect(() => {getAllHobbies()}, []);

    return (
        <div className="pt-36">
        <div className="p-8 rounded border shadow-md border-gray-200 w-9/12 ml-96">
          <h1 className="font-medium text-3xl">Create Siswa</h1>
          <p className="text-gray-600 mt-6">Isi informasi pengguna dengan benar.</p>
  
        <FormInput onSubmit={storePost} title="Create Siswa" >
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
                           <div className="flex justify-between">
                               <FormInput.Label > Phone </FormInput.Label>
                               <button type="button" className="text-sm text-green-700 block mb-1 font-medium mr-16 " onClick={() => addPhone()}  > Add +</button>
                           </div>
                           { phones.map((phone,index) => (
                                   <div key={index} className="mt-2 flex">
                                       <FormInput.Input type="number" value={phone} onChange={(e) => handlePhoneChange(index, e.target.value)} />
                                       {phones.length > 0 
                                       ?  <button type="button" className="text-sm block text-white px-3 font-medium ml-3 bg-red-600   rounded-md" onClick={() => {removePhones(index)}} >
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-6">
                                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                       </svg>
       
                                   </button> : "" }
                                      
                                   </div>
                           )) }
                              {(() => {
                               const phoneKey = Object.keys(errors).find(key => key.startsWith("phone_number"));
                               if (!phoneKey) return null;
       
                               const message = errors[phoneKey][0].replace(phoneKey, "phone number");
       
                               return <p className="text-sm text-red-500">{message}</p>;
                           })()}
                       </div>
            </div>
            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton>Create</FormInput.SubmitButton>
                <Link to="/siswa">
                    <FormInput.CancelButton>Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
        </div>
        </div>
        
    )
}