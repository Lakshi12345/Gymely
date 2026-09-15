import Staff from "../models/Staff";

export const addStaff = async (gymId: string, staffData: any) => {
    if (!staffData.name?.trim()) {
        throw new Error("Staff name is required");
    }

    if (!staffData.mobile?.trim()) {
        throw new Error("Mobile number is required");
    }

    if (staffData.uid) {
        const existing = await Staff.findOne({
            gymId,
            uid: staffData.uid,
        });

        if (existing) {
            throw new Error("Staff UID already exists");
        }
    }

    return await Staff.create({
        ...staffData,
        gymId,
    });
};

export const staffList = async (gymId: string) => {
    return await Staff.find({
        gymId,
    }).sort({
        createdAt: -1,
    });
};

export const getSingleStaff = async (id: string, gymId: string) => {
    const staff = await Staff.findOne({
        _id: id,
        gymId,
    });

    if (!staff) {
        throw new Error("Staff not found");
    }

    return staff;
};

export const editStaff = async (id: string, gymId: string, staffData: any) => {
    if (!staffData.name?.trim()) {
        throw new Error("Staff name is required");
    }

    if (!staffData.mobile?.trim()) {
        throw new Error("Mobile number is required");
    }

    const staff = await Staff.findOneAndUpdate(
        {
            _id: id,
            gymId,
        },
        {
            $set: staffData,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!staff) {
        throw new Error("Staff not found");
    }

    return staff;
};

export const deleteStaff = async (id: string, gymId: string) => {
    const staff = await Staff.findOneAndDelete({
        _id: id,
        gymId,
    });

    if (!staff) {
        throw new Error("Staff not found");
    }

    return staff;
};
