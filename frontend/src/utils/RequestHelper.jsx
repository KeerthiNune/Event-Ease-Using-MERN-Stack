import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:'70px'
    },
    {
        name: "Reg No",
        selector: (row) => row.regNo,
        sortable: true,
         width:'120px'
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
         width:'130px'
    },
    {
        name: "Purpose",
        selector: (row) => row.purpose,
        sortable: true,
         width:'130px'
    },
    {
        name: "Department",
        selector: (row) => row.department,
        center:"true",
        width:'70px'
    },
    {
        name: "Days",
        selector: (row) => row.days,
        center:"true",
        width:'100px'
    },
    {
        name: "Status",
        selector: (row) => row.status,
        center:"true",
        width:'130px'
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:"true",
        width:'130px'
    },
]

export const RequestButtons = ({Id}) =>{
    const navigate = useNavigate();

    const handleDelete = async (id) =>{
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){
        try {
            const response = await axios.delete(`http://localhost:5000/api/request/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (response.data.success) {
                onDepartmentDelete()
            }
        } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } 
        }
    }
    }

    const handleView = (id) =>{
        navigate(`/admin-dashboard/requests/${id}`)
    }
    return(
        <div>
        <button className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600" 
        onClick={() => handleView(Id)}>View</button>
        <button className = "px-4 py-1 bg-red-600 text-white"
        onClick = {() => handleDelete(Id)}>Delete</button>
        </div>
    )
}