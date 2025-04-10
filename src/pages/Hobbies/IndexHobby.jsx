import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

export default function IndexHobby(){

    const columns = [
        { title: "Name", accessor: "name", width:"w-5/12"},
        { title: "Action", accessor: "action", width:"w-1/12"},
    ]
    const [hobby, setHobby] = useState([]);

    const api = "http://127.0.0.1:8000/api/hobby";

    
    async function getAllHobbies() {
        const response = await axios.get(api, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
    });
        setHobby(response.data.data);
    }
    
    useEffect(() => {getAllHobbies()}, []);

    return (
        <>
            <Table
            data={hobby}
            columns={columns}
            create="/hobby/create"
             />
        </>
    )
}