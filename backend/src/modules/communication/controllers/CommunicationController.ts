import { Request, Response } from "express";
import { CommunicationService } from "../services/CommunicationService";

const service = new CommunicationService();

export const sendTest = async (req: Request, res: Response) => {
    const response = await service.sendTemplate(req.body);

    res.json(response);
};
