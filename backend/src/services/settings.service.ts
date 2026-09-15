import User from "../models/User";
import StaffRole from "../models/StaffRole";
import Operator from "../models/Operators";
// import BusinessSettings from "../models/BusinessSettings";
// import StaffRole from "../models/StaffRole";
// import ExpenseLabel from "../models/ExpenseLabel";
// import CashbackCoupon from "../models/CashbackCoupon";
// import QRCode from "../models/QRCode";

/**
 * General + Branding
 */
export const getGeneralSettings = async (email: string) => {
    const user = await User.findOne({
        email,
    }).lean();

    if (!user) {
        throw new Error("User not found");
    }

    return {
        gymcode: user.gymcode,

        name: user.name,

        email: user.email,

        mobile: user.mobile,

        ownerName: user.ownerName,

        website: user.website,

        address: user.address || "",

        geoAddress: user.geoAddress || "",

        latitude: user.latitude ?? null,

        longitude: user.longitude ?? null,

        branding: {
            gymLogo: user.branding?.gymLogo || "",

            invoiceLogo: user.branding?.invoiceLogo || "",

            watermark: user.branding?.watermark || "",

            theme: user.branding?.theme || "light",

            gstNumber: user.business?.gstNumber || "",

            taxType: user.business?.taxType || "",

            taxPercentage: user.business?.taxPercentage || 18,

            invoiceTerm: user.business?.invoiceTerm || "",

            showGST: user.business?.showGST || "",
        },
    };
};

/**
 * Business Settings
 */
// export const getBusinessSettings = async (email: string) => {
//     const settings = await BusinessSettings.findOne({
//         email,
//     }).lean();
//
//     return settings || {};
// };

/**
 * Staff Roles
 */
// export const getStaffRoles = async (email: string) => {
//     return await StaffRole.find({
//         email,
//     }).lean();
// };

/**
 * Expense Labels
 */
// export const getExpenseLabels = async (email: string) => {
//     return await ExpenseLabel.find({
//         email,
//     }).lean();
// };

/**
 * Cashback / Coupons
 */
// export const getCoupons = async (email: string) => {
//     return await CashbackCoupon.find({
//         email,
//     }).lean();
// };

/**
 * QR Codes
 */
// export const getQRCodes = async (email: string) => {
//     return await QRCode.find({
//         email,
//     }).lean();
// };

export const staffRoleList = async (gymId: string) => {
    return await StaffRole.find({
        gymId,
    }).sort({
        createdAt: -1,
    });
};

export const staffRoleAdd = async (gymId: string, name: string) => {
    if (!name?.trim()) {
        throw new Error("Role name is required");
    }

    const existingRole = await StaffRole.findOne({
        gymId,
        name: name.trim(),
    });

    if (existingRole) {
        throw new Error("Staff role already exists");
    }

    const role = await StaffRole.create({
        gymId,
        name: name.trim(),
    });

    return role;
};

export const staffRoleEdit = async (id: string, gymId: string, name: string) => {
    if (!name?.trim()) {
        throw new Error("Role name is required");
    }
    const role = await StaffRole.findOneAndUpdate(
        {
            _id: id,
            gymId,
        },
        {
            $set: {
                name: name.trim(),
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!role) {
        throw new Error("Staff role not found");
    }

    return role;
};

export const staffRoleDelete = async (id: string, gymId: string) => {
    const role = await StaffRole.findOneAndDelete({
        _id: id,
        gymId,
    });

    if (!role) {
        throw new Error("Staff role not found");
    }

    return role;
};

export const updateBilling = async (email: string, data: any) => {
    const user = await User.findOneAndUpdate(
        { email },
        {
            $set: {
                "business.gstNumber": data.gstNumber || "",
                "business.taxType": data.taxType || "none",
                "business.taxPercentage":
                    Math.round((Number(data.cgst || 0) + Number(data.sgst || 0)) * 100) / 100,
                "business.showGST": data.showGST ?? false,
                "business.invoiceTerm": data.invoiceTerm || "",
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!user) {
        throw new Error("Gym not found");
    }

    return user;
};

export const updateGeneralSettingsService = async (email: string, data: any) => {
    const user = await User.findOneAndUpdate(
        { email },
        {
            $set: {
                name: data.name,
                gymcode: data.gymcode,
                mobile: data.mobile,
                email: data.email,
                address: data.address || "",
                ownerName: data.ownerName || "",
                website: data.website || "",
            },
        },
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    if (!user) {
        throw new Error("User not found");
    }

    console.log("UPDATED:", {
        ownerName: user.ownerName,
        website: user.website,
    });

    return user;
};
