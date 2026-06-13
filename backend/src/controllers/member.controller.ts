import {addMembar, getMember, getBills, getInvoice} from "../services/member.service";
import {Request , Response} from "express";
import Transaction from "../models/Transaction";
export  const  memberAdd = async  (req: Request, res:Response)=>{
    try{
        const imageName = req.file?.filename || null;
        const response = await addMembar(req.user.email,{
            ...req.body,
            profile: imageName,
        });

        return res.status(200).json({
            status : true,
            message : "Member Added Successfully  Tue !",
            data : response
        })

    }catch (error: any){
        return res.status(400).json({
            status : false,
            error : error.message,
        })
    }
}


export  const memberAll = async (req : Request, res : Response)=>{
    try{
        const response = await getMember(req.user.email);
        return res.status(200).json({
            status : true,
            data : response
        })
    }catch (error : any){
        return res.status(400).json({
            status : false,
            error : error.message
        })
    }
}

export const getBillings = async (req : Request, res : Response)=>{
    try {
        const response  = await getBills(req.user.email);
        return res.status(200).json({
            status : true,
            data : response,
        })
    }catch (error : any){
        return res.status(400).json({
            status : false,
            error : error.message,
        })
    }
}

export  const viewBill =  async (req : Request, res : Response)=>{
   try {
       const {id} = req.params;
       const response = await getInvoice(req.user.email, id);
       return res.status(200).json({
           status : true,
           message : "Member Added Successfully  Tue !",
           data : response
       })
   }catch (error : any){
       return res.status(400).json({
           status : false,
           error : error.message,
       })
   }

}