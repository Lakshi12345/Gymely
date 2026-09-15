import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

interface CustomerSetup {
    sources: string[];
    occupations: string[];
    addresses: string[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;

    data?: Partial<CustomerSetup>;

    loading?: boolean;

    onSave?: (data: CustomerSetup) => void;
}

const defaultData: CustomerSetup = {
    sources: [],
    occupations: [],
    addresses: [],
};

export default function CustomerSetupModal({
    isOpen,
    onClose,
    data,
    loading = false,
    onSave,
}: Props) {
    const [form, setForm] = useState<CustomerSetup>(defaultData);

    const [source, setSource] = useState("");

    const [occupation, setOccupation] = useState("");

    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            ...defaultData,
            ...data,
        });

        setSource("");
        setOccupation("");
        setAddress("");
    }, [isOpen, data]);

    const addItem = (key: keyof CustomerSetup, value: string) => {
        if (!value.trim()) return;

        setForm((prev) => ({
            ...prev,

            [key]: [...prev[key], value],
        }));

        if (key === "sources") setSource("");

        if (key === "occupations") setOccupation("");

        if (key === "addresses") setAddress("");
    };

    const removeItem = (key: keyof CustomerSetup, index: number) => {
        setForm((prev) => ({
            ...prev,

            [key]: prev[key].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = () => {
        onSave?.(form);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
            {/* Header */}

            <div className="border-b border-gray-200 px-8 py-6">
                <h2 className="text-2xl font-semibold">Customer Setup</h2>

                <p className="mt-2 text-sm text-gray-500">
                    Manage customer sources, occupations and addresses.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* ================= SOURCES ================= */}

                    <MasterSection
                        title="Customer Sources"
                        placeholder="Enter source"
                        value={source}
                        items={form.sources}
                        onValueChange={setSource}
                        onAdd={() => addItem("sources", source)}
                        onRemove={(index) => removeItem("sources", index)}
                    />

                    {/* ================= OCCUPATIONS ================= */}

                    <MasterSection
                        title="Occupations"
                        placeholder="Enter occupation"
                        value={occupation}
                        items={form.occupations}
                        onValueChange={setOccupation}
                        onAdd={() => addItem("occupations", occupation)}
                        onRemove={(index) => removeItem("occupations", index)}
                    />

                    {/* ================= ADDRESSES ================= */}

                    <MasterSection
                        title="Addresses"
                        placeholder="Enter address"
                        value={address}
                        items={form.addresses}
                        onValueChange={setAddress}
                        onAdd={() => addItem("addresses", address)}
                        onRemove={(index) => removeItem("addresses", index)}
                    />
                </div>
            </div>

            {/* Footer */}

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-8 py-5 dark:border-gray-800">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Modal>
    );
}

interface MasterSectionProps {
    title: string;
    placeholder: string;

    value: string;

    items: string[];

    onValueChange: (value: string) => void;

    onAdd: () => void;

    onRemove: (index: number) => void;
}

function MasterSection({
    title,
    placeholder,
    value,
    items,
    onValueChange,
    onAdd,
    onRemove,
}: MasterSectionProps) {
    return (
        <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
            <h4 className="mb-5 font-semibold text-gray-900 dark:text-white">{title}</h4>

            <div className="flex gap-2">
                <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />

                <Button onClick={onAdd}>Add</Button>
            </div>

            <div className="mt-5 space-y-2">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500">No records found.</p>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 dark:border-gray-800"
                        >
                            <span>{item}</span>

                            <button
                                onClick={() => onRemove(index)}
                                className="text-sm font-medium text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}