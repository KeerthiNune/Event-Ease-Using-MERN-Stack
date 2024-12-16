import Department from "../models/Department.js";
import Leaves from "../models/Request.js";
import Student from "../models/Student.js";

const getSummary = async (req,res)=>{
       try{
          const totalStudents = await Student.countDocuments();
          const totalDepartments = await Department.countDocuments();
          const studentsAppliedforRequest = await Leaves.distinct("regNo");
          const requestStatus = await Leaves.aggregate([
            {$group:{
                _id:"$status",
                count : {$sum : 1}
            }}
          ])

          const requestSummary = {
            appliedFor : studentsAppliedforRequest.length,
            approved : requestStatus.find(item => item._id === 'Approved')?.count || 0,
            pending : requestStatus.find(item => item._id === 'Pending')?.count || 0,
            rejected : requestStatus.find(item => item._id === 'Rejected')?.count || 0,

          }

          return res.status(200).json({success:true,totalStudents,totalDepartments,requestSummary})
       }catch(error){
            console.log(error.message)
            return res.status(500).json({success:false,error:'dashboard summary error'})

       }
}
export {getSummary};