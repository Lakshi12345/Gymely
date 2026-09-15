import { Request, Response } from "express";

import {
    addStaff,
    staffList,
    getSingleStaff,
    editStaff,
    deleteStaff,
} from "../services/staff.service";

export const staffAdd = async (req: Request, res: Response) => {
    try {
        const response = await addStaff(req.user.email, req.body);

        return res.status(200).json({
            status: true,
            message: "Staff added successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const getStaff = async (req: Request, res: Response) => {
    try {
        const response = await staffList(req.user.email);

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

export const getStaffSingle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await getSingleStaff(id, req.user.email);

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

export const staffEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await editStaff(id, req.user.email, req.body);

        return res.status(200).json({
            status: true,
            message: "Staff updated successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const staffDelete = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await deleteStaff(id, req.user.email);

        return res.status(200).json({
            status: true,
            message: "Staff deleted successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};
