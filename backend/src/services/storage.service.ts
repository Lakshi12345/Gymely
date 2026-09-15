import User from "../models/User";

export const updateBranding = async (gymId: string, type: string, url: string) => {
    console.log("Updating branding:", {
        gymId,
        type,
        url,
    });

    const updateData = {
        [type]: url,
    };

    const gym = await User.findOneAndUpdate(
        { email: gymId },
        {
            $set: {
                [`branding.${type}`]: url,
            },
        },
        {
            returnDocument: "after",
        }
    );

    console.log("Updated gym:", gym);

    if (!gym) {
        throw new Error("Gym settings not found");
    }

    return gym;
};
