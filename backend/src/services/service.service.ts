import Service from "../models/Service";
export const createService = async (packageData: any, gymId: string) => {
    const exitspackages = await Service.findOne({ name: packageData.name });

    if (exitspackages) {
        throw new Error("Service name is already exists !");
    }

    const formattedData = {
        name: packageData.name,
        type: packageData.type,
        gymId,
    };
    const packages = await Service.create(formattedData);
    return {
        success: true,
        message: "Service Created Successfully",
        data: packages,
    };
};

export const getServices = async (gym: string) => {
    const packages = await Service.find({ gymId: gym });
    return {
        success: true,
        data: packages,
    };
};

export const serviceDelete = async (id: string, gymId: string) => {
    const existPackages = await Service.findOneAndDelete({ _id: id, gymId: gymId });

    if (!existPackages) {
        throw new Error("Service does not exist !");
    }
    return existPackages;
};
//
// export  const getPackageSingle = async (id:String, gymId : String)=>{
//
//     const result  = await Package.findOne({_id: id, gymId: gymId});
//     if(!result){
//         throw new Error("Package not found !");
//     }
//     return result;
// }
//
// export  const packageUpdate = async (id: String, gymId: String, packageData: any)=>{
//     const result = await Package.findOneAndUpdate({_id: id, gymId: gymId},{$set :{...packageData}},{new : true});
//     if(!result){
//         throw new Error("Package not Found !");
//     }
//
//     return result ;
// }
