import Package from "../models/Package";
export const createPackage = async (packageData: any, gymId: string) => {
    const exitspackages = await Package.findOne({
        packageName: packageData.packageName,
        gymId,
    });

    if (exitspackages) {
        throw new Error("Package name is already exists !");
    }

    const formattedData = {
        packageName: packageData.packageName,

        duration: Number(packageData.duration),

        amount: Number(packageData.amount),

        services: packageData.services,

        packageType: packageData.packageType,

        minimumSalePercent: packageData.minimumSalePercent,

        isIncludeGst: packageData.isIncludeGst,

        gymId,
    };

    const packages = await Package.create(formattedData);

    return {
        success: true,
        message: "Package Created Successfully",
        data: packages,
    };
};

export const packageGet = async (gym: string) => {
    const packages = await Package.find({ gymId: gym });

    const data = packages.map((pkg) => ({
        ...pkg.toObject(),
        taxIncluded: pkg.isIncludeGst === "YES",
    }));

    return {
        success: true,
        data: data,
    };
};

export const packageDelete = async (id: string, gymId: string) => {
    const existPackages = await Package.findOneAndDelete({ _id: id, gymId: gymId });

    if (!existPackages) {
        throw new Error("Packages does not exist !");
    }
    return existPackages;
};

export const getPackageSingle = async (id: string, gymId: string) => {
    const result = await Package.findOne({ _id: id, gymId: gymId });
    if (!result) {
        throw new Error("Package not found !");
    }
    return result;
};

export const packageUpdate = async (id: string, gymId: string, packageData: any) => {
    const result = await Package.findOneAndUpdate(
        { _id: id, gymId: gymId },
        { $set: { ...packageData } },
        { new: true }
    );
    if (!result) {
        throw new Error("Package not Found !");
    }

    return result;
};
