import { Request, Response } from "express";
import channelService from "../services/channel.service";

export const getChannel = async (req: Request, res: Response) => {
    const gymId = req.user.id;

    let channel = await channelService.getChannel(gymId);

    if (!channel) {
        channel = await channelService.createChannel(gymId);
    }

    return res.json({
        success: true,
        data: channel,
    });
};
