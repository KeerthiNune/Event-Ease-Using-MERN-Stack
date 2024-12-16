import mongoose from "mongoose";
import Student from "./Student.js";
import Leaves from "./Request.js";


const departmentSchema = new mongoose.Schema({
    dep_name : {type: String, required:true},
    dep_id:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
departmentSchema.pre("deleteOne",{document:true,query:false},async function(next){
    try{
        const students = await Student.find({department:this._id})
        const stuIds = students.map(stu => stu._id)

        await Student.deleteMany({department:this._id})
        await Leaves.deleteMany({regNo:{$in:stuIds}})
        next()
    } catch(error){
            next(error)
    }
})
const Department = mongoose.model("Department",departmentSchema)

export default Department;