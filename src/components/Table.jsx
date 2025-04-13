import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Table({data, columns, create, edit, read, del, deleteSuccess, title, subtitle}){
	
	// const del = (id)
	const {token} = useContext(AppContext);

	const deleteData = async (id) => {
		try {
			await axios.delete(`${del}${id}`, {
				headers: {
				  'Authorization': `Bearer ${token}`
				}
			  });
			deleteSuccess()
		} catch (error) {
			console.log(error)
		}
	}
	
    return (   

<div className="bg-white p-8 rounded-md w-10/12 ml-72">

	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">{title}</h2>
			<span className="text-xs">{subtitle}</span>
		</div>
		<div className="flex items-center justify-between">
				<div className="lg:ml-40 ml-10 space-x-8">
		  			<Link to={create}>
						<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
		  			</Link>
				</div>
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg ">
					<table className="min-w-full leading-normal">
						<thead>
							<tr className="w-full">
							{
								columns.map((column, index) => (
									<th
										key={index}
										className={` px-5 py-3 ${column.width || ""} border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider `}>
										{column.title}
									</th>
									)
								)
							}
							<th className={` px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider `}>Action</th>
							</tr>
						</thead>
						<tbody>

							{
								data.length > 0 ? 
								data.map((item, i) => (
									<tr key={i}>
										{columns.map((column, j) => (
												<td className="px-5 py-5 bg-white text-sm" key={j}>
													<div className="flex items-center">
															<div className="ml-3">
																<p className="text-gray-900 whitespace-no-wrap">
																	{item[column.accessor]}
																</p>
															</div>
														</div>
												</td>											
										)
									)
								}
												<td className="flex gap-4 mr-5">
														<Link to={read  + item.id}>
															<div className=" mt-2   rounded z-10 group">   
															<div href="#" className="group-hover:text-blue-500">
																show
															</div>
																<div className="py-1">
																	<hr className="w-6 group-hover:border-[1px]  duration-150 ease-in-out group-hover:border-blue-500"></hr>
																</div>
															</div>
														</Link>
														<Link to={edit  + item.id}>
															<div className=" mt-2   rounded z-10 group">   
															<div href="#" className="group-hover:text-green-500">
																Edit
															</div>
																<div className="py-1">
																	<hr className="w-6 group-hover:border-[1px]  duration-150 ease-in-out group-hover:border-green-500"></hr>
																</div>
															</div>
														</Link>
															<div className=" mt-2   rounded z-10 group">   
															<button href="#" className="group-hover:text-red-500" onClick={ () => {deleteData(item.id)}}>
																Delete
															</button>
																<div className="py-1">
																	<hr className="w-6 group-hover:border-[1px]  duration-150 ease-in-out group-hover:border-red-500"></hr>
																</div>
															</div>
												</td>
								</tr>
								)
								)
								: 
								<tr className="h-96">
									<td colSpan="100%" >
										<p className="text-center font-semibold text-md">Empty</p>
										<p className="text-sm text-center">create data to fill in data</p>
									</td>
								</tr>
								}

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
    )
}