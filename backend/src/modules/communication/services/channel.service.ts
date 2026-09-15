import CommunicationChannel from "../models/CommunicationChannel";

class ChannelService {
    async getChannel(gymId: string) {
        return await CommunicationChannel.findOne({
            gymId,
            channel: "whatsapp",
        });
    }

    async createChannel(gymId: string) {
        return await CommunicationChannel.create({
            gymId,
            channel: "whatsapp",
            provider: "meta",
            connected: false,
        });
    }
}

export default new ChannelService();
