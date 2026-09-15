import { Request, Response } from "express";
import {
    addOperator,
    operatorList,
    getOperatorSingle,
    operatorEdit,
} from "../services/operator.service";
export const operatorAdd = async (req: Request, res: Response) => {
    try {
        console.log("USER:", req.user);
        console.log("BODY:", req.body);
        const response = await addOperator(req.user.email, req.body);
        return res.status(200).json({
            status: true,
            message: "Operator Added Successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const editOperator = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as any;
        const response = await operatorEdit(id, req.user.email, req.body);
        return res.status(200).json({
            status: true,
            message: "Operator Updated Successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const getOperator = async (req: Request, res: Response) => {
    try {
        const response = await operatorList(req.user.email);
        return res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const getSingleOperator = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as any;
        const response = await getOperatorSingle(id, req.user.email);

        return res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};
