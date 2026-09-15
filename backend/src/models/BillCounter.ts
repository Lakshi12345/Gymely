import mongoose, { Schema } from "mongoose";

const billCounterSchema = new Schema(
    {
        gymId: {
            type: String,
            required: true,
            unique: true,
            index: true,
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

const BillCounter = mongoose.model("BillCounter", billCounterSchema);

export default BillCounter;
