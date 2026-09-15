import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import {
    Activity,
    ArrowLeft,
    Award,
    CalendarDays,
    ChevronRight,
    Clock3,
    Dumbbell,
    Edit3,
    FileText,
    Fingerprint,
    HeartPulse,
    Mail,
    MapPin,
    MessageCircle,
    MoreHorizontal,
    Phone,
    RefreshCcw,
    ShieldCheck,
    User,
    Users,
    Wallet,
    Zap,
} from "lucide-react";

type TabType = "overview" | "membership" | "attendance" | "followups" | "health" | "activity";

interface MemberData {
    _id: string;

    name: string;
    uid: string;
    status: string;

    mobile: string;
    email: string;
    gender: string;
    birthDate: string | null;

    expiryIn: number;
    expiryDate: string | null;

    totalBusinessPotential: number;
    amountDue: number;

    referralCode: string;
    gymPoint: number;
    advancePaid: number;

    extraLogin: number;
    lastLogin: string | null;

    joiningDate: string | null;
    activeMembership: string;
    membershipExpiry: string | null;

    pendingLogins: number;

    age: number | null;

    weight: string | number;
    height: string | number;
    bmi: string | number;

    personalTrainer: string;
    memberOwner: string;
    memberGroup: string;
    behaviourIndex: string;

    workoutGroup: string;
    todaysWorkout: string;

    emergencyNumber: string;
    emergencyName: string;
    occupation: string;
    address: string;

    aadhaarFront: string;
    aadhaarBack: string;
    otherDocuments: string;

    biometric: string;

    photo?: string;

    trainer?: string;

    attendance: number;
    totalAttendance: number;
    checkInToday: boolean;

    sessions: number;
    completedSessions: number;
    pendingSessions: number;

    due: number;
    paid: number;
}

const currency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

function InfoItem({
    label,
    value,
    icon: Icon,
    highlight,
}: {
    label: string;
    value: string | number;
    icon?: React.ElementType;
    highlight?: string;
}) {
    return (
        <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5">
                {Icon && <Icon size={13} className="text-gray-400" />}

                <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {label}
                </span>
            </div>

            <p
                className={`truncate text-sm font-bold ${
                    highlight || "text-gray-900 dark:text-white"
                }`}
            >
                {value || "Not Set"}
            </p>
        </div>
    );
}

function Section({
    title,
    icon: Icon,
    children,
    action,
    onAction,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    action?: string;
    onAction?: () => void;
}) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="bg-brand-50 text-brand-500 dark:bg-brand-500/10 flex h-8 w-8 items-center justify-center rounded-lg">
                        <Icon size={16} />
                    </div>

                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h2>
                </div>

                {action && (
                    <button
                        onClick={onAction}
                        className="text-brand-500 hover:text-brand-600 text-xs font-semibold transition"
                    >
                        {action}
                    </button>
                )}
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}

function StatCard({
    label,
    value,
    sub,
    icon: Icon,
    iconClass,
}: {
    label: string;
    value: string;
    sub?: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-500">{label}</p>

                    <p className="mt-1 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {value}
                    </p>

                    {sub && (
                        <p className="mt-0.5 truncate text-[10px] font-medium text-gray-400">
                            {sub}
                        </p>
                    )}
                </div>

                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
                >
                    <Icon size={16} />
                </div>
            </div>
        </div>
    );
}

