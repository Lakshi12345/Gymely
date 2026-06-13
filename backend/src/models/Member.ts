import mongoose, {Schema} from "mongoose";

const memberSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        trim : true,

    },
    mobile : {
        type: Number,
        required : true,
        trim : true ,
    },
    email : {
        type: String,
        trim : true ,
    },
    profile: {
        type: String,
        default: null,
    },
    gender : {
        type : String,
    },
    gymId : {
        type : String,
    },

},
    {
        timestamps : true,
    }

);

const Member = mongoose.model(
    "Members",
    memberSchema
);

export default Member;