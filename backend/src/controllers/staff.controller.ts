import { Request, Response } from "express";

import {
    addStaff,
    staffList,
    getSingleStaff,
    editStaff,
    deleteStaff,
} from "../services/staff.service";

/**
 * Convert Express route parameter to a string.
 *
 * Express can type route parameters as:
 * string | string[] | undefined
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
 * Add Staff
 */
export const staffAdd = async (
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

        const response = await addStaff(
            email,
            req.body
        );

        return res.status(200).json({
            status: true,
            message: "Staff added successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Add staff error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to add staff",
        });
    }
};

/**
 * Get Staff List
 */
export const getStaff = async (
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

        const response = await staffList(email);

        return res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error: any) {
        console.error("Get staff list error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to get staff list",
        });
    }
};

/**
 * Get Single Staff
 */
export const getStaffSingle = async (
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
                error: "Staff ID is required",
            });
        }

        const response = await getSingleStaff(
            id,
            email
        );

        return res.status(200).json({
            status: true,
            data: response,
        });
    } catch (error: any) {
        console.error("Get single staff error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to get staff",
        });
    }
};

/**
 * Edit Staff
 */
export const staffEdit = async (
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
                error: "Staff ID is required",
            });
        }

        const response = await editStaff(
            id,
            email,
            req.body
        );

        return res.status(200).json({
            status: true,
            message: "Staff updated successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Edit staff error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to update staff",
        });
    }
};

/**
 * Delete Staff
 */
export const staffDelete = async (
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
                error: "Staff ID is required",
            });
        }

        const response = await deleteStaff(
            id,
            email
        );

        return res.status(200).json({
            status: true,
            message: "Staff deleted successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Delete staff error:", error);

        return res.status(400).json({
            status: false,
            error: error.message || "Failed to delete staff",
        });
    }
};