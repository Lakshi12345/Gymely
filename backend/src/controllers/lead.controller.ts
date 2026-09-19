import { Request, Response } from "express";
import {
    addLead,
    getleadprofile,
    leadDelete,
    leadFollowupAdd,
    leadFollowupReport,
    leadGet,
} from "../services/lead.service";

const getParamString = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }

    return value ?? "";
};

export const leadAdd = async (req: Request, res: Response) => {
    try {
        const response = await addLead(req.user.email, req.body);

        return res.status(200).json({
            status: true,
            message: "Lead Added Successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const getLead = async (req: Request, res: Response) => {
    try {
        const response = await leadGet(req.user.email);

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

export const getLeadProfile = async (req: Request, res: Response) => {
    try {
        const leadId = getParamString(req.params.id);

        if (!leadId) {
            return res.status(400).json({
                status: false,
                error: "Lead ID is required",
            });
        }

        const response = await getleadprofile(req.user.email, leadId);

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

export const deleteLead = async (req: Request, res: Response) => {
    try {
        const leadId = getParamString(req.params.id);

        if (!leadId) {
            return res.status(400).json({
                status: false,
                error: "Lead ID is required",
            });
        }

        const response = await leadDelete(req.user.email, leadId);

        return res.status(200).json({
            status: true,
            message: "Lead Deleted Successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const addLeadFollowup = async (req: Request, res: Response) => {
    try {
        const response = await leadFollowupAdd(req.user.email, req.body);

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

export const getLeadFollowupReport = async (
    req: Request,
    res: Response
) => {
    try {
        const response = await leadFollowupReport(
            req.user.email,
            req.body.startDate,
            req.body.endDate
        );

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