export default function MemberProfile() {
    const { id } = useParams<{
        id: string;
    }>();

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<TabType>("overview");

    const [showMore, setShowMore] = useState(false);

    const [member, setMember] = useState<MemberData | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchMember = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/member/getMember/${id}`);

                if (response.data?.status) {
                    setMember(response.data.data);
                } else {
                    setError(response.data?.error || "Member not found");
                }
            } catch (error: any) {
                console.error("Failed to fetch member:", error?.response?.data || error);

                setError(error?.response?.data?.error || "Failed to load member");
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    const initials = useMemo(() => {
        if (!member?.name) {
            return "NA";
        }

        return member.name
            .split(" ")
            .map((item) => item[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [member?.name]);

    const membershipProgress = useMemo(() => {
        if (!member?.joiningDate || !member?.membershipExpiry) {
            return 0;
        }

        const start = member.joiningDate.split("/").reverse().join("-");

        const end = member.membershipExpiry.split("/").reverse().join("-");

        const startDate = new Date(start);
        const endDate = new Date(end);
        const today = new Date();

        const total = endDate.getTime() - startDate.getTime();

        const elapsed = today.getTime() - startDate.getTime();

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || total <= 0) {
            return 0;
        }

        return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
    }, [member?.joiningDate, member?.membershipExpiry]);

    const tabs = [
        {
            id: "overview" as TabType,
            label: "Overview",
        },
        {
            id: "membership" as TabType,
            label: "Membership",
        },
        {
            id: "attendance" as TabType,
            label: "Attendance",
        },
        {
            id: "followups" as TabType,
            label: "Follow-ups",
        },
        {
            id: "health" as TabType,
            label: "Health",
        },
        {
            id: "activity" as TabType,
            label: "Activity",
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />

                    <p className="mt-3 text-sm text-gray-500">Loading member profile...</p>
                </div>
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-semibold text-red-500">
                        {error || "Member not found"}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/members")}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Back to Members
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-4">
            {/* BACK */}

            <button
                type="button"
                onClick={() => navigate("/members")}
                className="hover:text-brand-500 flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition"
            >
                <ArrowLeft size={14} />
                Back to Members
            </button>

            {/* ================================================= */}
            {/* PROFILE HEADER */}
            {/* ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="from-brand-500 h-10 bg-gradient-to-r via-indigo-500 to-violet-600" />

                <div className="px-5 pb-4">
                    <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        {/* MEMBER */}
                        <div className="flex min-w-0 items-end gap-3">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 text-xl font-extrabold text-gray-600 shadow-lg dark:border-gray-900 dark:bg-gray-800 dark:text-white">
                                {member.photo ? (
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            <div className="mt-5 min-w-0 pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                        {member.name}
                                    </h1>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        {member.status}
                                    </span>
                                </div>

                                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
                                    <span>UID #{member.uid}</span>

                                    <span className="flex items-center gap-1">
                                        <Phone size={12} />
                                        {member.mobile}
                                    </span>

                                    <span className="hidden md:block">
                                        {member.activeMembership}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-wrap gap-2">
                            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]">
                                <Phone size={14} />
                                Call
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                                <MessageCircle size={14} />
                                WhatsApp
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10">
                                <Fingerprint size={14} />
                                Biometric
                            </button>

                            <button className="bg-brand-500 hover:bg-brand-600 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition">
                                <Edit3 size={14} />
                                Edit
                            </button>

                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.03]"
                            >
                                <MoreHorizontal size={17} />
                            </button>
                        </div>
                    </div>

                    {/* MORE ACTIONS */}

                    {showMore && (
                        <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold">
                                <RefreshCcw size={13} />
                                Renew Membership
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold">
                                <Wallet size={13} />
                                Collect Payment
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold">
                                <CalendarDays size={13} />
                                Attendance
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold">
                                <HeartPulse size={13} />
                                Health Profile
                            </button>

                            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold text-red-500">
                                Freeze Membership
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ================================================= */}
            {/* SUMMARY */}
            {/* ================================================= */}

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <StatCard
                    label="Membership Expiry"
                    value={`${member.expiryIn} Days`}
                    sub={`Expires ${member.expiryDate}`}
                    icon={Clock3}
                    iconClass="bg-orange-50 text-orange-500 dark:bg-orange-500/10"
                />

                <StatCard
                    label="Amount Due"
                    value={currency(member.amountDue)}
                    sub="Payment cleared"
                    icon={Wallet}
                    iconClass="bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
                />

                <StatCard
                    label="Gym Points"
                    value={member.gymPoint.toLocaleString()}
                    sub="Available reward points"
                    icon={Award}
                    iconClass="bg-blue-50 text-blue-500 dark:bg-blue-500/10"
                />

                <StatCard
                    label="Pending Logins"
                    value={member.pendingLogins.toLocaleString()}
                    sub={`${member.extraLogin} extra login`}
                    icon={Users}
                    iconClass="bg-violet-50 text-violet-500 dark:bg-violet-500/10"
                />
            </div>

            {/* ================================================= */}
            {/* MEMBERSHIP PROGRESS */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            Current Membership
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">
                                {member.activeMembership}
                            </h2>

                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="text-left md:text-right">
                        <p className="text-xs font-bold text-gray-800 dark:text-white">
                            {member.joiningDate}

                            <span className="mx-2 text-gray-300">→</span>

                            {member.membershipExpiry}
                        </p>
                    </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                        className="from-brand-500 h-full rounded-full bg-gradient-to-r to-violet-500"
                        style={{
                            width: `${membershipProgress}%`,
                        }}
                    />
                </div>

                <div className="mt-1.5 flex justify-between text-[10px] font-medium text-gray-400">
                    <span>Membership progress</span>
                    <span>{member.expiryIn} days remaining</span>
                </div>
            </div>

            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="flex min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-5 py-3 text-xs font-bold transition ${
                                activeTab === tab.id
                                    ? "text-brand-500"
                                    : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                            }`}
                        >
                            {tab.label}

                            {activeTab === tab.id && (
                                <span className="bg-brand-500 absolute inset-x-3 bottom-0 h-0.5 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================================================= */}
            {/* OVERVIEW */}
            {/* ================================================= */}

            {activeTab === "overview" && (
                <div className="space-y-4">
                    {/* CUSTOMER + MEMBERSHIP */}

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 xl:col-span-7">
                            <Section title="Customer Information" icon={User} action="Edit">
                                <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
                                    <InfoItem label="UID" value={member.uid} icon={User} />

                                    <InfoItem label="Mobile" value={member.mobile} icon={Phone} />

                                    <InfoItem label="Email" value={member.email} icon={Mail} />

                                    <InfoItem label="Gender" value={member.gender} icon={User} />

                                    <InfoItem
                                        label="Birth Date"
                                        value={member.birthDate}
                                        icon={CalendarDays}
                                    />

                                    <InfoItem
                                        label="Occupation"
                                        value={member.occupation}
                                        icon={Activity}
                                    />

                                    <InfoItem
                                        label="Emergency Number"
                                        value={member.emergencyNumber}
                                        icon={Phone}
                                    />

                                    <InfoItem
                                        label="Emergency Name"
                                        value={member.emergencyName}
                                        icon={User}
                                    />

                                    <InfoItem
                                        label="Address"
                                        value={member.address}
                                        icon={MapPin}
                                    />
                                </div>
                            </Section>
                        </div>

                        <div className="col-span-12 xl:col-span-5">
                            <Section title="Membership" icon={CalendarDays} action="Manage">
                                <div className="space-y-4">
                                    <div className="bg-brand-50 dark:bg-brand-500/10 rounded-xl p-4">
                                        <p className="text-brand-500 text-[10px] font-bold tracking-wider uppercase">
                                            Active Plan
                                        </p>

                                        <p className="mt-1 text-base font-extrabold text-gray-900 dark:text-white">
                                            {member.activeMembership}
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-gray-500">
                                            {member.joiningDate}
                                            {" → "}
                                            {member.membershipExpiry}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <InfoItem
                                            label="Pending Logins"
                                            value={member.pendingLogins}
                                            icon={Users}
                                        />

                                        <InfoItem
                                            label="Advance Paid"
                                            value={currency(member.advancePaid)}
                                            icon={Wallet}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="bg-brand-500 flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-bold text-white">
                                            <RefreshCcw size={14} />
                                            Renew or New Package
                                        </button>

                                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-xs font-bold dark:border-gray-700">
                                            <Wallet size={14} />
                                            Payment
                                        </button>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    </div>

                    {/* HEALTH + GYM */}

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-6">
                            <Section title="Health & Fitness" icon={HeartPulse} action="Update">
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                    <InfoItem label="Age" value={member.age} icon={CalendarDays} />

                                    <InfoItem
                                        label="Weight"
                                        value={member.weight}
                                        icon={Activity}
                                    />

                                    <InfoItem
                                        label="Height"
                                        value={member.height}
                                        icon={Activity}
                                    />

                                    <InfoItem label="BMI" value={member.bmi} icon={HeartPulse} />
                                </div>
                            </Section>
                        </div>

                        <div className="col-span-12 lg:col-span-6">
                            <Section title="Gym Information" icon={Users} action="Update">
                                <div className="grid grid-cols-2 gap-3">
                                    <InfoItem
                                        label="Personal Trainer"
                                        value={member.personalTrainer}
                                        icon={User}
                                    />

                                    <InfoItem
                                        label="Member Owner"
                                        value={member.memberOwner}
                                        icon={Users}
                                    />

                                    <InfoItem
                                        label="Member Group"
                                        value={member.memberGroup}
                                        icon={Users}
                                    />

                                    <InfoItem
                                        label="Behaviour Index"
                                        value={member.behaviourIndex}
                                        icon={Activity}
                                        highlight="text-emerald-600"
                                    />
                                </div>
                            </Section>
                        </div>
                    </div>

                    {/* WORKOUT */}

                    <Section title="Today's Workout" icon={Dumbbell} action="View Workout">
                        <div className="flex flex-col gap-3 md:flex-row">
                            <div className="flex flex-1 items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/[0.03]">
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                        Workout Group
                                    </p>

                                    <p className="mt-1 text-sm font-extrabold text-gray-900 dark:text-white">
                                        {member.workoutGroup}
                                    </p>
                                </div>

                                <Dumbbell size={20} className="text-brand-500" />
                            </div>

                            <button className="flex flex-1 items-center justify-between rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-left text-white">
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-orange-100 uppercase">
                                        Today's Workout
                                    </p>

                                    <p className="mt-1 text-base font-extrabold">
                                        {member.todaysWorkout}
                                    </p>
                                </div>

                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </Section>

                    {/* ACCOUNT */}

                    <Section title="Account Information" icon={ShieldCheck}>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                            <InfoItem label="Last Login" value={member.lastLogin} icon={Clock3} />

                            <InfoItem
                                label="Referral Code"
                                value={member.referralCode}
                                icon={Award}
                            />

                            <InfoItem label="Extra Login" value={member.extraLogin} icon={Users} />

                            <InfoItem
                                label="Business Potential"
                                value={currency(member.totalBusinessPotential)}
                                icon={Wallet}
                            />

                            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                                <div className="mb-1 flex items-center gap-1.5">
                                    <Fingerprint size={13} className="text-emerald-600" />

                                    <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
                                        Biometric
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                                    <p className="text-sm font-extrabold text-emerald-700">
                                        {member.biometric}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* DOCUMENTS */}

                    <Section title="Documents" icon={FileText} action="Manage">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                ["Aadhaar Front", member.aadhaarFront],
                                ["Aadhaar Back", member.aadhaarBack],
                                ["Other Documents", member.otherDocuments],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 dark:border-gray-800"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
                                            <FileText size={15} />
                                        </div>

                                        <span className="text-xs font-semibold">{label}</span>
                                    </div>

                                    <span className="text-[11px] font-medium text-gray-400">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            )}

            {/* ================================================= */}
            {/* MEMBERSHIP */}
            {/* ================================================= */}

            {activeTab === "membership" && (
                <div className="space-y-4">
                    <Section
                        title="Membership History"
                        icon={CalendarDays}
                        action="Renew Membership"
                    >
                        <div className="space-y-2">
                            {[
                                {
                                    plan: "12 Months (General)",
                                    start: "15/08/2026",
                                    end: "13/07/2027",
                                    status: "Active",
                                },
                                {
                                    plan: "12 Months (General)",
                                    start: "18/07/2025",
                                    end: "13/07/2026",
                                    status: "Expired",
                                },
                                {
                                    plan: "12 Months (General)",
                                    start: "01/08/2024",
                                    end: "29/07/2025",
                                    status: "Expired",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 md:flex-row md:items-center md:justify-between dark:border-gray-800"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {item.plan}
                                            </p>

                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                    item.status === "Active"
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs font-medium text-gray-500">
                                            {item.start}
                                            {" → "}
                                            {item.end}
                                        </p>
                                    </div>

                                    <button className="text-brand-500 flex items-center gap-1 text-xs font-semibold">
                                        View Details
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Payment Summary" icon={Wallet} action="View Billing">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            <StatCard
                                label="Amount Due"
                                value={currency(member.amountDue)}
                                icon={Wallet}
                                iconClass="bg-emerald-50 text-emerald-500"
                            />

                            <StatCard
                                label="Advance Paid"
                                value={currency(member.advancePaid)}
                                icon={Wallet}
                                iconClass="bg-blue-50 text-blue-500"
                            />

                            <StatCard
                                label="Business Potential"
                                value={currency(member.totalBusinessPotential)}
                                icon={Award}
                                iconClass="bg-violet-50 text-violet-500"
                            />

                            <StatCard
                                label="Gym Points"
                                value={member.gymPoint.toLocaleString()}
                                icon={Award}
                                iconClass="bg-orange-50 text-orange-500"
                            />
                        </div>
                    </Section>
                </div>
            )}

            {/* ================================================= */}
            {/* ATTENDANCE */}
            {/* ================================================= */}

            {activeTab === "attendance" && (
                <Section title="Attendance" icon={CalendarDays} action="Attendance Report">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <StatCard
                            label="This Month"
                            value="18"
                            sub="Visits"
                            icon={CalendarDays}
                            iconClass="bg-blue-50 text-blue-500"
                        />

                        <StatCard
                            label="Present"
                            value="16"
                            sub="Attendance"
                            icon={Activity}
                            iconClass="bg-emerald-50 text-emerald-500"
                        />

                        <StatCard
                            label="Absent"
                            value="2"
                            sub="Days"
                            icon={Clock3}
                            iconClass="bg-red-50 text-red-500"
                        />

                        <StatCard
                            label="Consistency"
                            value="89%"
                            sub="This month"
                            icon={Zap}
                            iconClass="bg-violet-50 text-violet-500"
                        />
                    </div>
                </Section>
            )}

            {/* ================================================= */}
            {/* FOLLOW UPS */}
            {/* ================================================= */}

            {activeTab === "followups" && (
                <Section title="Follow-ups" icon={MessageCircle} action="Add Follow-up">
                    <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
                        <MessageCircle size={28} className="mx-auto text-gray-300" />

                        <p className="mt-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                            No recent follow-ups
                        </p>

                        <p className="mt-1 text-xs font-medium text-gray-400">
                            Follow-up history will appear here.
                        </p>
                    </div>
                </Section>
            )}

            {/* ================================================= */}
            {/* HEALTH */}
            {/* ================================================= */}

            {activeTab === "health" && (
                <div className="space-y-4">
                    <Section title="Health Profile" icon={HeartPulse} action="Update Health">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            <StatCard
                                label="Age"
                                value={String(member.age)}
                                icon={User}
                                iconClass="bg-blue-50 text-blue-500"
                            />

                            <StatCard
                                label="Weight"
                                value={member.weight}
                                icon={Activity}
                                iconClass="bg-violet-50 text-violet-500"
                            />

                            <StatCard
                                label="Height"
                                value={member.height}
                                icon={Activity}
                                iconClass="bg-orange-50 text-orange-500"
                            />

                            <StatCard
                                label="BMI"
                                value={member.bmi}
                                icon={HeartPulse}
                                iconClass="bg-emerald-50 text-emerald-500"
                            />
                        </div>
                    </Section>

                    <Section title="Health Records" icon={FileText} action="Manage">
                        <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
                            <HeartPulse size={28} className="mx-auto text-gray-300" />

                            <p className="mt-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                                No health records added
                            </p>
                        </div>
                    </Section>
                </div>
            )}

            {/* ================================================= */}
            {/* ACTIVITY */}
            {/* ================================================= */}

            {activeTab === "activity" && (
                <Section title="Recent Activity" icon={Activity}>
                    <div className="space-y-4">
                        {[
                            ["Member profile accessed", "Today · 10:42 AM"],
                            ["Membership active", "15/08/2026"],
                            ["Member joined", "15/08/2026"],
                        ].map((activity, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="bg-brand-50 text-brand-500 dark:bg-brand-500/10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                                    <Activity size={13} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-800 dark:text-white">
                                        {activity[0]}
                                    </p>

                                    <p className="mt-0.5 text-[11px] font-medium text-gray-400">
                                        {activity[1]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            <div className="h-2" />
        </div>
    );
}
