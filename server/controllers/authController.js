import jwt  from 'jsonwebtoken';
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const login = async (req,res) =>{
         try{
           const {regNo,password} = req.body;
           const user = await User.findOne({regNo})
           if(!user){
            return res.status(404).json({success:false,error:"user not found"})
           }

           const isMatch = await bcrypt.compare(password,user.password)
           if(!isMatch){
            return res.status(404).json({success:false,error:"Wrong Password"})
           }

           const token = jwt.sign({_id:user._id,role:user.role},
            process.env.JWT_KEY,{expiresIn:"10d"}
           )

           res.status(200).json({success:true,token,user:{_id:user._id,regNo:user.regNo,role:user.role},
        });

         }  catch(error){
            res.status(500).json({success:false,error:error.message})
         }

}
const verify = (req,res) => {
   return res.status(200).json({success:true,user:req.user})
}
export {login, verify};