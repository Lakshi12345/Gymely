import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        // ---------------- Authentication ----------------

        gymcode: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },

        loginId: {
            type: String,
            default: "",
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        // ---------------- Gym Address ----------------

        address: {
            type: String,
            default: "",
        },

        geoAddress: {
            type: String,
            default: "",
        },

        latitude: {
            type: Number,
            default: null,
        },

        longitude: {
            type: Number,
            default: null,
        },

        // ---------------- Gym ----------------

        referralCode: {
            type: String,
            default: "",
            index: true,
        },

        // ---------------- Branding ----------------

        branding: {
            gymLogo: {
                type: String,
                default: "",
            },

            invoiceLogo: {
                type: String,
                default: "",
            },

            watermark: {
                type: String,
                default: "",
            },

            theme: {
                type: String,
                default: "light",
            },
        },

        // ---------------- Business ----------------

        business: {
            gstNumber: {
                type: String,
                default: "",
            },

            taxType: {
                type: String,
                enum: ["none", "GST", "VAT"],
                default: "none",
            },

            taxPercentage: {
                type: Number,
                default: 0,
            },

            currency: {
                type: String,
                default: "INR",
            },

            showGST: {
                type: Boolean,
                default: "No",
            },
            invoiceTerm: {
                type: String,
                default: null,
            },

            currencySymbol: {
                type: String,
                default: "₹",
            },
        },

        // ---------------- Subscription ----------------

        subscription: {
            planId: {
                type: String,
                default: "",
            },

            plan: {
                type: String,
                default: "",
            },

            cost: {
                type: Number,
                default: 0,
            },

            discount: {
                type: Number,
                default: 0,
            },

            tax: {
                type: Number,
                default: 0,
            },

            total: {
                type: Number,
                default: 0,
            },

            payable: {
                type: Number,
                default: 0,
            },

            startDate: {
                type: Date,
                default: null,
            },

            expiryDate: {
                type: Date,
                default: null,
            },

            status: {
                type: String,
                enum: ["active", "expired", "cancelled", "pending"],
                default: "active",
            },
        },

        // ---------------- Features ----------------

        features: {
            whatsapp: {
                type: Boolean,
                default: false,
            },

            sms: {
                type: Boolean,
                default: false,
            },

            email: {
                type: Boolean,
                default: false,
            },

            faceAttendance: {
                type: Boolean,
                default: false,
            },

            biometricAttendance: {
                type: Boolean,
                default: false,
            },

            digitalMarketing: {
                type: Boolean,
                default: false,
            },

            gymWebsite: {
                type: Boolean,
                default: false,
            },

            customerApp: {
                type: Boolean,
                default: false,
            },

            staffApp: {
                type: Boolean,
                default: false,
            },
        },

        // ---------------- Credits ----------------

        credits: {
            sms: {
                type: Number,
                default: 0,
            },

            whatsapp: {
                type: Number,
                default: 0,
            },

            email: {
                type: Number,
                default: 0,
            },
        },

        // ---------------- Automation ----------------

        automation: {
            sms: {
                type: [String],
                default: [],
            },

            whatsapp: {
                type: [String],
                default: [],
            },

            email: {
                type: [String],
                default: [],
            },
        },

        // ---------------- Status ----------------

        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active",
            index: true,
        },

        lastLogin: {
            type: Date,
            default: null,
        },

        ownerName: {
            type: String,
            default: "",
            trim: true,
        },

        website: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
