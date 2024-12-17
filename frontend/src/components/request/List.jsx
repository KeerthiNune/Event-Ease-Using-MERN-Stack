import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import { useAuth } from "../../context/authContext";

const List = () => {

    const [requests, setRequests] = useState([])
    const {user} = useAuth()
    const {id} = useParams()

    const fetchRequests = async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/request/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            })
            console.log(response.data)
            if(response.data.success){
                setRequests(response.data.request)
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    const deleteRequest = async (requestId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/request/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                alert("Request deleted successfully");
                fetchRequests(); // Refresh the list after deletion
            }
        } catch (error) {
            console.log(error.message);
            alert("Failed to delete the request");
        }
    };
    

    useEffect(() => {
        fetchRequests();
    },[])
    if(!requests){
        return <div>Loading...</div>
    }
    console.log(requests)

    return(
        <div className = "p-6">
            <div className="text-center">
                    <h3 className="text-2xl font-bold">Manage Requests</h3>
            </div>
            <div className="flex justify-between items-center">
                        <input type="text" 
                        placeholder="Search by Dep Name" 
                        className="px-4 py-0.5 border" />
                        {user?.role === "Student" && (
                        <Link to="/student-dashboard/add-request"
                         className="px-4 py-1 bg-teal-600 text-white rounded no-underline"
                         >
                            Add New Request
                        </Link>
                        )}
            </div>

                    <table className = "w-full text-sm text-left text-gray-500">
                        <thead className = "text-xs text-gray-700 uppercase  border border-gray-200">
                            <tr>
                                <th className = "px-6 py-3">S No</th>
                                <th className = "px-6 py-3">From</th>
                                <th className = "px-6 py-3">To</th>
                                <th className = "px-6 py-3">Purpose</th>
                                <th className = "px-6 py-3">Students List</th>
                                <th className = "px-6 py-3">Applied Date</th>
                                <th className = "px-6 py-3">Status</th>
                                <th className = "px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request,index) => (
                            <tr key = {request._id} className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className = "px-6 py-3">{index+1}</td>
                                <td className = "px-6 py-3">{new Date(request.fromDate).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{new Date(request.toDate).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{request.purpose}</td>
                                <td className="px-6 py-3">
                                        {request.students.map((student, idx) => (
                                            <div key={idx}>
                                                {student.name} ({student.regNo})
                                            </div>
                                        ))}
                                    </td>
                                <td className = "px-6 py-3">{new Date(request.appliedAt).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{request.status}</td>
                                <td className="px-6 py-3">
                                    {user?.role === "Student" && (
                                        <button
                                            onClick={() => deleteRequest(request._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    )
}
export default List;