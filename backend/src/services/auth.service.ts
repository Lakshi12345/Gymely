
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

export const registerUser = async (userData : any)=>{

    const existingUsers = await User.findOne({email: userData.email,});

    if(existingUsers){
        throw new Error("Email is already exist !");
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,10
    );

    const user = await User.create({
        ...userData,
        password : hashedPassword,
    });

    return{
        success : true,
        message : "User Registered Successfully !",
        data : user
    };
};




export const getUsers = async ()=>{
    const users = await User.find();
    return {
        success : true,
        message : "Data Fetch Successfully",
        data : users,
    };
}


export const userLogin = async (email:string, password:string)=>{
    const user  = await User.findOne({email});

    if(!user){
        throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);


    if(!isValidPassword){
        throw new Error("Invalid Credentials !");
    }

    const token = generateToken(user._id.toString(), user.email);

    return {
        success : true,
        message : "Login Successfully !",
        data: {
            user,
            token,
        }
    };
};