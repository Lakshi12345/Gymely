import mongoose, { Schema } from "mongoose";

const leadFollowupSchema = new Schema(
    {
        gymId: String,

        leadName: String,

        mobile: String,

        email: String,

        location: String,

        purpose: String,

        leadId: String,

        status: String,

        leadRemark: String,

        nextFollowupDate: Date,
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Followup", leadFollowupSchema);
