interface SettingRowProps {
    label: string;
    value?: React.ReactNode;
    border?: boolean;
}

export default function SettingRow({ label, value, border = true }: SettingRowProps) {
    return (
        <div
            className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between ${
                border ? "border-b border-gray-200 dark:border-gray-800" : ""
            }`}
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

            <div className="text-sm font-medium text-gray-800 dark:text-white">{value ?? "-"}</div>
        </div>
    );
}
