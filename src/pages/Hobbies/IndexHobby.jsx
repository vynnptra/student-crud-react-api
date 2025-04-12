import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

export default function IndexHobby(){

    const columns = [
        { title: "Name", accessor: "name", width:"w-[90%]"},
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
            create= 'create'
            read= 'read/'
            edit= 'edit/'
            del= 'http://127.0.0.1:8000/api/hobby/'
            deleteSuccess={getAllHobbies}
            
             />
        </>
    )
}