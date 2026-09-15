import mongoose, { Schema } from "mongoose";

const staffRoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        gymId: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const StaffRole = mongoose.model("StaffRole", staffRoleSchema);

export default StaffRole;
