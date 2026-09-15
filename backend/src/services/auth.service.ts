import User from "../models/User";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import Operator from "../models/Operators";

const generateGymCode = async (): Promise<string> => {
    let gymcode = "";

    do {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);

        gymcode = `gmly${randomNumber}`;

        const existingGym = await User.findOne({ gymcode });

        if (!existingGym) {
            return gymcode;
        }
    } while (true);
};

export const registerUser = async (userData: any) => {
    const existingUsers = await User.findOne({ email: userData.email });

    if (existingUsers) {
        throw new Error("Email is already exist !");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const gymcode = await generateGymCode();

    const startDate = new Date();

    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + 7);

    const user = await User.create({
        ...userData,
        gymcode,
        password: hashedPassword,

        subscription: {
            planId: "",
            plan: "Trial",
            cost: 0,
            discount: 0,
            tax: 0,
            total: 0,
            payable: 0,
            startDate: startDate,
            expiryDate: expiryDate,
            status: "active",
        },
    });

    // Generate login token immediately
    const token = generateToken(
        user._id.toString(),
        user.email,
        user.name,
        user.branding?.gymLogo || "",
        user.subscription?.plan || "",
        user.subscription?.expiryDate || null
    );

    return {
        success: true,
        message: "Registration successful!",
        data: {
            user,
            token,
        },
    };
};

export const getUsers = async () => {
    const users = await User.find();
    return {
        success: true,
        message: "Data Fetch Successfully",
        data: users,
    };
};

export const userLoginOld = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    // const isValidPassword = password === user.data.password;
    console.log(password);
    if (!isValidPassword) {
        throw new Error("Invalid Credentials !");
    }

    const token = generateToken(
        user._id.toString(),
        user.email,
        user.name,
        user.branding?.gymLogo || "",
        user.subscription?.plan || "",
        user.subscription?.expiryDate || null
    );

    return {
        success: true,
        message: "Login Successfully !",
        data: {
            user,
            token,
        },
    };
};

export const userLogin = async (email: string, password: string) => {
    // =====================================================
    // 1. CHECK GYM OWNER / USER LOGIN
    // =====================================================

    const user = await User.findOne({ email });

    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error("Invalid Credentials !");
        }

        const token = generateToken(
            user._id.toString(),
            user.email,
            user.name,
            "owner",
            user.branding?.gymLogo || "",
            user.subscription?.plan || "",
            user.subscription?.expiryDate || null
        );

        return {
            success: true,
            message: "Login Successfully !",
            data: {
                user,
                token,
                role: "user",
            },
        };
    }

    // =====================================================
    // 2. CHECK OPERATOR LOGIN
    // =====================================================

    const operator = await Operator.findOne({ email });

    if (!operator) {
        throw new Error("User not found");
    }

    // const isValidOperatorPassword = await bcrypt.compare(password, operator.password);
    const isValidOperatorPassword = password === operator.password;
    if (!isValidOperatorPassword) {
        throw new Error("Invalid Credentials !");
    }

    if (operator.status !== "active") {
        throw new Error("Operator account is inactive");
    }

    // =====================================================
    // 3. FIND THE GYM OWNER
    // =====================================================

    const gymUser = await User.findOne({
        email: operator.gymId,
    });

    if (!gymUser) {
        throw new Error("Gym account not found");
    }

    // =====================================================
    // 4. GENERATE TOKEN USING GYM USER DETAILS
    // =====================================================

    const token = generateToken(
        operator._id.toString(),
        gymUser.email,
        gymUser.name,
        operator.name,
        gymUser.branding?.gymLogo || "",
        gymUser.subscription?.plan || "",
        gymUser.subscription?.expiryDate || null
    );

    // =====================================================
    // 5. RETURN OPERATOR + GYM INFORMATION
    // =====================================================

    return {
        success: true,
        message: "Login Successfully !",
        data: {
            user: operator,
            gym: gymUser,
            token,
            role: "operator",
        },
    };
};

export const importGymoryxGym = async (oldGym: any) => {
    const existingGym = await User.findOne({
        $or: [{ email: oldGym.email }, { gymcode: oldGym.gymcode }],
    });

    if (existingGym) {
        throw new Error(`Gym already exists: ${oldGym.email}`);
    }

    const hashedPassword = await bcrypt.hash(oldGym.password, 10);

    const gymcode = await generateGymCode();

    const user = await User.create({
        name: oldGym.name || "",
        email: oldGym.email || "",
        mobile: oldGym.mobile || "",
        password: hashedPassword,

        gymcode,

        address: oldGym.address || "",
        geoAddress: oldGym.geoAddress || "",

        latitude: oldGym.geoLat != null ? Number(oldGym.geoLat) : null,

        longitude: oldGym.geoLng != null ? Number(oldGym.geoLng) : null,

        referralCode: oldGym.referralCode || "",

        branding: {
            gymLogo: oldGym.gympic || "",
            invoiceLogo: oldGym.rectgym || "",
            watermark: oldGym.watermarkgym || "",
            theme: oldGym.themestatus === "whiteTheme" ? "light" : "dark",
        },

        business: {
            gstNumber: oldGym.gymgstin || "",

            taxType: oldGym.TaxType || "none",

            taxPercentage: Number(oldGym.gymcgst || 0) + Number(oldGym.gymsgst || 0),

            showGST: String(oldGym.showGST || oldGym.showGst || "").toLowerCase() === "yes",

            currency: "INR",

            currencySymbol: "₹",
        },

        subscription: {
            planId: "",
            plan: "Trial",
            cost: 0,
            discount: 0,
            tax: 0,
            total: 0,
            payable: 0,
            startDate: new Date(),
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: "active",
        },

        credits: {
            sms: Number(oldGym.smsCredit || oldGym.orxsmscredits || 0),

            whatsapp: Number(oldGym.waCredit || 0),

            email: Number(oldGym.mailCredit || 0),
        },

        automation: {
            sms: Array.isArray(oldGym.SMSAutoSetup) ? oldGym.SMSAutoSetup : [],

            whatsapp: Array.isArray(oldGym.waAutoSetup) ? oldGym.waAutoSetup : [],

            email: Array.isArray(oldGym.emailAutoSetup) ? oldGym.emailAutoSetup : [],
        },

        features: {
            whatsapp: Number(oldGym.waCredit || 0) > 0,

            sms: Number(oldGym.smsCredit || oldGym.orxsmscredits || 0) > 0,

            email: Number(oldGym.mailCredit || 0) > 0,

            faceAttendance: oldGym.faceAttendace === "enabled",

            biometricAttendance: oldGym.biometricAttendace === "enabled",

            digitalMarketing: Number(oldGym.digitalMarketing || 0) > 0,

            gymWebsite: oldGym.gymWebsite === "enabled",

            customerApp: oldGym.customerApp === "enabled",

            staffApp: oldGym.staffApp === "enabled",
        },

        status: "active",
    });

    return user;
};
