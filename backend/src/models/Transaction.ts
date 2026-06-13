import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,

    },
    mobile : {
        type: Number,
        required : true,
        trim : true ,
    },
    planName : {
        type: String,
        trim : true ,
    },
        cost : {
        type: Number,
        required : true ,
    },
        discount : {
        type: Number,
    },
        totalAmount : {
        type: Number,
    },
        currentInstallment : {
            type: Number,
        },
        remaining : {
            type: Number,
        },
        online : {
            type: Number,
        },
        cash : {
            type: Number,
        },
        cheque : {
            type: Number,
        },
        startDate : {
            type: Date,
        },
        expiryDate : {
            type: Date,
        },
        paymentDate : {
            type: Date,
        },
        nextPaymentDate : {
            type: Date,
        },
        gymId : {
            type : String,
        },
    },

    {
        timestamps : true,
    }

);

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);

export default Transaction;