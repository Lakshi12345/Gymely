import mongoose, { Schema } from "mongoose";

const membershipsSchema = new Schema(
    {
        // Member
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

        UID: {
            type: Number,
            required: true,
            index: true,
        },

        gymId: {
            type: String,
            required: true,
            index: true,
        },

        billNumber: {
            type: Number,
            default: null,
        },
        planName: {
            type: String,
            trim: true,
            default: null,
        },
        packageType: {
            type: String,
            default: null,
        },
        purpose: {
            type: String,
            default: null,
        },
        registrationAmount: {
            type: Number,
            default: 0,
        },
        cost: {
            type: Number,
            required: true,
        },
        totalPayable: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            default: 0,
        },
        taxAmount: {
            type: Number,
            default: 0,
        },
        convenience: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        remaining: {
            type: Number,
            default: 0,
        },

        taxType: {
            type: String,
            default: null,
        },

        // Membership dates
        startDate: {
            type: Date,
            default: null,
        },
        expiryDate: {
            type: Date,
            default: null,
        },
        paymentDate: {
            type: Date,
            default: null,
        },
        nextPaymentDate: {
            type: Date,
            default: null,
        },

        updateTime: {
            type: Date,
            default: null,
        },
        // Sessions
        totalSessions: {
            type: Number,
            default: 0,
        },

        pendingSessions: {
            type: Number,
            default: 0,
        },

        completedSessions: {
            type: Number,
            default: 0,
        },

        // Services
        services: [
            {
                name: {
                    type: String,
                    trim: true,
                },

                sessions: {
                    type: Number,
                    default: 0,
                },
            },
        ],

        // Group
        workoutgroup: {
            type: String,
            default: null,
        },

        // Staff
        assignedTrainer: {
            type: String,
            default: null,
        },

        soldBy: {
            type: String,
            default: null,
        },

        operator: {
            type: String,
            default: null,
        },

        remarks: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Memberships = mongoose.model("Memberships", membershipsSchema);

export default Memberships;
