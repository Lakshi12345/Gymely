import mongoose, { Schema } from "mongoose";

const transactionCounterSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        sequence: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const TransactionCounter = mongoose.model("TransactionCounter", transactionCounterSchema);

export default TransactionCounter;
