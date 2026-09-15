import mongoose, { Schema } from "mongoose";

const staff = new Schema(
    {
        gymId: {
            type: String,
            required: true,
            index: true,
        },

        uid: {
            type: String,
            default: "",
            trim: true,
        },

        exitUID: {
            type: String,
            default: "",
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female"],
            default: "Male",
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            default: "",
            trim: true,
            lowercase: true,
        },

        joiningDate: {
            type: Date,
            default: null,
        },

        designation: {
            type: String,
            default: "",
            trim: true,
        },

        role: {
            type: String,
            default: "",
            trim: true,
        },

        experience: {
            type: String,
            default: "",
        },

        skills: {
            type: String,
            default: "",
        },

        aboutMe: {
            type: String,
            default: "",
        },

        showWebsite: {
            type: Boolean,
            default: false,
        },

        workingHours: {
            type: String,
            default: "",
        },

        paidLeave: {
            type: Number,
            default: 0,
        },

        basicSalary: {
            type: Number,
            default: 0,
        },

        overtime: {
            type: Number,
            default: 0,
        },

        lessTime: {
            type: Number,
            default: 0,
        },

        unpaidLeaveDeduction: {
            type: Number,
            default: 0,
        },

        workingDays: {
            type: [String],
            default: [],
        },

        session: {
            morning: {
                type: Boolean,
                default: true,
            },

            evening: {
                type: Boolean,
                default: true,
            },

            morningStart: {
                type: String,
                default: "",
            },

            morningEnd: {
                type: String,
                default: "",
            },

            eveningStart: {
                type: String,
                default: "",
            },

            eveningEnd: {
                type: String,
                default: "",
            },
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

const Staff = mongoose.model("Staff", staff);

export default Staff;
