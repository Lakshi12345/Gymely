import { useEffect, useState } from "react";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";

interface PermissionGroup {
    title: string;
    permissions: string[];
}

interface StaffRole {
    id?: string;

    name: string;

    description: string;

    permissions: string[];
}

interface StaffRoleModalProps {
    isOpen: boolean;
    onClose: () => void;

    data?: StaffRole[];

    loading?: boolean;

    onSave?: (roles: StaffRole[]) => void;
}

const permissionGroups: PermissionGroup[] = [
    {
        title: "Dashboard",
        permissions: ["dashboard.view"],
    },
    {
        title: "Members",
        permissions: [
            "members.view",
            "members.add",
            "members.edit",
            "members.delete",
        ],
    },
    {
        title: "Leads",
        permissions: [
            "leads.view",
            "leads.add",
            "leads.edit",
            "leads.delete",
        ],
    },
    {
        title: "Attendance",
        permissions: [
            "attendance.view",
            "attendance.mark",
            "attendance.edit",
        ],
    },
    {
        title: "Billing",
        permissions: [
            "billing.view",
            "billing.create",
            "billing.refund",
        ],
    },
    {
        title: "Reports",
        permissions: [
            "reports.view",
            "reports.export",
        ],
    },
    {
        title: "Expenses",
        permissions: [
            "expenses.view",
            "expenses.add",
            "expenses.edit",
        ],
    },
    {
        title: "Settings",
        permissions: [
            "settings.view",
            "settings.edit",
        ],
    },
];

const emptyRole: StaffRole = {
    name: "",

    description: "",

    permissions: [],
};

export default function StaffRoleModal({
                                           isOpen,
                                           onClose,
                                           data = [],
                                           loading = false,
                                           onSave,
                                       }: StaffRoleModalProps) {
                                           const [role, setRole] = useState<StaffRole>(emptyRole);

                                           useEffect(() => {
                                               if (!isOpen) return;

                                               if (data.length) {
                                                   setRole(data[0]);
                                               } else {
                                                   setRole(emptyRole);
                                               }
                                           }, [isOpen, data]);

                                           const togglePermission = (permission: string) => {
                                               setRole((prev) => ({
                                                   ...prev,

                                                   permissions: prev.permissions.includes(
                                                       permission
                                                   )
                                                       ? prev.permissions.filter(
                                                             (p) => p !== permission
                                                         )
                                                       : [...prev.permissions, permission],
                                               }));
                                           };

                                           const handleSubmit = () => {
                                               onSave?.([role]);
                                           };

                                           return (
                                               <Modal
                                                   isOpen={isOpen}
                                                   onClose={onClose}
                                                   className="max-w-6xl"
                                               >
                                                   {/* Header */}

                                                   <div className="border-b border-gray-200 px-8 py-6">
                                                       <h2 className="text-2xl font-semibold">
                                                           Staff Role
                                                       </h2>

                                                       <p className="mt-2 text-sm text-gray-500">
                                                           Create roles and assign module
                                                           permissions.
                                                       </p>
                                                   </div>

                                                   {/* Body */}

                                                   <div className="max-h-[70vh] overflow-y-auto p-8">
                                                       <div className="grid gap-6">
                                                           <div>
                                                               <Label>Role Name</Label>

                                                               <Input
                                                                   value={role.name}
                                                                   onChange={(e) =>
                                                                       setRole({
                                                                           ...role,

                                                                           name: e.target.value,
                                                                       })
                                                                   }
                                                               />
                                                           </div>

                                                           <div>
                                                               <Label>Description</Label>

                                                               <Input
                                                                   value={role.description}
                                                                   onChange={(e) =>
                                                                       setRole({
                                                                           ...role,

                                                                           description:
                                                                               e.target.value,
                                                                       })
                                                                   }
                                                               />
                                                           </div>

                                                           {/* Permissions */}

                                                           <div>
                                                               <Label>Permissions</Label>

                                                               <div className="mt-4 space-y-6">
                                                                   {permissionGroups.map(
                                                                       (group) => (
                                                                           <div
                                                                               key={group.title}
                                                                               className="rounded-xl border border-gray-200 p-5 dark:border-gray-700"
                                                                           >
                                                                               <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                                                                   {group.title}
                                                                               </h4>

                                                                               <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                                                                   {group.permissions.map(
                                                                                       (
                                                                                           permission
                                                                                       ) => (
                                                                                           <label
                                                                                               key={
                                                                                                   permission
                                                                                               }
                                                                                               className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 px-3 py-2 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                                                                           >
                                                                                               <input
                                                                                                   type="checkbox"
                                                                                                   checked={role.permissions.includes(
                                                                                                       permission
                                                                                                   )}
                                                                                                   onChange={() =>
                                                                                                       togglePermission(
                                                                                                           permission
                                                                                                       )
                                                                                                   }
                                                                                                   className="h-4 w-4 rounded"
                                                                                               />

                                                                                               <span className="text-sm text-gray-700 dark:text-gray-300">
                                                                                                   {permission
                                                                                                       .replace(
                                                                                                           ".",
                                                                                                           " "
                                                                                                       )
                                                                                                       .replace(
                                                                                                           /\b\w/g,
                                                                                                           (
                                                                                                               c
                                                                                                           ) =>
                                                                                                               c.toUpperCase()
                                                                                                       )}
                                                                                               </span>
                                                                                           </label>
                                                                                       )
                                                                                   )}
                                                                               </div>
                                                                           </div>
                                                                       )
                                                                   )}
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>

                                                   {/* Footer */}

                                                   <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-8 py-5 dark:border-gray-800">
                                                       <Button variant="outline" onClick={onClose}>
                                                           Cancel
                                                       </Button>

                                                       <Button
                                                           onClick={handleSubmit}
                                                           disabled={loading}
                                                       >
                                                           {loading ? "Saving..." : "Save Role"}
                                                       </Button>
                                                   </div>
                                               </Modal>
                                           );
                                       }