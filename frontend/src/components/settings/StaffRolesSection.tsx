import SettingSection from "./SettingSection";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface StaffRole {
    _id: string;
    name: string;
}

interface Props {
    data?: StaffRole[];
    onAdd: () => void;
    onEdit: (role: StaffRole) => void;
    onDelete: (role: StaffRole) => void;
}

export default function StaffRolesSection({ data = [], onAdd, onEdit, onDelete }: Props) {
    return (
        <SettingSection id="staff" title="Staff Roles" description="Manage staff roles.">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">Total Roles</p>

                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {data.length}
                    </h4>
                </div>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={17} />
                    Add Role
                </button>
            </div>

            {data.length === 0 ? (
                <div className="rounded-xl border border-dashed py-8 text-center">
                    <p className="text-sm text-gray-500">No staff roles available.</p>

                    <button
                        type="button"
                        onClick={onAdd}
                        className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                    >
                        + Add Staff Role
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    {data.map((role) => (
                        <div
                            key={role._id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
                        >
                            <div>
                                <h5 className="font-medium text-gray-800 dark:text-white">
                                    {role.name}
                                </h5>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => onEdit(role)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(role)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </SettingSection>
    );
}
