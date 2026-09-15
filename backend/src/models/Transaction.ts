import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        // Bill information
        transactionId: {
            type: Number,
            default: null,
        },

        // Member information
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

        // Gym
        gymId: {
            type: String,
            required: true,
            index: true,
        },

        // Bill information
        billNumber: {
            type: Number,
            default: null,
        },

        // Package information
        planName: {
            type: String,
            trim: true,
        },

        packageType: {
            type: String,
            default: null,
        },

        purpose: {
            type: String,
            default: null,
        },

        // Amount information
        registrationAmount: {
            type: Number,
            default: 0,
        },

        cost: {
            type: Number,
            required: true,
        },

        discount: {
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

        totalPayable: {
            type: Number,
            default: 0,
        },

        convenience: {
            type: Number,
            default: 0,
        },

        currentInstallment: {
            type: Number,
            default: 0,
        },

        paidAmount: {
            type: Number,
            default: 0,
        },

        pendingAmount: {
            type: Number,
            default: 0,
        },

        // Payment information
        paidByOnline: {
            type: Number,
            default: 0,
        },

        paidByCard: {
            type: Number,
            default: 0,
        },

        paidByCash: {
            type: Number,
            default: 0,
        },

        paidByCheque: {
            type: Number,
            default: 0,
        },

        taxType: {
            type: String,
            default: null,
        },

        // Transaction details
        cashTransactionId: {
            type: String,
            default: "",
        },

        onlineTransactionId: {
            type: String,
            default: "",
        },

        cardTransactionId: {
            type: String,
            default: "",
        },

        chequeTransactionId: {
            type: String,
            default: "",
        },
        paymentMethod: {
            type: String,
            default: "",
        },
        paymentReference: {
            type: String,
            default: "",
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

        billDate: {
            type: Date,
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

        gstNumber: {
            type: String,
            default: "",
        },

        stateCode: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
