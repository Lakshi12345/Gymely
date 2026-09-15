import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";

interface ExpenseLabel {
    id: string;
    name: string;
}

interface ExpenseLabelModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: ExpenseLabel[];

    loading?: boolean;

    onSave?: (labels: ExpenseLabel[]) => void;
}

export default function ExpenseLabelModal({
    isOpen,
    onClose,
    data = [],
    loading = false,
    onSave,
}: ExpenseLabelModalProps) {
    const [labels, setLabels] = useState<ExpenseLabel[]>([]);

    const [labelName, setLabelName] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        setLabels(data);

        setLabelName("");

        setEditingId(null);
    }, [isOpen, data]);

    const handleAdd = () => {
        if (!labelName.trim()) return;

        if (editingId) {
            setLabels((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? {
                              ...item,
                              name: labelName,
                          }
                        : item
                )
            );

            setEditingId(null);
        } else {
            setLabels((prev) => [
                ...prev,

                {
                    id: Date.now().toString(),

                    name: labelName,
                },
            ]);
        }

        setLabelName("");
    };

    const handleEdit = (item: ExpenseLabel) => {
        setEditingId(item.id);

        setLabelName(item.name);
    };

    const handleDelete = (id: string) => {
        setLabels((prev) => prev.filter((x) => x.id !== id));
    };

    const handleSubmit = () => {
        onSave?.(labels);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
            {/* Header */}

            <div className="border-b border-gray-200 px-8 py-6 dark:border-gray-800">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Expense Labels
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Manage labels used while recording expenses.
                </p>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] overflow-y-auto p-8">
                <Label>Label Name</Label>

                <div className="flex gap-3">
                    <Input
                        placeholder="Enter expense label"
                        value={labelName}
                        onChange={(e) => setLabelName(e.target.value)}
                    />

                    <Button onClick={handleAdd}>{editingId ? "Update" : "Add"}</Button>
                </div>

                <div className="mt-8">
                    <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                        Existing Labels
                    </h4>

                    <div className="space-y-3">
                        {labels.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center dark:border-gray-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No expense labels found.
                                </p>
                            </div>
                        ) : (
                            labels.map((item) => (
                                <div
                                    key={item.id}
                                    className="hover:border-brand-300 flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 transition dark:border-gray-700"
                                >
                                    <div>
                                        <h5 className="font-medium text-gray-900 dark:text-white">
                                            {item.name}
                                        </h5>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}

            <div className="flex items-center justify-between border-t border-gray-200 px-8 py-5 dark:border-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Labels : <strong>{labels.length}</strong>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
