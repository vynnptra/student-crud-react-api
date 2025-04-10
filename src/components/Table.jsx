import { Link } from "react-router-dom";

export default function Table({data, columns, create}){
	
    return (   

<div className="bg-white p-8 rounded-md w-10/12 ml-72">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Products Oder</h2>
			<span className="text-xs">All products item</span>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd" />
				</svg>
				<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
				<div className="lg:ml-40 ml-10 space-x-8">
		  			<Link to={create}>
						<div className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</div>
		  			</Link>
				</div>
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
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
							</tr>
						</thead>
						<tbody>
							{
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
									</tr>
									)
								)
							}
						</tbody>
					</table>
					<div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>
				</div>
			</div>
		</div>
		{console.log(data)}
	</div>
    )
}