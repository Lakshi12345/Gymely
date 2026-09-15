import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validators";
import { getUsers, importGymoryxGym, registerUser, userLogin } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        // Validate request body
        const validateData = registerSchema.parse(req.body);

        // send Validate Data to service
        const result = await registerUser(validateData);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(201).json(users);
    } catch (error: any) {
        return res.status(501).json({
            status: false,
            message: "Error Occurred",
            error: error.message,
        });
    }
};

export const loginUsers = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userLogin(email, password);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

export const profile = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Protected Route Accessed",
    });
};

export const importGym = async (req: Request, res: Response) => {
    try {
        console.log("IMPORT GYM API HIT");
        console.log("BODY:", req.body);

        const oldGym = req.body;
        const result = await importGymoryxGym(oldGym);

        return res.status(200).json({
            success: true,
            message: "Import API working",
            data: req.body,
        });
    } catch (error: any) {
        console.error("Import gym error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Import failed",
        });
    }
};
export const importGymold = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const oldGym = req.body;

        // const result = await importGymoryxGym(oldGym);
        //
        // return res.status(201).json({
        //     success: true,
        //     message: "Gym imported successfully",
        //     data: result,
        // });
    } catch (error: any) {
        console.error("Gym import error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Gym import failed",
        });
    }
};
