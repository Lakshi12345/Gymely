import mongoose, { Schema } from "mongoose";

const packageSchema = new Schema(
    {
        packageName : {
            type: String,
            required : true,
            trim : true
        },
        duration : {
            type: Number,
            required : true,

        },
        pType : {
            type : String,
            required : true,
            trim : true,
        },
        amount: {
            type : Number,
            required : true,
        },

        gymId: {
            type: String,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps : true,
    }
);

const Package = mongoose.model(
    "Packages",
    packageSchema
);

export default Package;