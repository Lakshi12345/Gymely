import mongoose, { Schema } from "mongoose";

const operatorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        permissions: {
            type: Map,
            of: Boolean,
            default: {},
        },

        salesTarget: {
            bonus: {
                type: Number,
                default: 0,
            },

            incentivePercent: {
                type: Number,
                default: 0,
            },

            revenueTarget: {
                type: Number,
                default: 0,
            },
        },

        gymId: {
            type: String,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Operator = mongoose.model("Operators", operatorSchema);

export default Operator;
