import {Request , Response} from "express";
import { registerSchema} from "../validators/auth.validators";
import {getUsers, registerUser, userLogin} from "../services/auth.service";

export const register = async (
    req : Request,
    res : Response
)=>{
    try {
        // Validate request body
        const validateData = registerSchema.parse(req.body);

        // send Validate Data to service
        const result = await registerUser(validateData);
        return res.status(201).json(result);

    }catch (error : any){
        return res.status(400).json({
            success : false,
            message : error.message,
        })
    }

}

export const fetchUsers = async (req : Request, res : Response)=>{
    try {
        const users  = await getUsers();

        return res.status(201).json(users);

    }catch (error : any){
        return res.status(501).json(
            {
                status : false,
                message : "Error Occurred",
                error : error.message
            }
        )
    }
}

export const loginUsers = async (req : Request, res : Response)=>{
    try {

        const {email, password}  = req.body;
        const user   =  await userLogin(email, password);
        return res.status(200).json(user);

    }catch (error : any){
        return res
            .status(400)
            .json({
                success: false,
                error: error.message,
            });
    }
}

export const profile  = async (req: Request, res: Response)=>{
    return res.status(200).json({
        success : true,
        message : "Protected Route Accessed",
    })
}