import mongoose, { Schema, Document } from "mongoose";

export interface ICommunicationChannel extends Document {
    gymId: mongoose.Types.ObjectId;

    channel: "whatsapp";

    provider: "meta";

    connected: boolean;

    businessName?: string;

    phoneNumber?: string;

    phoneNumberId?: string;

    businessAccountId?: string;

    wabaId?: string;

    accessToken?: string;
}

const communicationChannelSchema = new Schema<ICommunicationChannel>(
    {
        gymId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },

        channel: {
            type: String,
            default: "whatsapp",
            enum: ["whatsapp"],
        },

        provider: {
            type: String,
            default: "meta",
            enum: ["meta"],
        },

        connected: {
            type: Boolean,
            default: false,
        },

        businessName: String,

        phoneNumber: String,

        phoneNumberId: String,

        businessAccountId: String,

        wabaId: String,

        accessToken: String,
    },
    {
        timestamps: true,
    }
);

communicationChannelSchema.index(
    {
        gymId: 1,
        channel: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model<ICommunicationChannel>(
    "CommunicationChannel",
    communicationChannelSchema
);
