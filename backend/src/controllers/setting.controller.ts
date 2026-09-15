import { Request, Response } from "express";
import { addOperator } from "../services/operator.service";
import {
    getGeneralSettings,
    staffRoleList,
    staffRoleAdd,
    staffRoleEdit,
    staffRoleDelete,
    updateBilling,
    updateGeneralSettingsService,
} from "../services/settings.service";

export const getSettings = async (req: Request, res: Response) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const settings = await getAllSettings(email);

        return res.status(200).json({
            success: true,
            data: settings,
        });
    } catch (error: any) {
        console.error("Get settings error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to get settings",
        });
    }
};

export const getAllSettings = async (email: string) => {
    // const [user, business, staffRoles, expenseLabels, coupons, qrCodes] = await Promise.all([
    const [user, staffRoles] = await Promise.all([
        getGeneralSettings(email),
        // getBusinessSettings(email),
        staffRoleList(email),
        // getExpenseLabels(email),
        // getCoupons(email),
        // getQRCodes(email),
    ]);

    return {
        general: user,
        // branding: user?.data,
        // business,
        staffRoles,
        // expenseLabels,
        // cashbackCoupons: coupons,
        // qrCodes,
    };
};

export const getStaffRoles = async (req: Request, res: Response) => {
    try {
        const response = await staffRoleList(req.user.email);

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

export const addStaffRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const response = await staffRoleAdd(req.user.email, name);

        return res.status(200).json({
            status: true,
            message: "Staff role added successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const editStaffRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const response = await staffRoleEdit(id, req.user.email, name);

        return res.status(200).json({
            status: true,
            message: "Staff role updated successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const deleteStaffRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await staffRoleDelete(id, req.user.email);

        return res.status(200).json({
            status: true,
            message: "Staff role deleted successfully",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const updateBillingSettings = async (req: Request, res: Response) => {
    try {
        const response = await updateBilling(req.user.email, req.body);

        return res.status(200).json({
            success: true,
            message: "Billing settings updated successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

export const updateGeneralSettings = async (req: Request, res: Response) => {
    try {
        const response = await updateGeneralSettingsService(req.user.email, req.body);

        return res.status(200).json({
            success: true,
            message: "General settings updated successfully!",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};
