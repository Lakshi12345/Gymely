import Operator from "../models/Operators";

export const addOperator = async (gymId: string, operatorData: any) => {
    const data = {
        ...operatorData,
        gymId,
    };
    const response = await Operator.create([data]);
    return {
        data: response,
    };
};

export const operatorList = async (gym: string) => {
    return await Operator.find({ gymId: gym });
};

export const getOperatorSingle = async (id: string, gym: string) => {
    return await Operator.findOne({ _id: id, gymId: gym });
};

export const operatorEdit = async (id: string, gymId: string, operatorData: any) => {

    const operator = await Operator.findOneAndUpdate(
        {
            _id: id,
            gymId: gymId,
        },
        {
            $set: operatorData,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!operator) {
        throw new Error("Operator not found");
    }

    return operator;
};
