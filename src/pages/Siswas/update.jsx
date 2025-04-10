import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateSiswa() {
  const api = "http://127.0.0.1:8000";

  const [dataHobbies, setDataHobbies] = useState([]);
  const [name, setName] = useState("");
  const [nisn, setNisn] = useState("");
  const [phones, setPhones] = useState([""]);
  const [hobbies, setHobbies] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAllHobbies();
  }, []);

  // Fetch hobbies from backend
  const getAllHobbies = async () => {
    try {
      const response = await axios.get(`${api}/api/hobby`);
      setDataHobbies(response.data.data);
    } catch (error) {
      console.error("Failed to fetch hobbies", error);
    }
  };

  // Toggle checkbox hobby selection
  const toggleHobby = (id) => {
    if (hobbies.includes(id)) {
      setHobbies(hobbies.filter((h) => h !== id));
    } else {
      setHobbies([...hobbies, id]);
    }
  };

  // Handle change in specific phone input
  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = value;
    setPhones(updatedPhones);
  };

  const addPhoneField = () => {
    setPhones([...phones, ""]);
  };

  // Submit handler
  const storePost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/api/siswa`, {
        name,
        nisn,
        phone_number: phones,
        hobbies,
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log(response.data);
      navigate("/siswa");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <FormInput onSubmit={storePost}>
      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <FormInput.Label>Name</FormInput.Label>
          <FormInput.Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>

        {/* NISN */}
        <div>
          <FormInput.Label>NISN</FormInput.Label>
          <FormInput.Input
            type="number"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
          />
          {errors.nisn && <p className="text-red-500">{errors.nisn[0]}</p>}
        </div>

        {/* Hobbies */}
        <div className="col-span-2">
          <FormInput.Label>Select Hobbies</FormInput.Label>
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

        {/* Phone Numbers */}
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
          <button
            type="button"
            onClick={addPhoneField}
            className="text-blue-600 mt-2"
          >
            + Add Another Phone
          </button>
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number[0]}</p>
          )}
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
