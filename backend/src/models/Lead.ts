import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
    {
        gymId: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        gender: {
            type: String,
            default: "Male",
        },

        location: {
            type: String,
        },

        purpose: {
            type: String,
        },

        services: [String],

        source: {
            type: String,
        },

        nextAction: {
            type: String,
        },

        nextActionDate: {
            type: Date,
        },

        remark: {
            type: String,
        },

        status: {
            type: String,
            default: "New",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Lead", leadSchema);
