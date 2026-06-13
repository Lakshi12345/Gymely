import {Request , Response} from "express";
import {
    createPackage,
    getPackageSingle,
    packageDelete,
    packageGet,
    packageUpdate
} from "../services/package.service";


export const packageAdd = async (req : Request, res : Response)=>{
    try {
        // return res.json(req.user);
        // const {email, password}  = req.body;
        const user   =  await createPackage(req.body,req.user.email);
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

export  const  getPackage = async (req: Request, res:  Response)=>{
    try {
        const  packages = await packageGet(req.user.email);
        return res.status(200).json(packages);
    }catch (error:any){
        return res.json({
            status : false,
            message : error.response?.data,
        })
    }
}

export const deletePackage = async (req: Request, res: Response)=>{
    try{
        const {id} = req.params as any;
        const cursor  = await packageDelete(id, req.user.email);

        return res.status(200).json({
            success : true,
            message : "Data Delete successfully",
            data : cursor,
        })

    }catch (error : any){
        return res.json({
            status : false,
            message : error.message,
        })
    }
}

export const getSinglePackage  = async (req: Request, res:Response)=>{
    try {

        const {id} = req.params as any;
        const response = await getPackageSingle(id, req.user.email);
        return res.status(200).json({
            status : true,
            message : "Data Fetch Successfully !",
            data : response
        })

    }catch (error : any){
        return res.status(400).json({
            status : false,
            message : error.message
        })
    }
}

export const updatePackage = async (req: Request, res: Response)=>{
    try{
        const {id} = req.params as any;
        const response = await packageUpdate(id , req.user.email, req.body);
        return  res.status(200).json({
            status : true,
            message : "Data Fetched Successfully",
            data : response,
        })

    }catch (error : any){
        return res.status(400).json({
            status : false,
            error : error.response?.message,
        })
    }
}


