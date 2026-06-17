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

        minimumSalePercent : {
            type : Number,
        },

        services : [

            {

                name : {

                    type : String,

                    required : true

                },

                session : {

                    type : Number,

                    required : true

                }

            }

        ],

        amount: {
            type : Number,
            required : true,
        },

        isIncludeGst: {
            type : String,
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