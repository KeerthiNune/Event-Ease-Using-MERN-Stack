import connectToDatabase from './db/db.js'
import User from './models/User.js'
import bcrypt from 'bcrypt'


const userRegister = async () =>{
    connectToDatabase()
    try{
        const hashPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name:"Admin",
            regNo:"CS100",
            password: hashPassword,
            role:"admin"
        })
        await newUser.save()
    }
    catch(error){
        console.log(error)
    }
}

userRegister();