import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AppContext } from "../../Context/AppContext";

export default function ReadHobby() {

    const {id} = useParams();

    const {token} = useContext(AppContext);

    const [hobby, setHobby] = useState([]);

    const getHobby = async () => {
        try {
            
            const res = await axios.get(`http://127.0.0.1:8000/api/hobby/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
        });

        setHobby(res.data.data[0]);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHobby();
    }, []);

    return (
        <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{hobby.name}</h3>
                <div className="mt-3 text-sm">
                    <ul className="text-sm font-extralight">
                    <li>
                        Created at: {new Date(hobby.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </li>
                    <li>
                        Updated at: {new Date(hobby.updated_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </li>
                    </ul>
                    <Link to="/hobby" >
                    <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mt-10">Back</button>
                    </Link>
                </div>
                </div>
            </div>

            </div>
        </div>
    )
}