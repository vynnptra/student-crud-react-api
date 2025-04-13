import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { Link, useParams } from "react-router";

export default function ReadSiswa(){

    const [siswa, setSiswa ] = useState([]);
    const {token} = useContext(AppContext);

    const {id} = useParams();

    const api = `http://127.0.0.1:8000/api/siswa/${id}`;
    

    async function getSiswa(){
        const response = await axios.get(api, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        });
        
        console.log(response)
        
        const siswa = response.data.data;

        const parsedSiswa = {
            id: siswa.id,
            name: siswa.name,
            nisn: siswa.nisn && siswa.nisn.length !== 0 ? siswa.nisn.nisn : '-',
            phones: siswa.phone_numbers && siswa.phone_numbers.length > 0
                ? siswa.phone_numbers.filter(p => p.phone_number).map(p => p.phone_number).join(', ')
                : '-',
            hobbies: siswa.hobbies && siswa.hobbies.length > 0
                ? siswa.hobbies.filter(h => h.name).map(h => h.name).join(', ')
                : '-',
            created_at: siswa.created_at,
            updated_at: siswa.updated_at
        };
        
        setSiswa(parsedSiswa);
    }

    useEffect( () => {getSiswa()}, [])
    

    return (
          <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
        
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-7">{siswa.name}</h3>
                  <ul className="text-sm font-extralight">
                    <li>
                        nisn: {siswa.nisn}
                    </li>
                    <li>
                        hobbies: {siswa.hobbies}
                    </li>
                    <li>
                        phone number: {siswa.phones}
                    </li>

                    <li className="mt-5 font-extralight text-sm">
                        Created at: {new Date(siswa.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </li>
                    <li>
                        Updated at: {new Date(siswa.updated_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </li>
                    </ul>
                    <Link to="/siswa" >
                    <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mt-10">Back</button>
                    </Link>
                </div>
              </div>
        
            </div>
          </div>
    );
}