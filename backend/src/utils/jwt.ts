import jwt from "jsonwebtoken";

export const generateToken = (
    userId: string,
    email: string,
    name: string,
    user: string,
    gymLogo: string,
    plan: string,
    expiryDate: string
) => {
    // @ts-ignore

    console.log("JWT SECRET:", process.env.JWT_ACCESS_SECRET);

    return jwt.sign(
        {
            userId,
            email,
            name,
            user,
            gymLogo,
            plan,
            expiryDate,
        },
        process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: "7d",
        }
    );
};
