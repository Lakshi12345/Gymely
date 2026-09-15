import GymCounter from "../models/GymCounter";
import Member from "../models/Member";
import Memberships from "../models/Memberships";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { generateInvoice } from "../utils/invoiceGenerator";
import mongoose from "mongoose";
import TransactionCounter from "../models/TransactionCounter";
import BillCounter from "../models/BillCounter";
import { parse } from "csv-parse/sync";

export const addMembar = async (gymId: string, memberData: any) => {
    try {
        // PARSE DATA

        const data =
            typeof memberData.data === "string" ? JSON.parse(memberData.data) : memberData.data;

        const member = data.member;
        const packageData = data.package;
        const membership = data.membership;
        const payment = data.payment;

        // profile comes from multer/file handling
        // const profile = memberData.profile || null;
        const profile = data.profile;
        if (!member) {
            throw new Error("Member information is required");
        }

        if (!packageData) {
            throw new Error("Package information is required");
        }

        if (!membership) {
            throw new Error("Membership information is required");
        }

        if (!payment) {
            throw new Error("Payment information is required");
        }

        // CHECK DUPLICATE MEMBER

        const existingMember = await Member.findOne({
            gymId,
            mobile: String(member.mobile),
        });

        if (existingMember) {
            throw new Error(`Member with mobile ${member.mobile} already exists`);
        }

        // GENERATE MEMBER UID

        const counter = await GymCounter.findOneAndUpdate(
            { gymId },
            {
                $inc: {
                    memberUID: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!counter) {
            throw new Error("Unable to generate member UID");
        }

        const UID = counter.memberUID;

        // GENERATE BILL NUMBER

        const billCounter = await BillCounter.findOneAndUpdate(
            { gymId },
            {
                $inc: {
                    sequence: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!billCounter) {
            throw new Error("Unable to generate bill number");
        }

        const billNumber = billCounter.sequence;

        // GENERATE TRANSACTION ID

        const transactionCounter = await TransactionCounter.findOneAndUpdate(
            {
                name: "global_transaction",
            },
            {
                $inc: {
                    sequence: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!transactionCounter) {
            throw new Error("Unable to generate transaction ID");
        }

        const transactionId = transactionCounter.sequence;

        // PAYMENT CALCULATION

        const cost = Number(packageData.amount ?? 0);

        const discount = Number(payment.discount ?? 0);

        const convenience = Number(payment.convenienceFee ?? 0);

        const registrationAmount = Number(payment.registrationAmount ?? 0);

        const received = Number(payment.received ?? 0);

        const taxAmount = Number(payment.tax?.taxAmount ?? 0);

        const totalAmount = cost - discount;

        const totalPayable = totalAmount + registrationAmount + convenience + taxAmount;

        const paidAmount = received;

        const pendingAmount = Math.max(totalPayable - paidAmount, 0);

        // PAYMENT METHODS

        let paidByOnline = 0;
        let paidByCard = 0;
        let paidByCash = 0;
        let paidByCheque = 0;

        let paidByOnlineRef = "";
        let paidByCardRef = "";
        let paidByCashRef = "";
        let paidByChequeRef = "";

        let paymentMethod = "Unknown";
        let paymentReference = "";

        if (Array.isArray(payment.payments)) {
            for (const item of payment.payments) {
                const amount = Number(item.amount ?? 0);

                const method = String(item.method ?? "").toLowerCase();

                const reference = item.referenceNumber || "";

                switch (method) {
                    case "online":
                    case "upi":
                        paidByOnline += amount;

                        paidByOnlineRef = reference;

                        break;

                    case "card":
                        paidByCard += amount;

                        paidByCardRef = reference;

                        break;

                    case "cash":
                        paidByCash += amount;

                        paidByCashRef = reference;

                        break;

                    case "cheque":
                        paidByCheque += amount;

                        paidByChequeRef = reference;

                        break;
                }
            }

            // SINGLE PAYMENT

            if (payment.payments.length === 1) {
                paymentMethod = payment.payments[0].method || "Unknown";

                paymentReference = payment.payments[0].referenceNumber || "";
            }

            // MULTIPLE PAYMENTS

            if (payment.payments.length > 1) {
                paymentMethod = "Multiple";

                paymentReference = payment.payments
                    .map((item: any) => item.referenceNumber)
                    .filter(Boolean)
                    .join(", ");
            }
        }

        // TOTAL SESSIONS

        let totalSession = 0;

        if (Array.isArray(packageData.services)) {
            for (const item of packageData.services) {
                totalSession += Number(item.session ?? 0);
            }
        }

        // DATE HELPER

        const parseDate = (value: string | Date | number | undefined | null) => {
            if (!value) {
                return null;
            }

            if (typeof value === "number") {
                const date = new Date(value * 1000);

                return isNaN(date.getTime()) ? null : date;
            }

            const date = new Date(value);

            return isNaN(date.getTime()) ? null : date;
        };

        // CREATE MEMBER

        const resMember = await Member.create({
            name: member.name,

            UID: Number(UID),

            mobile: String(member.mobile),

            email: member.email || "",

            gender: member.gender || "",

            profile,

            birthTime: member.birthDate ? new Date(member.birthDate) : null,

            gymId,

            workoutGroupName: membership.workoutGroup || "",

            joinedTime: membership.enrollmentDate
                ? parseDate(membership.enrollmentDate)
                : new Date(),
        });

        // CREATE MEMBERSHIP

        const resMembership = await Memberships.create({
            name: member.name,

            mobile: String(member.mobile),

            UID: Number(UID),

            gymId,

            billNumber,

            planName: packageData.packageName || "",

            packageType: packageData.packageType || null,

            purpose: "Enrollment",

            registrationAmount,

            cost,

            totalPayable,

            totalAmount,

            taxAmount,

            convenience,

            discount,

            paidAmount,

            remaining: pendingAmount,

            taxType: payment.tax?.invoiceType || "Non Tax",

            startDate: parseDate(membership.startDate),

            expiryDate: parseDate(membership.expiryDate),

            paymentDate: parseDate(payment.paymentDate),

            nextPaymentDate: parseDate(payment.nextPaymentDate),

            updateTime: new Date(),

            totalSessions: totalSession,

            pendingSessions: totalSession,

            completedSessions: 0,

            services: (packageData.services || []).map((service: any) => ({
                name: service.name,

                sessions: Number(service.session || 0),

                type: service.type || "",
            })),

            workoutgroup: membership.workoutGroup || "",

            soldBy: payment.soldBy || null,

            operator: membership.operator || null,

            remarks: payment.remark || "",
        });

        // CREATE TRANSACTION

        const resTransaction = await Transaction.create({
            transactionId,

            name: member.name,

            mobile: String(member.mobile),

            UID: Number(UID),

            gymId,

            billNumber,

            planName: packageData.packageName || "",

            packageType: packageData.packageType || null,

            purpose: membership.purpose || "Enrollment",

            registrationAmount,

            cost,

            discount,

            totalAmount,

            taxAmount,

            totalPayable,

            convenience,

            currentInstallment: paidAmount,

            paidAmount,

            pendingAmount,

            paidByOnline,

            paidByCard,

            paidByCash,

            paidByCheque,

            taxType: payment.tax?.invoiceType || "Non Tax",

            cashTransactionId: paidByCashRef,

            onlineTransactionId: paidByOnlineRef,

            cardTransactionId: paidByCardRef,

            chequeTransactionId: paidByChequeRef,

            paymentMethod,

            paymentReference,

            startDate: parseDate(membership.startDate),

            expiryDate: parseDate(membership.expiryDate),

            paymentDate: parseDate(payment.paymentDate),

            nextPaymentDate: parseDate(payment.nextPaymentDate),

            billDate: new Date(),

            soldBy: payment.soldBy || null,

            operator: membership.operator || null,

            remarks: payment.remark || "",

            gstNumber: member.gstNumber || "",

            stateCode: member.stateCode || "",
        });

        // RETURN;

        return {
            success: true,

            member: resMember,

            membership: resMembership,

            transaction: resTransaction,

            billing: {
                billNumber,
                transactionId,

                cost,
                discount,

                registrationAmount,

                convenience,

                taxAmount,

                totalAmount,

                totalPayable,

                received: paidAmount,

                pending: pendingAmount,

                paymentMethod,
            },
        };
    } catch (error) {
        console.error("Add member error:", error);

        throw error;
    }
};

interface MemberFilters {
    page?: number | string;
    limit?: number | string;
    filter?: string;
    search?: string;
    packageName?: string;
    trainer?: string;
    status?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getStatus = (membership: any, now: Date) => {
    if (membership?.status === "FREEZE") return "FREEZE";

    const expiryDate = membership?.expiryDate ? new Date(membership.expiryDate) : null;

    if (!expiryDate || Number.isNaN(expiryDate.getTime())) {
        return "EXPIRED";
    }

    const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / DAY_MS);

    if (daysLeft < 0) return "EXPIRED";
    if (daysLeft <= 7) return "EXPIRING";

    return "ACTIVE";
};

const getDaysLeft = (membership: any, now: Date) => {
    if (!membership?.expiryDate) return 0;

    const expiryDate = new Date(membership.expiryDate);
    if (Number.isNaN(expiryDate.getTime())) return 0;

    return Math.ceil((expiryDate.getTime() - now.getTime()) / DAY_MS);
};

export const getAllMemberService = async (gymId: string, filters: MemberFilters = {}) => {
    const page = Math.max(Number(filters.page) || 1, 1);
    const limit = Math.min(Math.max(Number(filters.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const selectedFilter = String(filters.filter || "all").toLowerCase();
    const search = String(filters.search || "").trim();
    const packageName = String(filters.packageName || "").trim();
    const trainer = String(filters.trainer || "").trim();
    const explicitStatus = String(filters.status || "")
        .trim()
        .toUpperCase();

    const now = new Date();

    /*
    |--------------------------------------------------------------------------
    | Latest membership per member
    |--------------------------------------------------------------------------
    | Your existing code relates Member -> Memberships by mobile number.
    | Keep that relation here so the response remains compatible.
    */
    const latestMemberships = await Memberships.aggregate([
        { $match: { gymId } },
        { $sort: { createdAt: -1, _id: -1 } },
        {
            $group: {
                _id: "$mobile",
                membership: { $first: "$$ROOT" },
            },
        },
        { $replaceRoot: { newRoot: "$membership" } },
    ]).allowDiskUse(true);

    const membershipByMobile = new Map<string, any>();

    for (const membership of latestMemberships) {
        membershipByMobile.set(String(membership.mobile), membership);
    }

    /*
    |--------------------------------------------------------------------------
    | Build backend filter
    |--------------------------------------------------------------------------
    | Quick filters, package, trainer and status all resolve to member mobile
    | numbers. We intersect the conditions instead of letting one filter
    | overwrite another.
    */
    const mobileSets: Set<string>[] = [];

    if (packageName && packageName !== "All Packages") {
        mobileSets.push(
            new Set(
                latestMemberships
                    .filter((membership: any) => String(membership.planName || "") === packageName)
                    .map((membership: any) => String(membership.mobile))
            )
        );
    }

    if (trainer && trainer !== "All Trainers") {
        mobileSets.push(
            new Set(
                latestMemberships
                    .filter(
                        (membership: any) => String(membership.assignedTrainer || "") === trainer
                    )
                    .map((membership: any) => String(membership.mobile))
            )
        );
    }

    const quickStatus =
        selectedFilter === "active"
            ? "ACTIVE"
            : selectedFilter === "expiring"
              ? "EXPIRING"
              : selectedFilter === "expired"
                ? "EXPIRED"
                : selectedFilter === "freeze"
                  ? "FREEZE"
                  : "";

    const statusFilter = explicitStatus || quickStatus;

    if (statusFilter) {
        mobileSets.push(
            new Set(
                latestMemberships
                    .filter((membership: any) => getStatus(membership, now) === statusFilter)
                    .map((membership: any) => String(membership.mobile))
            )
        );
    }

    if (selectedFilter === "due") {
        mobileSets.push(
            new Set(
                latestMemberships
                    .filter((membership: any) => Number(membership.remaining ?? 0) > 0)
                    .map((membership: any) => String(membership.mobile))
            )
        );
    }

    const query: any = { gymId };

    if (search) {
        const regex = new RegExp(escapeRegex(search), "i");
        const searchNumber = Number(search);

        query.$or = [{ name: regex }, { mobile: regex }, { email: regex }];

        if (!Number.isNaN(searchNumber)) {
            query.$or.push({ UID: searchNumber });
        }
    }

    if (mobileSets.length > 0) {
        let allowedMobiles = Array.from(mobileSets[0]);

        for (let index = 1; index < mobileSets.length; index++) {
            const currentSet = mobileSets[index];
            allowedMobiles = allowedMobiles.filter((mobile) => currentSet.has(mobile));
        }

        query.mobile = { $in: allowedMobiles };
    }

    /*
    |--------------------------------------------------------------------------
    | Page data + filtered total
    |--------------------------------------------------------------------------
    */
    const [total, members] = await Promise.all([
        Member.countDocuments(query),
        Member.find(query).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).lean(),
    ]);

    const data = members.map((member: any) => {
        const membership = membershipByMobile.get(String(member.mobile));
        const status = getStatus(membership, now);
        const daysLeft = getDaysLeft(membership, now);
        const due = Number(membership?.remaining ?? 0);

        return {
            _id: member._id,
            uid: member.UID,
            photo: member.profile || "",
            name: member.name || "",
            mobile: member.mobile || "",
            email: member.email || "",
            packageName: membership?.planName || "No Package",
            trainer: membership?.assignedTrainer || member.trainer || "Not Assigned",
            attendance: Number(member.attendance ?? 0),
            totalAttendance: Number(member.totalAttendance ?? 0),
            due,
            expiryDate: formatDate(membership?.expiryDate),
            joinedDate: formatDate(member?.joinedTime || member?.createdAt),
            gymPoints: Number(member.gymPoints ?? 0),
            status,
            checkInToday: Boolean(member.checkInToday),
            daysLeft,
        };
    });

    /*
    |--------------------------------------------------------------------------
    | Global dashboard statistics
    |--------------------------------------------------------------------------
    | These are NOT affected by pagination and NOT affected by the selected
    | quick filter. This keeps the dashboard cards accurate.
    */
    let active = 0;
    let expiring = 0;
    let expired = 0;
    let freeze = 0;
    let dueMembers = 0;
    let totalDue = 0;
    let expiryThisMonth = 0;

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    for (const membership of latestMemberships) {
        const status = getStatus(membership, now);

        if (status === "ACTIVE") active++;
        else if (status === "EXPIRING") expiring++;
        else if (status === "EXPIRED") expired++;
        else if (status === "FREEZE") freeze++;

        const due = Number(membership.remaining ?? 0);
        if (due > 0) {
            dueMembers++;
            totalDue += due;
        }

        if (membership.expiryDate) {
            const expiry = new Date(membership.expiryDate);

            if (!Number.isNaN(expiry.getTime()) && expiry >= monthStart && expiry < monthEnd) {
                expiryThisMonth++;
            }
        }
    }

    const [allMemberCount, memberStats] = await Promise.all([
        Member.countDocuments({ gymId }),
        Member.aggregate([
            { $match: { gymId } },
            {
                $group: {
                    _id: null,
                    gymPoints: {
                        $sum: { $ifNull: ["$gymPoints", 0] },
                    },
                    todayCheckIn: {
                        $sum: {
                            $cond: [{ $eq: ["$checkInToday", true] }, 1, 0],
                        },
                    },
                },
            },
        ]),
    ]);

    const memberStat = memberStats[0] || {};
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
        statistics: {
            total: allMemberCount,
            active,
            expiring,
            expired,
            freeze,
            dueMembers,
            totalDue,
            todayCheckIn: Number(memberStat.todayCheckIn || 0),
            gymPoints: Number(memberStat.gymPoints || 0),
            expiryThisMonth,
        },
    };
};

const formatDate = (date: any) => {
    if (!date) return null;

    const d = new Date(date);

    if (isNaN(d.getTime())) return null;

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
};

export const getTransactionsAllold = async (gymId: string) => {
    const transactions = await Transaction.find({
        gymId,
    })
        .sort({
            createdAt: -1,
        })
        .lean();

    return transactions;
};

export const getInvoice = async (gymID: string, id: string) => {
    const bill = await Transaction.findOne({ gymId: gymID, _id: id }).lean();

    if (!bill) {
        throw new Error("Invoice Not Found");
    }
    const gymDetails = await User.findOne({ email: gymID }).lean();

    return await generateInvoice(bill, gymDetails);
};

export const dumpData = async (gym: any[]) => {
    if (!Array.isArray(gym)) {
        throw new Error("Invalid data format. Array expected.");
    }

    const operations = gym.map((item) => {
        const { _id, ...cleanData } = item;

        return {
            updateOne: {
                filter: {
                    gymcode: item.gymcode,
                },
                update: {
                    $set: {
                        email: item.email || "",
                        mobile: item.mobile || item.phone || "",
                        name: item.name || "",
                        data: cleanData,
                    },
                },
                upsert: true,
            },
        };
    });

    const result = await User.bulkWrite(operations);

    return {
        inserted: result.upsertedCount,
        modified: result.modifiedCount,
        matched: result.matchedCount,
    };
};

export const getMembershipsAll = async (gymId: string) => {
    const memberships = await Memberships.find({
        gymId,
    })
        .sort({ createdAt: -1 })
        .lean();

    const members = await Member.find({
        gymId,
    }).lean();

    const memberMap = new Map();

    members.forEach((member: any) => {
        memberMap.set(String(member.mobile), member);
    });

    const today = new Date();

    return memberships.map((membership: any) => {
        const member = memberMap.get(String(membership.mobile));

        const expiryDate = membership.expiryDate ? new Date(membership.expiryDate) : null;

        let status: "ACTIVE" | "EXPIRING" | "EXPIRED" = "EXPIRED";

        let daysLeft = 0;

        if (expiryDate) {
            const diff = expiryDate.getTime() - today.getTime();

            daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

            if (daysLeft < 0) {
                status = "EXPIRED";
            } else if (daysLeft <= 7) {
                status = "EXPIRING";
            } else {
                status = "ACTIVE";
            }
        }

        const amount = Number(membership.totalAmount ?? membership.cost ?? 0);

        const due = Number(membership.remaining ?? 0);

        const paid = Math.max(amount - due, 0);

        /*
         * Package/session information
         *
         * Your current Membership schema
         * does not contain sessions.
         */
        const sessions = Number(membership.sessions ?? 0);

        const completed = Number(membership.completed ?? 0);

        const pending = Math.max(sessions - completed, 0);

        return {
            _id: String(membership._id),

            billNo: membership.billNo || "",

            transactionId: membership.transactionId || "",

            uid: membership.UID || "",

            memberName: member?.name || membership.name || "",

            mobile: String(member?.mobile || membership.mobile || ""),

            packageName: membership.planName || "",

            service: membership.service || "Gym",

            trainer: member?.trainer || membership.trainer || "Not Assigned",

            amount,

            paid,

            due,

            sessions,

            completed,

            pending,

            startDate: membership.startDate || null,

            expiryDate: membership.expiryDate || null,

            paymentDate: membership.paymentDate || null,

            nextPaymentDate: membership.nextPaymentDate || null,

            status,

            daysLeft,
        };
    });
};

export const getMemberById = async (gymId: string, memberId: string) => {
    const member: any = await Member.findOne({
        _id: memberId,
        gymId,
    }).lean();

    if (!member) {
        throw new Error("Member not found");
    }

    // Get latest membership for this member
    const membership: any = await Memberships.findOne({
        gymId,
        UID: String(member.UID),
        packageType: "Base",
    })
        .sort({ createdAt: -1 })
        .lean();

    const today = new Date();

    const formatDate = (date: any) => {
        if (!date) return null;

        const d = new Date(date);

        if (isNaN(d.getTime())) return null;

        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(
            2,
            "0"
        )}/${d.getFullYear()}`;
    };

    const calculateAge = (birthDate: any) => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);

        if (isNaN(birth.getTime())) return null;

        let age = today.getFullYear() - birth.getFullYear();

        const month = today.getMonth() - birth.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const expiryDate = membership?.expiryDate ? new Date(membership.expiryDate) : null;

    let daysLeft = 0;
    let status = "EXPIRED";

    if (expiryDate) {
        const diff = expiryDate.getTime() - today.getTime();

        daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) {
            status = "EXPIRED";
        } else if (daysLeft <= 7) {
            status = "EXPIRING";
        } else {
            status = "ACTIVE";
        }
    }

    if (membership?.status === "FREEZE") {
        status = "FREEZE";
    }

    const amount = Number(membership?.totalAmount ?? membership?.cost ?? 0);

    const due = Number(membership?.remaining ?? 0);

    const paid = Math.max(amount - due, 0);

    const sessions = Number(membership?.sessions ?? 0);

    const completed = Number(membership?.completed ?? 0);

    const pending = Math.max(sessions - completed, 0);

    console.log(membership);
    return {
        _id: String(member._id),

        // ---------------- Member ----------------

        name: member.name || "",

        uid: member.UID || member.uid || "",

        mobile: String(member.mobile || ""),

        email: member.email || "",

        gender: member.gender || "",

        birthDate: formatDate(member.birthDate),

        age: calculateAge(member.birthDate),

        photo: member.profile ? `${process.env.AWS_CDN_URL}/${member.profile}` : "",

        occupation: member.occupation || "",

        address: member.address || "",

        emergencyNumber: member.emergencyNumber || "",

        emergencyName: member.emergencyName || "",

        // ---------------- Membership ----------------

        status,

        daysLeft,

        expiryIn: daysLeft,

        expiryDate: formatDate(membership?.expiryDate),

        joiningDate: formatDate(membership?.startDate || member.createdAt),

        activeMembership: membership?.planName || "No Package Name",

        membershipExpiry: formatDate(membership?.expiryDate),

        amountDue: due,

        advancePaid: paid,

        totalAmount: amount,

        paidAmount: paid,

        pendingAmount: due,

        sessions,

        completedSessions: completed,

        pendingSessions: pending,

        // ---------------- Member info ----------------

        trainer: member.trainer || membership?.trainer || "Not Assigned",

        personalTrainer: member.personalTrainer || member.trainer || "Not Assigned",

        memberOwner: member.memberOwner || "-",

        memberGroup: member.memberGroup || "Not Assigned",

        behaviourIndex: member.behaviourIndex || "Satisfactory",

        // ---------------- Health ----------------

        weight: member.weight ?? "Not Set",

        height: member.height ?? "Not Set",

        bmi: member.bmi ?? "Not Set",

        // ---------------- Workout ----------------

        workoutGroup: member.workoutGroup || "Not Assigned",

        todaysWorkout: member.todaysWorkout || "Not Assigned",

        // ---------------- Account ----------------

        referralCode: member.referralCode || "",

        gymPoint: Number(member.gymPoints ?? 0),

        extraLogin: Number(member.extraLogin ?? 0),

        pendingLogins: Number(member.pendingLogins ?? 0),

        totalBusinessPotential: Number(member.totalBusinessPotential ?? 0),

        lastLogin: formatDate(member.lastLogin),

        biometric: member.biometric ? "Registered" : "Not Registered",

        // ---------------- Documents ----------------

        aadhaarFront: member.aadhaarFront || "NA",

        aadhaarBack: member.aadhaarBack || "NA",

        otherDocuments: member.otherDocuments || "NA",

        // ---------------- Attendance ----------------

        attendance: Number(member.attendance ?? 0),

        totalAttendance: Number(member.totalAttendance ?? 0),

        checkInToday: Boolean(member.checkInToday),

        // ---------------- Payment ----------------

        amount,
        due,
        paid,
    };
};

export const renewMember = async (gymId: string, memberData: any) => {
    try {
        // PARSE DATA

        const data = typeof memberData === "string" ? JSON.parse(memberData) : memberData;

        const memberId = data.memberId;

        const memberDataFromRequest = data.member;
        const packageData = data.package;
        const membership = data.membership;
        const payment = data.payment;

        if (!memberId) {
            throw new Error("Member ID is required");
        }

        if (!packageData) {
            throw new Error("Package information is required");
        }

        if (!membership) {
            throw new Error("Membership information is required");
        }

        if (!payment) {
            throw new Error("Payment information is required");
        }

        // =========================================================
        // FIND EXISTING MEMBER
        // =========================================================

        const existingMember = await Member.findOne({
            _id: memberId,
            gymId,
        });

        if (!existingMember) {
            throw new Error("Member not found");
        }

        // =========================================================
        // KEEP EXISTING MEMBER DETAILS
        // =========================================================

        const memberName = existingMember.name || memberDataFromRequest?.name || "";

        const mobile = String(existingMember.mobile || memberDataFromRequest?.mobile || "");

        const email = existingMember.email || memberDataFromRequest?.email || "";

        const UID = Number(existingMember.UID);

        // =========================================================
        // GENERATE BILL NUMBER
        // =========================================================

        const billCounter = await BillCounter.findOneAndUpdate(
            { gymId },
            {
                $inc: {
                    sequence: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!billCounter) {
            throw new Error("Unable to generate bill number");
        }

        const billNumber = billCounter.sequence;

        // =========================================================
        // GENERATE TRANSACTION ID
        // =========================================================

        const transactionCounter = await TransactionCounter.findOneAndUpdate(
            {
                name: "global_transaction",
            },
            {
                $inc: {
                    sequence: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!transactionCounter) {
            throw new Error("Unable to generate transaction ID");
        }

        const transactionId = transactionCounter.sequence;

        // =========================================================
        // DATE HELPER
        // =========================================================

        const parseDate = (value: string | Date | number | undefined | null) => {
            if (!value) {
                return null;
            }

            if (typeof value === "number") {
                const date = new Date(value * 1000);

                return isNaN(date.getTime()) ? null : date;
            }

            const date = new Date(value);

            return isNaN(date.getTime()) ? null : date;
        };

        // =========================================================
        // PAYMENT CALCULATION
        // =========================================================

        const cost = Number(packageData.amount ?? 0);

        const discount = Math.max(Number(payment.discount ?? 0), 0);

        const convenience = Math.max(Number(payment.convenienceFee ?? 0), 0);

        const received = Math.max(Number(payment.received ?? 0), 0);

        // Registration amount intentionally removed
        const registrationAmount = 0;

        // =========================================================
        // TAX / BILLING
        // =========================================================

        const taxAmount = Math.max(Number(payment.tax?.taxAmount ?? 0), 0);

        const baseAmount = Math.max(Number(payment.tax?.baseAmount ?? 0), 0);

        const subTotal = Math.max(Number(payment.tax?.subTotal ?? 0), 0);

        const grandTotal = Math.max(Number(payment.tax?.grandTotal ?? 0), 0);

        /*
         * IMPORTANT:
         *
         * Use the same calculated grand total
         * that the Renew page displays.
         */

        const totalAmount = Math.max(subTotal, cost - discount, 0);

        const totalPayable = grandTotal;

        const paidAmount = received;

        const pendingAmount = Math.max(totalPayable - paidAmount, 0);

        // =========================================================
        // PAYMENT METHODS
        // =========================================================

        let paidByOnline = 0;
        let paidByCard = 0;
        let paidByCash = 0;
        let paidByCheque = 0;

        let paidByOnlineRef = "";
        let paidByCardRef = "";
        let paidByCashRef = "";
        let paidByChequeRef = "";

        let paymentMethod = "Unknown";
        let paymentReference = "";

        if (Array.isArray(payment.payments)) {
            for (const item of payment.payments) {
                const amount = Math.max(Number(item?.amount ?? 0), 0);

                const method = String(item?.method ?? "").toLowerCase();

                const reference = item?.referenceNumber || "";

                switch (method) {
                    case "online":
                    case "upi":
                        paidByOnline += amount;
                        paidByOnlineRef = reference;
                        break;

                    case "card":
                        paidByCard += amount;
                        paidByCardRef = reference;
                        break;

                    case "cash":
                        paidByCash += amount;
                        paidByCashRef = reference;
                        break;

                    case "cheque":
                        paidByCheque += amount;
                        paidByChequeRef = reference;
                        break;
                }
            }

            // SINGLE PAYMENT

            if (payment.payments.length === 1) {
                paymentMethod = payment.payments[0]?.method || "Unknown";

                paymentReference = payment.payments[0]?.referenceNumber || "";
            }

            // MULTIPLE PAYMENTS

            if (payment.payments.length > 1) {
                paymentMethod = "Multiple";

                paymentReference = payment.payments
                    .map((item: any) => item?.referenceNumber)
                    .filter(Boolean)
                    .join(", ");
            }
        }

        // =========================================================
        // TOTAL SESSIONS
        // =========================================================

        let totalSession = 0;

        if (Array.isArray(packageData.services)) {
            for (const item of packageData.services) {
                totalSession += Number(item?.session ?? 0);
            }
        }

        // =========================================================
        // UPDATE EXISTING MEMBER
        // =========================================================

        await Member.updateOne(
            {
                _id: existingMember._id,
                gymId,
            },
            {
                $set: {
                    workoutGroupName: existingMember.workoutGroupName || "",
                },
            }
        );

        // =========================================================
        // CREATE NEW MEMBERSHIP
        // =========================================================

        const resMembership = await Memberships.create({
            name: memberName,

            mobile,

            UID,

            gymId,

            billNumber,

            planName: packageData.packageName || "",

            packageType: packageData.packageType || null,

            purpose: "Renewal",

            registrationAmount: 0,

            cost,

            totalAmount,

            totalPayable,

            taxAmount,

            convenience,

            discount,

            paidAmount,

            remaining: pendingAmount,

            taxType: payment.tax?.invoiceType || "Non Tax",

            startDate: parseDate(membership.startDate),

            expiryDate: parseDate(membership.expiryDate),

            paymentDate: parseDate(payment.paymentDate),

            nextPaymentDate: parseDate(payment.nextPaymentDate),

            updateTime: new Date(),

            totalSessions: totalSession,

            pendingSessions: totalSession,

            completedSessions: 0,

            services: (packageData.services || []).map((service: any) => ({
                name: service.name,

                sessions: Number(service.session || 0),

                type: service.type || "",
            })),

            workoutgroup: membership.workoutGroup || "",

            soldBy: payment.soldBy || null,

            operator: membership.operator || null,

            remarks: payment.remark || "",
        });

        // =========================================================
        // CREATE TRANSACTION
        // =========================================================

        const resTransaction = await Transaction.create({
            transactionId,

            name: memberName,

            mobile,

            UID,

            gymId,

            billNumber,

            planName: packageData.packageName || "",

            packageType: packageData.packageType || null,

            purpose: "Renewal",

            registrationAmount: 0,

            cost,

            discount,

            totalAmount,

            taxAmount,

            totalPayable,

            convenience,

            currentInstallment: paidAmount,

            paidAmount,

            pendingAmount,

            paidByOnline,

            paidByCard,

            paidByCash,

            paidByCheque,

            taxType: payment.tax?.invoiceType || "Non Tax",

            cashTransactionId: paidByCashRef,

            onlineTransactionId: paidByOnlineRef,

            cardTransactionId: paidByCardRef,

            chequeTransactionId: paidByChequeRef,

            paymentMethod,

            paymentReference,

            startDate: parseDate(membership.startDate),

            expiryDate: parseDate(membership.expiryDate),

            paymentDate: parseDate(payment.paymentDate),

            nextPaymentDate: parseDate(payment.nextPaymentDate),

            billDate: new Date(),

            soldBy: payment.soldBy || null,

            operator: membership.operator || null,

            remarks: payment.remark || "",

            gstNumber: memberDataFromRequest?.gstNumber || existingMember.gstNumber || "",

            stateCode: memberDataFromRequest?.stateCode || existingMember.stateCode || "",
        });

        // =========================================================
        // RETURN
        // =========================================================

        return {
            success: true,

            _id: String(resTransaction._id),

            member: existingMember,

            membership: resMembership,

            transaction: resTransaction,

            billing: {
                billNumber,

                transactionId,

                cost,

                discount,

                registrationAmount: 0,

                convenience,

                baseAmount,

                subTotal,

                taxAmount,

                totalAmount,

                totalPayable,

                grandTotal,

                received: paidAmount,

                pending: pendingAmount,

                paymentMethod,
            },
        };
    } catch (error) {
        console.error("Renew member error:", error);

        throw error;
    }
};

// helper funcitons

const normalizeMobile = (value: any): string => {
    return String(value || "")
        .replace(/\D/g, "")
        .trim();
};

const normalizeName = (value: any): string => {
    return String(value || "")
        .trim()
        .replace(/\s+/g, " ");
};

const toNumber = (value: any, defaultValue = 0): number => {
    const number = Number(
        String(value ?? "")
            .replace(/,/g, "")
            .trim()
    );

    return Number.isFinite(number) ? number : defaultValue;
};

const normalizeDate = (value: any): Date | null => {
    if (!value) return null;

    const valueString = String(value).trim();

    // YYYY-MM-DD
    const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;

    if (yyyyMmDd.test(valueString)) {
        const date = new Date(`${valueString}T00:00:00.000Z`);

        return Number.isNaN(date.getTime()) ? null : date;
    }

    // DD/MM/YYYY
    const ddMmYyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = valueString.match(ddMmYyyy);

    if (match) {
        const [, day, month, year] = match;

        const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

        return Number.isNaN(date.getTime()) ? null : date;
    }

    const date = new Date(valueString);

    return Number.isNaN(date.getTime()) ? null : date;
};

export const importMembersFromCSVold = async (gymId: string, fileBuffer: Buffer) => {
    try {
        const csvText = fileBuffer.toString("utf-8");
        const rows = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            bom: true,
        });

        if (!rows || rows.length === 0) {
            throw new Error("CSV file does not contain any member data.");
        }

        const requiredHeaders = [
            "Name",
            "Mobile",
            "PackageName",
            "PackageAmount",
            "StartDate",
            "ExpiryDate",
        ];

        const firstRow = rows[0];

        const missingHeaders = requiredHeaders.filter((header) => !(header in firstRow));

        if (missingHeaders.length > 0) {
            throw new Error(`Missing required CSV columns: ${missingHeaders.join(", ")}`);
        }

        const validRows: any[] = [];

        const errors: any[] = [];

        rows.forEach((row: any, index: number) => {
            const rowNumber = index + 2; // CSV header is row 1

            const name = normalizeName(row.Name);

            const mobile = normalizeMobile(row.Mobile);

            const packageName = String(row.PackageName || "").trim();

            const packageAmount = toNumber(row.PackageAmount);

            const startDate = normalizeDate(row.StartDate);

            const expiryDate = normalizeDate(row.ExpiryDate);

            const paymentDate = normalizeDate(row.PaymentDate);

            const rowErrors: string[] = [];

            // NAME

            if (!name) {
                rowErrors.push("Name is required");
            }

            // MOBILE

            if (!mobile) {
                rowErrors.push("Mobile is required");
            } else if (mobile.length < 10 || mobile.length > 15) {
                rowErrors.push("Invalid mobile number");
            }

            // PACKAGE

            if (!packageName) {
                rowErrors.push("PackageName is required");
            }

            // AMOUNT

            if (packageAmount < 0) {
                rowErrors.push("PackageAmount cannot be negative");
            }

            // DATES

            if (!startDate) {
                rowErrors.push("Valid StartDate is required");
            }

            if (!expiryDate) {
                rowErrors.push("Valid ExpiryDate is required");
            }

            if (startDate && expiryDate && expiryDate.getTime() < startDate.getTime()) {
                rowErrors.push("ExpiryDate cannot be before StartDate");
            }

            // PAYMENT DATE

            if (!paymentDate) {
                rowErrors.push("Valid PaymentDate is required");
            }

            // If row has errors

            if (rowErrors.length > 0) {
                errors.push({
                    row: rowNumber,
                    name,
                    mobile,
                    errors: rowErrors,
                });

                return;
            }

            // Valid normalized row

            validRows.push({
                row: rowNumber,

                uid: row.UID ? String(row.UID).trim() : "",

                name,

                mobile,

                email: String(row.Email || "").trim(),

                gender: String(row.Gender || "").trim(),

                birthDate: normalizeDate(row.BirthDate),

                packageName,

                packageType: String(row.PackageType || "").trim() || "Base",

                packageAmount,

                startDate,

                expiryDate,

                enrollmentDate: normalizeDate(row.EnrollmentDate) || startDate,

                workoutGroup: String(row.WorkoutGroup || "").trim(),

                discount: toNumber(row.Discount),

                taxAmount: toNumber(row.TaxAmount),

                convenienceFee: toNumber(row.ConvenienceFee),

                paidAmount: toNumber(row.PaidAmount),

                paymentMethod: String(row.PaymentMethod || "").trim() || "Cash",

                paymentReference: String(row.PaymentReference || "").trim(),

                paymentDate,

                nextPaymentDate: normalizeDate(row.NextPaymentDate),

                soldBy: String(row.SoldBy || "").trim(),

                remarks: String(row.Remarks || "").trim(),
            });
        });

        return {
            totalRows: rows.length,

            validRows: validRows.length,

            invalidRows: errors.length,

            data: validRows,

            errors,
        };
    } catch (error: any) {
        console.error("CSV Parse Error:", error);

        throw new Error(error.message || "Failed to parse CSV file.");
    }
};

// Keep your existing helper functions
// normalizeName
// normalizeMobile
// normalizeDate
// toNumber

export const importMembersFromCSV = async (gymId: string, fileBuffer: Buffer) => {
    try {
        const csvText = fileBuffer.toString("utf-8");

        const rows = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            bom: true,
        });

        if (!rows || rows.length === 0) {
            throw new Error("CSV file does not contain any member data.");
        }

        /*
        |--------------------------------------------------------------------------
        | REQUIRED HEADERS
        |--------------------------------------------------------------------------
        */

        const requiredHeaders = [
            "Name",
            "Mobile",
            "PackageName",
            "PackageAmount",
            "StartDate",
            "ExpiryDate",
            "PaymentDate",
        ];

        const firstRow = rows[0];

        const missingHeaders = requiredHeaders.filter((header) => !(header in firstRow));

        if (missingHeaders.length > 0) {
            throw new Error(`Missing required CSV columns: ${missingHeaders.join(", ")}`);
        }

        /*
        |--------------------------------------------------------------------------
        | VALIDATE CSV
        |--------------------------------------------------------------------------
        */

        const validRows: any[] = [];

        const errors: any[] = [];

        rows.forEach((row: any, index: number) => {
            const rowNumber = index + 2;

            const name = normalizeName(row.Name);

            const mobile = normalizeMobile(row.Mobile);

            const packageName = String(row.PackageName || "").trim();

            const packageAmount = toNumber(row.PackageAmount);

            const startDate = normalizeDate(row.StartDate);

            const expiryDate = normalizeDate(row.ExpiryDate);

            const paymentDate = normalizeDate(row.PaymentDate);

            const rowErrors: string[] = [];

            /*
            |--------------------------------------------------------------------------
            | NAME
            |--------------------------------------------------------------------------
            */

            if (!name) {
                rowErrors.push("Name is required");
            }

            /*
            |--------------------------------------------------------------------------
            | MOBILE
            |--------------------------------------------------------------------------
            */

            if (!mobile) {
                rowErrors.push("Mobile is required");
            } else if (mobile.length < 10 || mobile.length > 15) {
                rowErrors.push("Invalid mobile number");
            }

            /*
            |--------------------------------------------------------------------------
            | PACKAGE
            |--------------------------------------------------------------------------
            */

            if (!packageName) {
                rowErrors.push("PackageName is required");
            }

            /*
            |--------------------------------------------------------------------------
            | AMOUNT
            |--------------------------------------------------------------------------
            */

            if (packageAmount < 0) {
                rowErrors.push("PackageAmount cannot be negative");
            }

            /*
            |--------------------------------------------------------------------------
            | DATES
            |--------------------------------------------------------------------------
            */

            if (!startDate) {
                rowErrors.push("Valid StartDate is required");
            }

            if (!expiryDate) {
                rowErrors.push("Valid ExpiryDate is required");
            }

            if (startDate && expiryDate && expiryDate.getTime() < startDate.getTime()) {
                rowErrors.push("ExpiryDate cannot be before StartDate");
            }

            if (!paymentDate) {
                rowErrors.push("Valid PaymentDate is required");
            }

            /*
            |--------------------------------------------------------------------------
            | PAYMENT VALIDATION
            |--------------------------------------------------------------------------
            */

            const paidAmount = toNumber(row.PaidAmount);

            if (paidAmount < 0) {
                rowErrors.push("PaidAmount cannot be negative");
            }

            /*
            |--------------------------------------------------------------------------
            | INVALID ROW
            |--------------------------------------------------------------------------
            */

            if (rowErrors.length > 0) {
                errors.push({
                    row: rowNumber,
                    name,
                    mobile,
                    errors: rowErrors,
                });

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | VALID ROW
            |--------------------------------------------------------------------------
            */

            validRows.push({
                row: rowNumber,

                uid: row.UID ? String(row.UID).trim() : "",

                name,

                mobile,

                email: String(row.Email || "").trim(),

                gender: String(row.Gender || "").trim(),

                birthDate: normalizeDate(row.BirthDate),

                packageName,

                packageType: String(row.PackageType || "").trim() || "Base",

                packageAmount,

                startDate,

                expiryDate,

                enrollmentDate: normalizeDate(row.EnrollmentDate) || startDate,

                workoutGroup: String(row.WorkoutGroup || "").trim(),

                discount: toNumber(row.Discount),

                taxAmount: toNumber(row.TaxAmount),

                convenienceFee: toNumber(row.ConvenienceFee),

                paidAmount,

                paymentMethod: String(row.PaymentMethod || "").trim() || "Cash",

                paymentReference: String(row.PaymentReference || "").trim(),

                paymentDate,

                nextPaymentDate: normalizeDate(row.NextPaymentDate),

                soldBy: String(row.SoldBy || "").trim(),

                remarks: String(row.Remarks || "").trim(),
            });
        });

        /*
        |--------------------------------------------------------------------------
        | STOP IF NOTHING VALID
        |--------------------------------------------------------------------------
        */

        if (validRows.length === 0) {
            return {
                totalRows: rows.length,
                validRows: 0,
                invalidRows: errors.length,
                imported: 0,
                enrollments: 0,
                renewals: 0,
                errors,
            };
        }

        /*
        |--------------------------------------------------------------------------
        | GET CURRENT SEQUENCES
        |--------------------------------------------------------------------------
        */

        const lastMember = await Member.findOne({
            gymId,
        })
            .sort({ UID: -1 })
            .lean();

        let nextUID = Number(lastMember?.UID || 0) + 1;

        const lastTransaction = await Transaction.findOne({
            gymId,
        })
            .sort({
                transactionId: -1,
            })
            .lean();

        let nextTransactionId = Number(lastTransaction?.transactionId || 0) + 1;

        const lastBill = await Transaction.findOne({
            gymId,
        })
            .sort({
                billNumber: -1,
            })
            .lean();

        let nextBillNumber = Number(lastBill?.billNumber || 0) + 1;

        /*
        |--------------------------------------------------------------------------
        | IMPORT RESULT
        |--------------------------------------------------------------------------
        */

        const importedData: any[] = [];

        let enrollments = 0;

        let renewals = 0;

        /*
        |--------------------------------------------------------------------------
        | PROCESS EACH ROW
        |--------------------------------------------------------------------------
        */

        for (const row of validRows) {
            try {
                /*
                |--------------------------------------------------------------------------
                | FIND EXISTING MEMBER
                |--------------------------------------------------------------------------
                */

                const existingMember = await Member.findOne({
                    gymId,
                    mobile: row.mobile,
                });

                let member: any;

                let purpose: "Enrollment" | "Renewal";

                /*
                |--------------------------------------------------------------------------
                | RENEWAL
                |--------------------------------------------------------------------------
                */

                if (existingMember) {
                    member = existingMember;

                    purpose = "Renewal";

                    renewals++;
                } else {
                    /*
                |--------------------------------------------------------------------------
                | ENROLLMENT
                |--------------------------------------------------------------------------
                */
                    purpose = "Enrollment";

                    let memberUID: number;

                    const csvUID = Number(row.uid);

                    /*
                    |----------------------------------------------------------
                    | Use CSV UID if available and not already used
                    |----------------------------------------------------------
                    */

                    if (row.uid && !Number.isNaN(csvUID) && csvUID > 0) {
                        const existingUID = await Member.findOne({
                            UID: csvUID,
                        });

                        if (!existingUID) {
                            memberUID = csvUID;

                            // Keep sequence ahead
                            if (memberUID >= nextUID) {
                                nextUID = memberUID + 1;
                            }
                        } else {
                            memberUID = nextUID;

                            nextUID++;
                        }
                    } else {
                        memberUID = nextUID;

                        nextUID++;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | CREATE MEMBER
                    |--------------------------------------------------------------------------
                    */

                    member = await Member.create({
                        name: row.name,

                        mobile: row.mobile,

                        UID: memberUID,

                        email: row.email || "",

                        gender: row.gender || "",

                        profile: null,

                        gymId,

                        registrationAmount: 0,

                        joinedTime: row.enrollmentDate,

                        birthTime: row.birthDate || null,

                        workoutGroupName: row.workoutGroup || null,

                        status: "ACTIVE",
                    });

                    enrollments++;
                }

                /*
                |--------------------------------------------------------------------------
                | MEMBER UID
                |--------------------------------------------------------------------------
                */

                const memberUID = Number(member.UID);

                /*
                |--------------------------------------------------------------------------
                | BILL CALCULATION
                |--------------------------------------------------------------------------
                */

                const cost = Math.max(Number(row.packageAmount || 0), 0);

                const discount = Math.max(Number(row.discount || 0), 0);

                const taxAmount = Math.max(Number(row.taxAmount || 0), 0);

                const convenience = Math.max(Number(row.convenienceFee || 0), 0);

                /*
                |--------------------------------------------------------------------------
                | TOTAL AMOUNT
                |--------------------------------------------------------------------------
                */

                const totalAmount = Math.max(cost - discount, 0);

                /*
                |--------------------------------------------------------------------------
                | TOTAL PAYABLE
                |--------------------------------------------------------------------------
                */

                const totalPayable = totalAmount + taxAmount + convenience;

                /*
                |--------------------------------------------------------------------------
                | PAID / REMAINING
                |--------------------------------------------------------------------------
                */

                const paidAmount = Math.min(Math.max(Number(row.paidAmount || 0), 0), totalPayable);

                const remaining = Math.max(totalPayable - paidAmount, 0);

                /*
                |--------------------------------------------------------------------------
                | NEXT PAYMENT DATE
                |--------------------------------------------------------------------------
                */

                const nextPaymentDate = remaining > 0 ? row.nextPaymentDate || null : null;

                /*
                |--------------------------------------------------------------------------
                | PAYMENT METHOD
                |--------------------------------------------------------------------------
                */

                const paymentMethod = String(row.paymentMethod || "Cash")
                    .trim()
                    .toLowerCase();

                let paidByCash = 0;

                let paidByOnline = 0;

                let paidByCard = 0;

                let paidByCheque = 0;

                /*
                |--------------------------------------------------------------------------
                | SPLIT PAYMENT
                |--------------------------------------------------------------------------
                */

                if (paymentMethod === "cash") {
                    paidByCash = paidAmount;
                }

                if (paymentMethod === "online") {
                    paidByOnline = paidAmount;
                }

                if (paymentMethod === "card") {
                    paidByCard = paidAmount;
                }

                if (paymentMethod === "cheque") {
                    paidByCheque = paidAmount;
                }

                /*
                |--------------------------------------------------------------------------
                | PAYMENT REFERENCE
                |--------------------------------------------------------------------------
                */

                const paymentReference = row.paymentReference || "";

                /*
                |--------------------------------------------------------------------------
                | TRANSACTION REFERENCES
                |--------------------------------------------------------------------------
                */

                const cashTransactionId = paymentMethod === "cash" ? paymentReference : "";

                const onlineTransactionId = paymentMethod === "online" ? paymentReference : "";

                const cardTransactionId = paymentMethod === "card" ? paymentReference : "";

                const chequeTransactionId = paymentMethod === "cheque" ? paymentReference : "";

                /*
                |--------------------------------------------------------------------------
                | CREATE MEMBERSHIP
                |--------------------------------------------------------------------------
                */

                await Memberships.create({
                    name: member.name,

                    mobile: member.mobile,

                    UID: memberUID,

                    gymId,

                    billNumber: nextBillNumber,

                    planName: row.packageName,

                    packageType: row.packageType,

                    purpose,

                    registrationAmount: 0,

                    cost,

                    totalAmount,

                    totalPayable,

                    taxAmount,

                    convenience,

                    discount,

                    paidAmount,

                    remaining,

                    taxType: "Non Tax",

                    startDate: row.startDate,

                    expiryDate: row.expiryDate,

                    paymentDate: row.paymentDate,

                    nextPaymentDate,

                    updateTime: new Date(),

                    totalSessions: 0,

                    pendingSessions: 0,

                    completedSessions: 0,

                    services: [],

                    workoutgroup: row.workoutGroup || null,

                    assignedTrainer: null,

                    soldBy: row.soldBy || null,

                    operator: null,

                    remarks: row.remarks || "",
                });

                /*
                |--------------------------------------------------------------------------
                | CREATE TRANSACTION
                |--------------------------------------------------------------------------
                */

                const transaction = await Transaction.create({
                    transactionId: nextTransactionId,

                    name: member.name,

                    mobile: member.mobile,

                    UID: memberUID,

                    gymId,

                    billNumber: nextBillNumber,

                    planName: row.packageName,

                    packageType: row.packageType,

                    purpose,

                    registrationAmount: 0,

                    cost,

                    discount,

                    totalAmount,

                    taxAmount,

                    totalPayable,

                    convenience,

                    currentInstallment: paidAmount,

                    paidAmount,

                    pendingAmount: remaining,

                    paidByOnline,

                    paidByCard,

                    paidByCash,

                    paidByCheque,

                    taxType: "Non Tax",

                    cashTransactionId,

                    onlineTransactionId,

                    cardTransactionId,

                    chequeTransactionId,

                    paymentMethod: row.paymentMethod,

                    paymentReference,

                    startDate: row.startDate,

                    expiryDate: row.expiryDate,

                    paymentDate: row.paymentDate,

                    nextPaymentDate,

                    billDate: row.enrollmentDate || new Date(),

                    soldBy: row.soldBy || null,

                    operator: null,

                    remarks: row.remarks || "",

                    gstNumber: "",

                    stateCode: "",
                });

                /*
                |--------------------------------------------------------------------------
                | SUCCESS RESULT
                |--------------------------------------------------------------------------
                */

                importedData.push({
                    row: row.row,

                    memberId: member._id,

                    UID: memberUID,

                    purpose,

                    transactionId: transaction._id,

                    billNumber: nextBillNumber,

                    transactionNumber: nextTransactionId,

                    name: member.name,

                    mobile: member.mobile,
                });

                /*
                |--------------------------------------------------------------------------
                | INCREMENT SEQUENCES
                |--------------------------------------------------------------------------
                */

                nextTransactionId++;

                nextBillNumber++;
            } catch (error: any) {
                /*
                |--------------------------------------------------------------------------
                | ROW ERROR
                |--------------------------------------------------------------------------
                */

                errors.push({
                    row: row.row,

                    name: row.name,

                    mobile: row.mobile,

                    errors: [error.message || "Failed to import this member"],
                });
            }
        }

        /*
        |--------------------------------------------------------------------------
        | FINAL RESULT
        |--------------------------------------------------------------------------
        */

        return {
            totalRows: rows.length,

            validRows: validRows.length,

            invalidRows: errors.length,

            imported: importedData.length,

            enrollments,

            renewals,

            data: importedData,

            errors,
        };
    } catch (error: any) {
        console.error("CSV Import Error:", error);

        throw new Error(error.message || "Failed to import members.");
    }
};

interface TransactionFilters {
    page?: number | string;
    limit?: number | string;
    startDate?: string;
    endDate?: string;
    receiptType?: string;
    taxType?: string;
    soldBy?: string;
    generatedBy?: string;
    search?: string;
    dateFilter?: string;
}

export const getAllTransactionsService = async (
    gymId: string,
    filters: TransactionFilters = {}
) => {
    const {
        page = 1,
        limit = 10,
        startDate,
        endDate,
        receiptType,
        taxType,
        soldBy,
        generatedBy,
        search,
        dateFilter = "paymentDate",
    } = filters;

    const currentPage = Math.max(Number(page) || 1, 1);

    const perPage = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * perPage;

    // -----------------------------------------
    // BASE QUERY
    // -----------------------------------------

    const query: any = {
        gymId,
    };

    // -----------------------------------------
    // DATE FILTER
    // -----------------------------------------

    if (startDate || endDate) {
        let dateField = "paymentDate";

        if (dateFilter === "billDate") {
            dateField = "billDate";
        } else if (dateFilter === "startDate") {
            dateField = "startDate";
        } else if (dateFilter === "expiryDate") {
            dateField = "expiryDate";
        } else {
            dateField = "paymentDate";
        }

        query[dateField] = {};

        if (startDate) {
            query[dateField].$gte = new Date(`${startDate}T00:00:00.000Z`);
        }

        if (endDate) {
            query[dateField].$lte = new Date(`${endDate}T23:59:59.999Z`);
        }
    }

    // -----------------------------------------
    // RECEIPT TYPE
    // -----------------------------------------

    if (receiptType && receiptType !== "All") {
        query.purpose = receiptType;
    }

    // -----------------------------------------
    // TAX TYPE
    // -----------------------------------------

    if (taxType && taxType !== "All") {
        query.taxType = taxType;
    }

    // -----------------------------------------
    // SOLD BY
    // -----------------------------------------

    if (soldBy && soldBy !== "All") {
        query.soldBy = soldBy;
    }

    // -----------------------------------------
    // GENERATED BY
    // -----------------------------------------

    if (generatedBy && generatedBy !== "All") {
        query.operator = generatedBy;
    }

    // -----------------------------------------
    // SEARCH
    // -----------------------------------------

    if (search?.trim()) {
        const searchValue = search.trim();

        const searchRegex = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

        const searchNumber = Number(searchValue);

        query.$or = [
            { name: searchRegex },
            { mobile: searchRegex },
            { planName: searchRegex },
            { packageType: searchRegex },
            { purpose: searchRegex },
            { paymentMethod: searchRegex },
            { paymentReference: searchRegex },
            { soldBy: searchRegex },
            { operator: searchRegex },
            { remarks: searchRegex },
        ];

        if (!Number.isNaN(searchNumber)) {
            query.$or.push(
                { UID: searchNumber },
                { billNumber: searchNumber },
                { transactionId: searchNumber }
            );
        }
    }

    // -----------------------------------------
    // DATABASE OPERATIONS
    // -----------------------------------------

    const [transactions, total, statisticsResult] = await Promise.all([
        // Current page only
        Transaction.find(query)
            .sort({
                billDate: -1,
                paymentDate: -1,
                createdAt: -1,
            })
            .skip(skip)
            .limit(perPage)
            .lean(),

        // Total matching records
        Transaction.countDocuments(query),

        // Statistics for ALL matching records
        Transaction.aggregate([
            {
                $match: query,
            },
            {
                $group: {
                    _id: null,

                    total: {
                        $sum: {
                            $ifNull: ["$paidAmount", 0],
                        },
                    },

                    cash: {
                        $sum: {
                            $ifNull: ["$paidByCash", 0],
                        },
                    },

                    card: {
                        $sum: {
                            $ifNull: ["$paidByCard", 0],
                        },
                    },

                    upi: {
                        $sum: {
                            $ifNull: ["$paidByOnline", 0],
                        },
                    },

                    cheque: {
                        $sum: {
                            $ifNull: ["$paidByCheque", 0],
                        },
                    },

                    pending: {
                        $sum: {
                            $ifNull: ["$pendingAmount", 0],
                        },
                    },
                },
            },
        ]),
    ]);

    const totalPages = Math.ceil(total / perPage);

    const statistics =
        statisticsResult.length > 0
            ? {
                  total: Number(statisticsResult[0].total) || 0,

                  cash: Number(statisticsResult[0].cash) || 0,

                  card: Number(statisticsResult[0].card) || 0,

                  upi: Number(statisticsResult[0].upi) || 0,

                  cheque: Number(statisticsResult[0].cheque) || 0,

                  pending: Number(statisticsResult[0].pending) || 0,
              }
            : {
                  total: 0,
                  cash: 0,
                  card: 0,
                  upi: 0,
                  cheque: 0,
                  pending: 0,
              };

    return {
        data: transactions,

        pagination: {
            page: currentPage,
            limit: perPage,
            total,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },

        statistics,
    };
};
