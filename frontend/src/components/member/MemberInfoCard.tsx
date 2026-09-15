import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Radio from "../form/input/Radio";
import Select from "../form/Select";
import DatePicker from "react-datepicker";

export interface Package {
    _id: string;
    packageName: string;
    group?: string;
    amount: number;
    duration?: number;
    durationType?: "Days" | "Months" | "Years";
    sessions?: number;
    description?: string;
    taxIncluded: boolean;
}

export interface MemberForm {
    name: string;
    mobile: string;
    email: string;
    gender: "Male" | "Female" | "Other";
    birthDate: string;
}

interface MemberInfoCardProps {
    member: MemberForm;
    packages: Package[];
    selectedPackage: Package | null;

    onInputChange: (field: keyof MemberForm, value: any) => void;

    onPackageChange: (packageId: string) => void;
}

export default function MemberInfoCard({
    member,
    packages,
    selectedPackage,
    onInputChange,
    onPackageChange,
}: MemberInfoCardProps) {
    const packageOptions = packages.map((pkg) => ({
        value: pkg._id,
        label: `${pkg.packageName} • ₹${pkg.amount}`,
    }));

    return (
        <ComponentCard title="Member Information">
            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Member Details
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the basic details required to register a new member.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <Label>Member Name</Label>

                        <Input
                            placeholder="Enter Member Name"
                            value={member.name}
                            onChange={(e) => onInputChange("name", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Mobile Number</Label>

                        <Input
                            placeholder="9876543210"
                            value={member.mobile}
                            onChange={(e) => onInputChange("mobile", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Email Address</Label>

                        <Input
                            placeholder="john@gmail.com"
                            value={member.email}
                            onChange={(e) => onInputChange("email", e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Date of Birth</Label>

                        <DatePicker
                            selected={member.birthDate ? new Date(member.birthDate) : null}
                            onChange={(date: Date | null) =>
                                onInputChange(
                                    "birthDate",
                                    date ? date.toISOString().split("T")[0] : ""
                                )
                            }
                            dateFormat="dd/MM/yyyy"
                            className="h-11 w-full rounded-lg border px-3"
                            wrapperClassName="w-full"
                            popperClassName="z-[9999]"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date()}
                            placeholderText="Select Date of Birth"
                        />
                    </div>

                    <div>
                        <Label>Gender</Label>

                        <div className="mt-3 flex flex-wrap gap-6">
                            <Radio
                                id="male"
                                name="gender"
                                label="Male"
                                value="Male"
                                checked={member.gender === "Male"}
                                onChange={() => onInputChange("gender", "Male")}
                            />

                            <Radio
                                id="female"
                                name="gender"
                                label="Female"
                                value="Female"
                                checked={member.gender === "Female"}
                                onChange={() => onInputChange("gender", "Female")}
                            />

                            <Radio
                                id="other"
                                name="gender"
                                label="Other"
                                value="Other"
                                checked={member.gender === "Other"}
                                onChange={() => onInputChange("gender", "Other")}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Select Membership</Label>

                        <Select
                            options={packageOptions}
                            placeholder="Choose Package"
                            onChange={onPackageChange}
                        />
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
