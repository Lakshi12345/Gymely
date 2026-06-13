import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
    {
        name : {
            type: String,
            required : true,
            trim : true
        },
        type : {
            type: String,
            required : true,
            trim : true
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

const Service = mongoose.model(
    "Services",
    serviceSchema
);

export default Service;