import mongoose, { Schema } from "mongoose";

const gymCounterSchema = new Schema(
    {
        gymId: {
            type: String,
            required: true,
            unique: true,
        },

        memberUID: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const GymCounter = mongoose.model("GymCounter", gymCounterSchema);

export default GymCounter;
