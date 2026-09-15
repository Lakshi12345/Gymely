import {
    addMembar,
    getAllMemberService,
    getInvoice,
    dumpData,
    getTransactionsAll,
    getMembershipsAll,
    getMemberById,
    renewMember,
    importMembersFromCSV,
    getAllTransactionsService,
} from "../services/member.service";
import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import crypto from "crypto";
import { uploadFile } from "../modules/storage/s3.service";

export const memberAdd = async (req: Request, res: Response) => {
    try {
        let profileUrl = null;
        // console.log(JSON.stringify(JSON.parse(req.body.data), null, 2));
        // return;
        // Upload profile picture
        if (req.file) {
            console.log("File exist");
            const uploaded = await uploadmemberPic(req.file);
            profileUrl = uploaded?.url || null;
        }

        console.log("Profile URL:", profileUrl);

        // Parse multipart data
        const data = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body.data;

        // Put profile inside data
        data.profile = profileUrl;

        // console.log("Final member data:", data);

        const response = await addMembar(req.user.email, {
            data,
        });

        return res.status(200).json({
            status: true,
            message: "Member Added Successfully",
            data: response,
        });
    } catch (error: any) {
        console.error("Member Add Error:", error);

        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const uploadmemberPic = async (file: Express.Multer.File) => {
    if (!file) {
        return null;
    }

    const fileName = crypto.randomBytes(16).toString("hex");

    const key = `images/members/${fileName}.jpeg`;

    const result = await uploadFile({
        key,
        body: file.buffer,
        contentType: file.mimetype,
    });

    return {
        key,
        url: result.url,
    };
};

export const getAllMember = async (req: Request, res: Response) => {
    try {
        const gymId = req.user?.email;

        if (!gymId) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized. Gym ID not found",
            });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await getAllMemberService(gymId, {
            page,
            limit,
            filter: req.query.filter as string,
            search: req.query.search as string,
            packageName: req.query.packageName as string,
            trainer: req.query.trainer as string,
            status: req.query.status as string,
        });

        return res.status(200).json({
            status: true,
            data: result.data,
            pagination: result.pagination,
            statistics: result.statistics,
        });
    } catch (error: any) {
        console.error("Get members error:", error);

        return res.status(500).json({
            status: false,
            error: error?.message || "Failed to fetch members",
        });
    }
};

export const getAllTransactionsold = async (req: Request, res: Response) => {
    try {
        const gymId = req.user.email;

        const transactions = await getTransactionsAll(gymId);

        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            data: transactions,
        });
    } catch (error: any) {
        console.error("Get Transactions Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch transactions",
            data: [],
        });
    }
};

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        // -----------------------------------------
        // GYM ID
        // -----------------------------------------

        const gymId = req.user?.email;

        if (!gymId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Gym ID not found.",
            });
        }

        // -----------------------------------------
        // GET TRANSACTIONS
        // -----------------------------------------

        const result = await getAllTransactionsService(gymId, {
            page: req.query.page as string,
            limit: req.query.limit as string,

            startDate: req.query.startDate as string,

            endDate: req.query.endDate as string,

            receiptType: req.query.receiptType as string,

            taxType: req.query.taxType as string,

            soldBy: req.query.soldBy as string,

            generatedBy: req.query.generatedBy as string,

            search: req.query.search as string,

            dateFilter: req.query.dateFilter as string,
        });

        // -----------------------------------------
        // RESPONSE
        // -----------------------------------------

        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",

            data: result.data,

            pagination: result.pagination,

            statistics: result.statistics,
        });
    } catch (error: any) {
        console.error("Get Transactions Error:", error);

        return res.status(500).json({
            success: false,
            message: error?.message || "Failed to fetch transactions",
        });
    }
};

export const getAllMemberships = async (req: Request, res: Response) => {
    try {
        const gymId = req.user.email;

        const memberships = await getMembershipsAll(gymId);

        return res.status(200).json({
            success: true,
            message: "Memberships fetched successfully",
            data: memberships,
        });
    } catch (error: any) {
        console.error("Get memberships error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch memberships",
            data: [],
        });
    }
};

export const viewBill = async (req: Request, res: Response) => {
    const invoiceUrl = `${req.protocol}://${req.get("host")}/uploads/invoices/${req.user.email}.pdf`;

    try {
        const { id } = req.params as any;
        const response = await getInvoice(req.user.email, id);
        return res.status(200).json({
            status: true,
            message: "Bill Generated Successfully !",
            additional: response,
            data: {
                invoicePath: invoiceUrl,
            },
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const checkData = async (req: Request, res: Response) => {
    try {
        // const { id } = req.params as any;
        const gymData = req.body.data || req.body;
        const response = await dumpData(gymData);
        return res.status(200).json({
            status: true,
            message: "Member Added Successfully !",
            data: response,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

export const memberView = async (req: Request, res: Response) => {
    try {
        const gymId = req.user.email;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Member ID is required",
            });
        }

        const member = await getMemberById(gymId, id);

        return res.status(200).json({
            status: true,
            data: member,
        });
    } catch (error: any) {
        console.error("Get member details error:", error);

        return res.status(500).json({
            status: false,
            error: error.message || "Failed to fetch member",
        });
    }
};

export const renewMemberController = async (req: Request, res: Response) => {
    try {
        const gymId = (req as any).user?.email;

        if (!gymId) {
            return res.status(401).json({
                status: false,
                error: "Gym ID is required",
            });
        }

        const result = await renewMember(gymId, req.body);

        return res.status(200).json({
            status: true,
            message: "Membership renewed successfully",
            data: result.membership,
            transaction: result.transaction,
            billing: result.billing,
        });
    } catch (error: any) {
        console.error("Renew member controller error:", error);

        return res.status(500).json({
            status: false,
            error: error?.message || "Failed to renew membership",
        });
    }
};

export const importMembersCSV = async (req: any, res: any) => {
    try {
        const gymId = req.user?.email;
        if (!gymId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Gym ID not found.",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "CSV file is required.",
            });
        }

        const file = req.file;

        const result = await importMembersFromCSV(gymId, file.buffer);

        return res.status(200).json({
            success: true,
            message: "Members imported successfully.",
            data: result,
        });
    } catch (error: any) {
        console.error("CSV Import Error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Failed to import members.",
        });
    }
};
