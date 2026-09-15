import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { AdvancedForm } from "../../types/member";

interface AdvancedCardProps {
    advanced: AdvancedForm;
    onChange: (field: keyof AdvancedForm, value: any) => void;
}

export default function AdvancedCard({ advanced, onChange }: AdvancedCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <ComponentCard title="Advanced Options">
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
                >
                    <span className="font-medium">Additional Information</span>

                    <span className="text-xl">{open ? "−" : "+"}</span>
                </button>

                {open && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label>Invoice Type</Label>

                            <select
                                value={advanced.invoiceType}
                                onChange={(e) => onChange("invoiceType", e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-300 px-3 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <option value="Normal">Normal Invoice</option>

                                <option value="GST">GST Invoice</option>

                                <option value="Composition">GST Composition</option>

                                <option value="Non-Tax">Non Tax Invoice</option>
                            </select>
                        </div>

                        <div>
                            <Label>Sold By</Label>

                            <Input
                                value={advanced.soldBy}
                                placeholder="Staff Name"
                                onChange={(e) => onChange("soldBy", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Assign Executive</Label>

                            <Input
                                value={advanced.executive}
                                placeholder="Executive"
                                onChange={(e) => onChange("executive", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Personal Trainer</Label>

                            <Input
                                value={advanced.trainer}
                                placeholder="Trainer Name"
                                onChange={(e) => onChange("trainer", e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </ComponentCard>
    );
}
