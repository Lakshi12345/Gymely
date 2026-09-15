import { useMemo, useState, useEffect } from "react";
import { User, Briefcase, Calendar, Wallet, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/input/Checkbox";
import Radio from "../../components/form/input/Radio";
import TextArea from "../../components/form/input/TextArea";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../../services/api";

interface StaffForm {
    uid: string;
    exitUID: string;

    name: string;
    gender: "Male" | "Female";

    mobile: string;
    email: string;

    joiningDate: string;

    designation: string;

    role: string;

    experience: string;
    skills: string;
    aboutMe: string;

    showWebsite: boolean;

    workingHours: string;
    paidLeave: number;

    basicSalary: number;
    overtime: number;
    lessTime: number;
    unpaidLeaveDeduction: number;
}

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function StaffAdd() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [staff, setStaff] = useState<StaffForm>({
        uid: "",
        exitUID: "",

        name: "",
        gender: "Male",

        mobile: "",
        email: "",

        joiningDate: "",

        designation: "",
        role: "",

        experience: "",
        skills: "",
        aboutMe: "",

        showWebsite: false,

        workingHours: "",

        paidLeave: 0,

        basicSalary: 0,
        overtime: 0,
        lessTime: 0,
        unpaidLeaveDeduction: 0,
    });

    const [workingDays, setWorkingDays] = useState<string[]>([
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN",
    ]);

    const [session, setSession] = useState({
        morning: true,
        evening: true,

        morningStart: "",
        morningEnd: "",

        eveningStart: "",
        eveningEnd: "",
    });

    const handleInput = (field: keyof StaffForm, value: any) => {
        setStaff((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleDay = (day: string) => {
        if (workingDays.includes(day)) {
            setWorkingDays(workingDays.filter((d) => d !== day));
        } else {
            setWorkingDays([...workingDays, day]);
        }
    };

    const handleSession = (field: string, value: any) => {
        setSession((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const totalWorkingDays = useMemo(() => workingDays.length, [workingDays]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                ...staff,
                workingDays,
                session,
            };

            await api.post("/staff/addStaff", payload);

            console.log(payload);
            await new Promise((resolve) => setTimeout(resolve, 1200));

            toast.success("Staff added successfully");
            navigate("/dashboard/staffall");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const [staffRoles, setStaffRoles] = useState<any[]>([]);

    const loadStaffRoles = async () => {
        try {
            const response = await api.get("/settings/getStaffRole");

            if (response.data?.status) {
                console.log("STAFF ROLES:", response.data);

                setStaffRoles(response.data.data || []);
            }
        } catch (error: any) {
            console.error("Failed to load staff roles:", error);
        }
    };

    useEffect(() => {
        loadStaffRoles();
    }, []);

    return (
        <>
            <PageBreadcrumb pageTitle="Add Staff" />

            <div className="space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* LEFT */}

                    <div className="col-span-12 space-y-6 xl:col-span-8">
                        {/* ================= PERSONAL INFORMATION ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                        <User size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Personal Information
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Basic details of the staff member.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-6">
                                    {/* UID */}

                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Staff UID</Label>

                                        <Input
                                            placeholder="Enter UID"
                                            value={staff.uid}
                                            onChange={(e) => handleInput("uid", e.target.value)}
                                        />
                                    </div>

                                    {/* Exit UID */}

                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Exit UID</Label>

                                        <Input
                                            placeholder="Enter Exit UID"
                                            value={staff.exitUID}
                                            onChange={(e) => handleInput("exitUID", e.target.value)}
                                        />
                                    </div>

                                    {/* Name */}

                                    <div className="col-span-12">
                                        <Label>Full Name</Label>

                                        <Input
                                            placeholder="Enter Full Name"
                                            value={staff.name}
                                            onChange={(e) => handleInput("name", e.target.value)}
                                        />
                                    </div>

                                    {/* Mobile */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Mobile Number</Label>

                                        <Input
                                            placeholder="Enter Mobile Number"
                                            value={staff.mobile}
                                            onChange={(e) => handleInput("mobile", e.target.value)}
                                        />
                                    </div>

                                    {/* Email */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Email Address</Label>

                                        <Input
                                            type="email"
                                            placeholder="Enter Email"
                                            value={staff.email}
                                            onChange={(e) => handleInput("email", e.target.value)}
                                        />
                                    </div>

                                    {/* Gender */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Gender</Label>

                                        <div className="mt-3 flex gap-8">
                                            <Radio
                                                id="male"
                                                name="gender"
                                                checked={staff.gender === "Male"}
                                                onChange={() => handleInput("gender", "Male")}
                                                label="Male"
                                            />

                                            <Radio
                                                id="female"
                                                name="gender"
                                                checked={staff.gender === "Female"}
                                                onChange={() => handleInput("gender", "Female")}
                                                label="Female"
                                            />
                                        </div>
                                    </div>

                                    {/* Joining Date */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Joining Date</Label>

                                        <DatePicker
                                            selected={
                                                staff.joiningDate
                                                    ? new Date(staff.joiningDate)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handleInput(
                                                    "joiningDate",
                                                    date ? date.toISOString().split("T")[0] : ""
                                                )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select Joining Date"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={100}
                                            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            wrapperClassName="w-full"
                                            popperClassName="z-[9999]"
                                        />
                                    </div>

                                    {/* Designation */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Designation</Label>

                                        <Input
                                            placeholder="Trainer / Receptionist / Manager"
                                            value={staff.designation}
                                            onChange={(e) =>
                                                handleInput("designation", e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Role */}

                                    <div className="col-span-12 lg:col-span-6">
                                        <Label>Staff Role</Label>

                                        <select
                                            value={staff.role}
                                            onChange={(e) => handleInput("role", e.target.value)}
                                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="">Select Staff Role</option>

                                            {staffRoles.map((role) => (
                                                <option key={role._id} value={role.name}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================= PROFESSIONAL PROFILE ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                                        <Briefcase size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Professional Profile
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Experience, skills and public profile information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 p-6">
                                {/* Experience */}

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label>Experience</Label>
                                    </div>

                                    <TextArea
                                        rows={2}
                                        placeholder="Write staff experience..."
                                        value={staff.experience}
                                        onChange={(value) => handleInput("experience", value)}
                                    />
                                </div>

                                {/* Skills */}

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label>Skills</Label>
                                    </div>

                                    <TextArea
                                        rows={2}
                                        placeholder="Enter staff skills..."
                                        value={staff.skills}
                                        onChange={(value) => handleInput("skills", value)}
                                    />
                                </div>

                                {/* About */}

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label>About Staff</Label>
                                    </div>

                                    <TextArea
                                        rows={2}
                                        placeholder="Write a short description..."
                                        value={staff.aboutMe}
                                        onChange={(value) => handleInput("aboutMe", value)}
                                    />
                                </div>

                                {/* Website Visibility */}

                                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                                    <Label>Show on Website</Label>

                                    <div className="mt-4 flex gap-8">
                                        <Radio
                                            id="showWebsiteYes"
                                            name="showWebsite"
                                            checked={staff.showWebsite}
                                            onChange={() => handleInput("showWebsite", true)}
                                            label="Yes"
                                        />

                                        <Radio
                                            id="showWebsiteNo"
                                            name="showWebsite"
                                            checked={!staff.showWebsite}
                                            onChange={() => handleInput("showWebsite", false)}
                                            label="No"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================= WORKING SCHEDULE ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30">
                                        <Calendar size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Working Schedule
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Configure weekly working days and shift timings.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 p-6">
                                {/* Working Days */}

                                <div>
                                    <Label>Working Days</Label>

                                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
                                        {weekDays.map((day) => (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => toggleDay(day)}
                                                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                                                    workingDays.includes(day)
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-gray-300 bg-white hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800"
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sessions */}

                                <div>
                                    <Label>Working Sessions</Label>

                                    <div className="mt-4 flex flex-wrap gap-6">
                                        <Checkbox
                                            checked={session.morning}
                                            onChange={() =>
                                                handleSession("morning", !session.morning)
                                            }
                                            label="Morning Session"
                                        />

                                        <Checkbox
                                            checked={session.evening}
                                            onChange={() =>
                                                handleSession("evening", !session.evening)
                                            }
                                            label="Evening Session"
                                        />
                                    </div>
                                </div>

                                {/* Morning */}

                                {session.morning && (
                                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-900/10">
                                        <h3 className="mb-5 font-semibold text-blue-700 dark:text-blue-300">
                                            Morning Session
                                        </h3>

                                        <div className="grid grid-cols-12 gap-6">
                                            <div className="col-span-12 md:col-span-6">
                                                <Label>Start Time</Label>

                                                <Input
                                                    type="time"
                                                    value={session.morningStart}
                                                    onChange={(e) =>
                                                        handleSession(
                                                            "morningStart",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <Label>End Time</Label>

                                                <Input
                                                    type="time"
                                                    value={session.morningEnd}
                                                    onChange={(e) =>
                                                        handleSession("morningEnd", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Evening */}

                                {session.evening && (
                                    <div className="rounded-xl border border-purple-200 bg-purple-50 p-5 dark:border-purple-900 dark:bg-purple-900/10">
                                        <h3 className="mb-5 font-semibold text-purple-700 dark:text-purple-300">
                                            Evening Session
                                        </h3>

                                        <div className="grid grid-cols-12 gap-6">
                                            <div className="col-span-12 md:col-span-6">
                                                <Label>Start Time</Label>

                                                <Input
                                                    type="time"
                                                    value={session.eveningStart}
                                                    onChange={(e) =>
                                                        handleSession(
                                                            "eveningStart",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <Label>End Time</Label>

                                                <Input
                                                    type="time"
                                                    value={session.eveningEnd}
                                                    onChange={(e) =>
                                                        handleSession("eveningEnd", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Attendance */}

                                <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-700">
                                    <h3 className="mb-5 font-semibold">Attendance & Leave</h3>

                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-12 md:col-span-6">
                                            <Label>Daily Working Hours</Label>

                                            <Input
                                                placeholder="8 Hours"
                                                value={staff.workingHours}
                                                onChange={(e) =>
                                                    handleInput("workingHours", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-span-12 md:col-span-6">
                                            <Label>Paid Leaves / Month</Label>

                                            <Input
                                                type="number"
                                                value={staff.paidLeave}
                                                onChange={(e) =>
                                                    handleInput("paidLeave", Number(e.target.value))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary */}

                                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                    <h3 className="text-lg font-semibold">Schedule Summary</h3>

                                    <div className="mt-5 space-y-3">
                                        <div className="flex justify-between">
                                            <span>Working Days</span>

                                            <strong>{totalWorkingDays} Days</strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Morning Shift</span>

                                            <strong>
                                                {session.morning ? "Enabled" : "Disabled"}
                                            </strong>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Evening Shift</span>

                                            <strong>
                                                {session.evening ? "Enabled" : "Disabled"}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================= SALARY & PAYROLL ================= */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30">
                                        <Wallet size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Salary & Payroll
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Configure salary structure and attendance deductions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Basic Salary</Label>
                                        <Input
                                            type="number"
                                            value={staff.basicSalary}
                                            onChange={(e) =>
                                                handleInput("basicSalary", Number(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Overtime / Hour</Label>
                                        <Input
                                            type="number"
                                            value={staff.overtime}
                                            onChange={(e) =>
                                                handleInput("overtime", Number(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Less Time / Hour</Label>
                                        <Input
                                            type="number"
                                            value={staff.lessTime}
                                            onChange={(e) =>
                                                handleInput("lessTime", Number(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <Label>Unpaid Leave Deduction</Label>
                                        <Input
                                            type="number"
                                            value={staff.unpaidLeaveDeduction}
                                            onChange={(e) =>
                                                handleInput(
                                                    "unpaidLeaveDeduction",
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR ================= */}

                    <div className="col-span-12 xl:col-span-4">
                        <div className="sticky top-6 space-y-6">
                            {/* Staff Preview */}

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
                                        {staff.name ? staff.name.charAt(0).toUpperCase() : "S"}
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold text-white">
                                        {staff.name || "New Staff"}
                                    </h2>

                                    <p className="mt-1 text-blue-100">
                                        {staff.designation || "Designation"}
                                    </p>
                                </div>

                                <div className="space-y-4 p-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">UID</span>
                                        <strong>{staff.uid || "--"}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Mobile</span>
                                        <strong>{staff.mobile || "--"}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Working Days</span>
                                        <strong>{workingDays.length}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Salary</span>
                                        <strong>₹{staff.basicSalary.toLocaleString()}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Payroll Summary */}

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                                    <h3 className="font-semibold">Payroll Summary</h3>
                                </div>

                                <div className="space-y-5 p-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Basic Salary</p>

                                        <h2 className="text-2xl font-bold">
                                            ₹{staff.basicSalary.toLocaleString()}
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Overtime</p>

                                        <h2 className="text-xl font-semibold text-green-600">
                                            ₹{staff.overtime}/hr
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Less Time</p>

                                        <h2 className="text-xl font-semibold text-red-500">
                                            ₹{staff.lessTime}/hr
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Leave Deduction</p>

                                        <h2 className="text-xl font-semibold text-orange-500">
                                            ₹{staff.unpaidLeaveDeduction}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= ACTION BAR ================= */}

                <div className="sticky bottom-0 z-30 mt-8 border-t border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
                    <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Ready to Add Staff?</h3>

                            <p className="text-sm text-gray-500">
                                Verify the information before creating the staff profile.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => navigate(-1)}>
                                <ArrowLeft className="mr-2" size={18} />
                                Cancel
                            </Button>

                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="mr-2" size={18} />
                                        Add Staff
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
