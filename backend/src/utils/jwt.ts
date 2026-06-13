import jwt from "jsonwebtoken";

export  const generateToken = (userId : string, email : string)=>{
    // @ts-ignore

    console.log(
        "JWT SECRET:",
        process.env.JWT_ACCESS_SECRET
    );

    return jwt.sign({
        userId,
        email
    },
    process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn : "7d",
        }
    );
};