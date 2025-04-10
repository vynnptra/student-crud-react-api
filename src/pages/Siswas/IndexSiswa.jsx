import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

export default function IndexSiswa(){

    const columns = [
        { title: "Nisn", accessor: "nisn" },
        { title: "Name", accessor: "name" },
        { title: "Phones", accessor: "phones" },
        { title: "Hobbies", accessor: "hobbies" },
    ];

    const [siswa, setSiswa ] = useState([]);

    const api = "http://127.0.0.1:8000/api/siswa";

    async function getAllSiswas(){
        const response = await axios.get(api, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        });
        
        const siswa = response.data.data.map((s) => ({
            nisn: s.nisn && s.nisn.length != 0
            ? s.nisn.nisn 
            : '-', 
            name: s.name,
            phones: s.phone_numbers && s.phone_numbers.length > 0
            ? s.phone_numbers
            .filter(p => p.phone_number) 
            .map(p => p.phone_number)
            .join(', ')
            : '-',

            hobbies: s.hobbies && s.hobbies.length > 0 
            ? s.hobbies.filter(h => h.name).map(h => h.name).join(',')
            : '-',
        }))
        setSiswa(siswa);

        // console.log(response.data.data)
        
    }

    console.log(siswa)
    useEffect( () => {getAllSiswas()}, [])
    

    return (
        <div>
            
            <Table
            data = {siswa}
            columns = {columns}
            create = "/siswa/create"
            
            />
        </div>
    );
}