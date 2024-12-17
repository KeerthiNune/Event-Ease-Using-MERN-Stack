import Leaves from "../models/Request.js"
import Student from "../models/Student.js"


const addRequest = async (req,res) => {
    try{
        const {userId,fromDate,toDate,purpose,students} = req.body
        const student = await Student.findOne({userId})
    
        const newRequest = new Leaves({
            regNo : student._id,
            fromDate,
            toDate,
            purpose,
            students
        })
        console.log(newRequest)
        await newRequest.save()
        return res.status(200).json({success:true})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}


const getRequests = async (req,res) => {
    try{
        const requests = await Leaves.find().populate({
            path:"regNo",
            populate:[
                {
                    path:"department",
                    select:"dep_name"
                },

                {
                    path:"userId",
                    select:"name"
                }
            ]
        })
        console.log("requests",requests)
        return res.status(200).json({success:true,requests})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const getRequest = async (req,res) => {
    try{
        const {id} = req.params
        console.log(id)
        let request = await Leaves.find({regNo:id})
        console.log(request)
        if(request.length === 0){
            const student = await Student.findOne({userId: id})
            console.log(student)
            request = await Leaves.find({regNo : student._id})
        }
        console.log("leaves",request)
        return res.status(200).json({success:true,request})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const getRequestDetail = async (req,res) => {
    try{
        const {id} = req.params;
        const leave = await Leaves.findById({_id: id}).populate({
            path:"regNo",
            populate:[
                {
                    path:"department",
                    select:"dep_name"
                },

                {
                    path:"userId",
                    select:"name"
                }
            ]
        })
        console.log(leave)
        return res.status(200).json({success:true,leave})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const updateRequest = async (req,res) => {
    try{
        const {id} = req.params
        const leave = await Leaves.findByIdAndUpdate({_id: id}, {status : req.body.status})
        if(!leave){
            return res.status(404).json({success:false, error: "Request not founded"})
        }

        return res.status(200).json({success:true})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request update server error${error}`})
    }
}

const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Leaves.findById({_id:id})
        await request.deleteOne()
        return res.status(200).json({success:true,request})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: `Request delete server error ${error}` });
    }
};

export {addRequest,getRequest,getRequests, getRequestDetail,updateRequest,deleteRequest}