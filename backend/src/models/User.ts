import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        gymName : {
            type: String,
            required : true,
            trim : true
        },
        email : {
            type: String,
            required : true,
            unique: true,
            lowercase : true,
            trim : true
        },
        mobile : {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        password: {
            type : String,
            required : true,
        },
    },
    {
        timestamps : true,
    }
);

const User = mongoose.model(
    "User",
    userSchema
);

export default User;