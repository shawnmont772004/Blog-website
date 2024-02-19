import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const authSignup =async(req,res,next) =>{
    console.log(req.body);

    //res.json({message:"Hello world!"})

    const { username, email, password } = req.body;

    if(!username || !email || !password || username==="" || email==="" || password===""){
        //res.status(400).json({message:"All fields are required"});
        next(errorHandler(404,"All fields are required"))
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        userName:username,
        email,
        password:hashPassword
    }) 
    try{
        await newUser.save();
        res.json({message:"Signup successfully done"});
    }
    catch(error)
    {
        //res.status(500).json({message: error.message});
        next(error);

    }
}