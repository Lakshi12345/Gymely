import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        UID: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        profile: {
            type: String,
            default: null,
        },

        gender: {
            type: String,
            trim: true,
        },

        gymId: {
            type: String,
            required: true,
            index: true,
        },

        referralCode: {
            type: String,
            default: null,
        },

        location: {
            type: String,
            default: "",
        },

        registrationAmount: {
            type: Number,
            default: 0,
        },

        joinedTime: {
            type: Date,
            default: null,
        },

        birthTime: {
            type: Date,
            default: null,
        },

        workoutGroupId: {
            type: Number,
            default: null,
        },

        workoutGroupName: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            default: null,
        },

        bioDevices: {
            type: [String],
            default: [],
        },

        gstNumber: {
            type: String,
            default: "",
        },

        stateCode: {
            type: String,
            default: "",
        },

        additionalMobile: {
            type: String,
            default: "",
        },

        emergencyName: {
            type: String,
            default: "",
        },

        occupation: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.model("Members", memberSchema);

export default Member;
