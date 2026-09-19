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

/**
 * Convert Express route parameter to a guaranteed string.
 *
 * Express can type req.params values as:
 * string | string[]
 */
const getParamString = (
    value: string | string[] | undefined
): string => {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }

    return value ?? "";
};

/**
 * Get all settings
 */
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

/**
 * Get all settings data
 */
export const getAllSettings = async (email: string) => {
    const [user, staffRoles] = await Promise.all([
        getGeneralSettings(email),
        staffRoleList(email),
    ]);

    return {
        general: user,
        staffRoles,
    };
};

/**
 * Get staff roles
 */
export const getStaffRoles = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }

        const response = await staffRoleList(email);

        return res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error: any) {
        console.error("Get staff roles error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to get staff roles",
        });
    }
};

/**
 * Add staff role
 */
export const addStaffRole = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }

        const { name } = req.body;

        if (!name || !String(name).trim()) {
            return res.status(400).json({
                status: false,
                error: "Staff role name is required",
            });
        }

        const response = await staffRoleAdd(
            email,
            String(name).trim()
        );

        return res.status(200).json({
            status: true,
            message: "Staff role added successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Add staff role error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to add staff role",
        });
    }
};

/**
 * Edit staff role
 */
export const editStaffRole = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }

        const id = getParamString(req.params.id);
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Staff role ID is required",
            });
        }

        if (!name || !String(name).trim()) {
            return res.status(400).json({
                status: false,
                error: "Staff role name is required",
            });
        }

        const response = await staffRoleEdit(
            id,
            email,
            String(name).trim()
        );

        return res.status(200).json({
            status: true,
            message: "Staff role updated successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Edit staff role error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to update staff role",
        });
    }
};

/**
 * Delete staff role
 */
export const deleteStaffRole = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized",
            });
        }

        const id = getParamString(req.params.id);

        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Staff role ID is required",
            });
        }

        const response = await staffRoleDelete(
            id,
            email
        );

        return res.status(200).json({
            status: true,
            message: "Staff role deleted successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Delete staff role error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to delete staff role",
        });
    }
};

/**
 * Update billing settings
 */
export const updateBillingSettings = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized",
            });
        }

        const response = await updateBilling(
            email,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Billing settings updated successfully!",
            data: response,
        });
    } catch (error: any) {
        console.error("Update billing settings error:", error);

        return res.status(400).json({
            success: false,
            error: error.message || "Failed to update billing settings",
        });
    }
};

/**
 * Update general settings
 */
export const updateGeneralSettings = async (
    req: Request,
    res: Response
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized",
            });
        }

        const response = await updateGeneralSettingsService(
            email,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "General settings updated successfully!",
            data: response,
        });
    } catch (error: any) {
        console.error("Update general settings error:", error);

        return res.status(400).json({
            success: false,
            error: error.message || "Failed to update general settings",
        });
    }
};