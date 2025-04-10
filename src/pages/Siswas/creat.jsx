import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateSiswa() {
    const api = "http://127.0.0.1:8000";
    
    const [dataHobbies, getHobbies] = useState([]);
    const [name, setName] = useState("");
    const [nisn, setNisn] = useState("");
    const [phones, setPhones] = useState([""]);
    const [hobbies, setHobbies] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Get all hobbies
    async function getAllHobbies() {
        const response = await axios.get(`${api}/api/hobby`);
        getHobbies(response.data.data);
    }

    // Handle checkbox hobby toggle
    const toggleHobby = (id) => {
        if (hobbies.includes(id)) {
            setHobbies(hobbies.filter((h) => h !== id));
        } else {
            setHobbies([...hobbies, id]);
        }
    };

    // Handle dynamic phone input
    const handlePhoneChange = (index, value) => {
        const updated = [...phones];
        updated[index] = value;
        setPhones(updated);
    };

    const addPhoneField = () => setPhones([...phones, ""]);

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
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            navigate("/siswa");
        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data.errors || {});
                console.log(error.response.data.errors);
            }
        }
    };

    useEffect(() => {
        getAllHobbies();
    }, []);

    return (
        <FormInput onSubmit={storePost}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <FormInput.Label>Name</FormInput.Label>
                    <FormInput.Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                </div>

                <div>
                    <FormInput.Label>NISN</FormInput.Label>
                    <FormInput.Input type="number" value={nisn} onChange={(e) => setNisn(e.target.value)} />
                    {errors.nisn && <p className="text-red-500">{errors.nisn[0]}</p>}
                </div>

                <div>
                    <FormInput.Label>Select Hobby</FormInput.Label>
                    <FormInput.Checkbox>
                        {dataHobbies.map((h) => (
                            <FormInput.Checkbox.Item
                                key={h.id}
                                value={h.id}
                                checked={hobbies.includes(h.id)}
                                onChange={() => toggleHobby(h.id)}
                            >
                                {h.name}
                            </FormInput.Checkbox.Item>
                        ))}
                    </FormInput.Checkbox>
                    {errors.hobbies && <p className="text-red-500">{errors.hobbies[0]}</p>}
                </div>

                <div className="col-span-2">
                    <FormInput.Label>Phone Numbers</FormInput.Label>
                    {phones.map((phone, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <FormInput.Input
                                type="number"
                                value={phone}
                                onChange={(e) => handlePhoneChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addPhoneField} className="text-blue-500 mt-2">+ Add Phone</button>
                    {errors.phone_number && <p className="text-red-500">{errors.phone_number[0]}</p>}
                </div>
            </div>

            <div className="space-x-4 mt-12">
                <FormInput.SubmitButton>Create</FormInput.SubmitButton>
                <Link to="/siswa">
                    <FormInput.CancelButton>Cancel</FormInput.CancelButton>
                </Link>
            </div>
        </FormInput>
    );
}
