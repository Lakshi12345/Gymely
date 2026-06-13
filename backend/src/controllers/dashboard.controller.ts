import {Request , Response} from "express";

export const packageAdd = async (req : Request, res : Response)=>{
    try {
        return res.json(req.body);
        // const {email, password}  = req.body;
        // const user   =  await userLogin(email, password);
        // return res.status(200).json(user);

    }catch (error : any){
        return res
            .status(400)
            .json({
                success: false,
                error: error.message,
            });
    }
}

