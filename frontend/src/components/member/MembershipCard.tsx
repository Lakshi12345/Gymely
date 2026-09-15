import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { MembershipForm, Package } from "../../types/member";
import Select from "../form/Select.tsx";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface MembershipCardProps {
    membership: MembershipForm;
    selectedPackage: Package | null;
    onChange: (field: keyof MembershipForm, value: any) => void;
}

export default function MembershipCard({
    membership,
    selectedPackage,
    onChange,
}: MembershipCardProps) {
    const totalSession =
        selectedPackage?.services?.reduce(
            (sum, service) => sum + Number(service.session || 0),
            0
        ) || 0;

    const duration = selectedPackage?.duration || 0;
    const durationType = selectedPackage?.durationType || "Days";

    const [group, setGroup] = useState("None");

    const workoutGroupOptions = [
        { value: "General Fitness", label: "General Fitness" },
        { value: "2", label: "Weight Training" },
        { value: "3", label: "Cardio" },
        { value: "4", label: "Yoga" },
        { value: "5", label: "Zumba" },
        { value: "6", label: "Dance Fitness" },
        { value: "7", label: "CrossFit" },
        { value: "8", label: "Functional Training" },
    ];

    // console.log(selectedPackage);

    const onGroupChange = (value: string) => {
        const selected = workoutGroupOptions.find((item) => item.value === value);

        const groupName = selected?.label || "None";

        setGroup(groupName);

        onChange("workoutGroup", groupName);
    };

    return (
        <ComponentCard title="Membership">
            <div className="space-y-6">
                <div className="border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/20 rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Membership Plan</p>

                            <h2 className="mt-2 text-2xl font-bold">
                                {selectedPackage?.packageName || "-"}
                            </h2>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Duration</p>

                            <h2 className="text-brand-600 mt-2 text-2xl font-bold">
                                {duration} {durationType}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label>Enrollment Date</Label>

                        <DatePicker
                            selected={
                                membership.enrollmentDate
                                    ? new Date(membership.enrollmentDate)
                                    : null
                            }
                            onChange={(date) =>
                                onChange(
                                    "enrollmentDate",
                                    date ? date.toISOString().split("T")[0] : ""
                                )
                            }
                            dateFormat="dd/MM/yyyy"
                            className="h-11 w-full rounded-lg border px-3"
                            popperClassName="z-[9999]"
                        />
                    </div>

                    <div>
                        <Label>Select Workout Group</Label>
                        <Select
                            options={workoutGroupOptions}
                            placeholder="Choose Workout Group"
                            onChange={onGroupChange}
                        />
                    </div>
                    <div>
                        <Label>Start Date</Label>

                        <DatePicker
                            selected={membership.startDate ? new Date(membership.startDate) : null}
                            onChange={(date) =>
                                onChange("startDate", date ? date.toISOString().split("T")[0] : "")
                            }
                            dateFormat="dd/MM/yyyy"
                            className="h-11 w-full rounded-lg border px-3"
                            wrapperClassName="w-full"
                        />
                    </div>

                    <div>
                        <Label>Expiry Date</Label>

                        <DatePicker
                            selected={
                                membership.expiryDate ? new Date(membership.expiryDate) : null
                            }
                            onChange={(date) =>
                                onChange("expiryDate", date ? date.toISOString().split("T")[0] : "")
                            }
                            dateFormat="dd/MM/yyyy"
                            className="h-11 w-full rounded-lg border px-3"
                            wrapperClassName="w-full"
                        />
                    </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Package</p>

                            <h3 className="mt-2 font-semibold">
                                {selectedPackage?.packageName || "-"}
                            </h3>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase">Group</p>

                            <h3 className="mt-2 font-semibold">{group || "None"}</h3>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase">Sessions</p>

                            <h3 className="mt-2 font-semibold">{totalSession || 0}</h3>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase">Activation</p>

                            <h3 className="mt-2 font-semibold text-green-600">Instant</h3>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
