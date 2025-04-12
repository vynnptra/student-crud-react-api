import { Link, useNavigate, useParams } from "react-router";
import FormInput from "../../components/FormInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

export default function EditSiswa () {

    const {token} = useContext(AppContext);

    
    const {id} = useParams();
    const [dataHobbies, getHobbies ] = useState([]);
    const [name, setName] = useState("");
    const [nisn, setNisn] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [phones, setPhones] = useState([]);
    const [error, setErrors] = useState([]);
    const navigation = useNavigate();
    
    const cleanedPhones = phones.filter((p) => p.trim() !== "")

    async function getAllHobbies() {
       const res = await axios.get(`http://127.0.0.1:8000/api/hobby`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        getHobbies(res.data.data);
    }

    const fecthSiswa = async () => {
        
        try {
            
            const res = await axios.get(`http://127.0.0.1:8000/api/siswa/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const siswa = res.data.data;
            setName(siswa.name);
            setNisn(siswa.nisn.nisn)
            setHobbies(siswa.hobbies.map((h) => h.id))
            setPhones(siswa.phone_numbers.map((p) => p.phone_number))
        } catch (error) {
            console.log(error.response);
        }
    }

    const updateForm = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/siswa/${id}`, {
                name,
                nisn,
                hobbies: hobbies,
                phone_number: cleanedPhones 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            navigation('/siswa')
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }
    

    const handleHobbiesChange = (id) => {
        if(hobbies.includes(id)){
            setHobbies(hobbies.filter( (h) =>  h !== id))
        } else {
            setHobbies([...hobbies, id])
        }
    }

    const handlePhoneChange = (index, value) => {
        setPhones(phones.map((p, i) => i === index ? value : p))
    }


    useEffect ( () => {
        fecthSiswa();
    }, [])

    useEffect( () =>{
        getAllHobbies();
    }, [] )

    useEffect(() => {
        if (phones.length === 0) {
          setPhones([""]);
        }
      }, [phones]);
      

    const removePhone = (index) => {
        setPhones(phones.filter((_, i) => i !== index));
    }

    const addPhone = () => {
        setPhones([...phones, '']);
    }
    

    return (
        <div className="pt-36">
        <div className="p-8 rounded border shadow-md border-gray-200 w-9/12 ml-96">
          <h1 className="font-medium text-3xl">Edit Siswa</h1>
          <p className="text-gray-600 mt-6">Isi informasi pengguna dengan benar.</p>
  
        <FormInput title="Edit Siswa" onSubmit={updateForm}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <FormInput.Label > Name </FormInput.Label>
                    <FormInput.Input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                        {error.name && <p className="text-sm text-red-500">{error.name[0]}</p>}
                </div>
                <div>
                    <FormInput.Label> NISN </FormInput.Label>
                    <FormInput.Input type="number" onChange={(e) => { setNisn(e.target.value) }} value={nisn}/>
                    {error.nisn && <p className="text-sm text-red-500">{error.nisn[0]}</p>}
                </div>
                <div>
                    <div className="mb-5">
                    <FormInput.Label>Select Hobby</FormInput.Label>
                    </div>
                    <div>
                    <FormInput.Checkbox>
                        {dataHobbies.map((h) => (
                            <FormInput.Checkbox.Item key={h.id} value={h.id} checked={hobbies.includes(h.id)} onChange={ () => {handleHobbiesChange(h.id)}}  >{h.name}</FormInput.Checkbox.Item>
                        ))}
                    </FormInput.Checkbox>
                    {error.hobbies && <p className="text-sm text-red-500 mt-3">{error.hobbies[0]}</p>}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <FormInput.Label > Phone </FormInput.Label>
                        <button type="button" className="text-sm text-green-700 block mb-1 font-medium mr-16 " onClick={addPhone} > Add +</button>
                    </div>
                    { phones.map((phone,index) => (
                            <div key={index} className="mt-2 flex">
                                <FormInput.Input type="number" value={phone} onChange={(e) => handlePhoneChange(index, e.target.value)}  />
                                {phones.length > 0 
                                ?  <button type="button" className="text-sm block text-white px-3 font-medium ml-3 bg-red-600   rounded-md" onClick={() => removePhone(index)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>

                            </button> : "" }
                               
                            </div>
                    )) }
                       {(() => {
                        const phoneKey = Object.keys(error).find(key => key.startsWith("phone_number"));
                        if (!phoneKey) return null;

                        const message = error[phoneKey][0].replace(phoneKey, "phone number");

                        return <p className="text-sm text-red-500">{message}</p>;
                    })()}
                </div>
            </div>
            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton  >Edit</FormInput.SubmitButton>
                <Link to="/siswa">
                    <FormInput.CancelButton>Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
        </div>
        </div>
        
    )
}