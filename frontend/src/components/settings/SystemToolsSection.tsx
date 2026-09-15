import {
    FolderIcon as DatabaseIcon,
    ArrowUpIcon as UploadIcon,
    ArrowRightIcon as RefreshIcon,
    DownloadIcon,
    FileIcon,
} from "../../icons";

import SettingSection from "./SettingSection";

interface Props {
    onBackup?: () => void;
    onExport?: () => void;
    onImport?: () => void;
    onClearCache?: () => void;
    onViewLogs?: () => void;
}

export default function SystemToolsSection({
    onBackup,
    onExport,
    onImport,
    onClearCache,
    onViewLogs,
}: Props) {
    return (
        <SettingSection
            id="system"
            title="System Tools"
            description="Database management, import/export and maintenance tools."
        >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <ToolCard
                    icon={<DatabaseIcon className="h-6 w-6" />}
                    title="Database Backup"
                    description="Create a full backup of your gym database."
                    onClick={onBackup}
                />

                <ToolCard
                    icon={<DownloadIcon className="h-6 w-6" />}
                    title="Export Data"
                    description="Export members, payments and reports."
                    onClick={onExport}
                />

                <ToolCard
                    icon={<UploadIcon className="h-6 w-6" />}
                    title="Import Data"
                    description="Import members or other records."
                    onClick={onImport}
                />

                <ToolCard
                    icon={<RefreshIcon className="h-6 w-6" />}
                    title="Clear Cache"
                    description="Refresh cached application data."
                    onClick={onClearCache}
                />

                <ToolCard
                    icon={<FileIcon className="h-6 w-6" />}
                    title="System Logs"
                    description="View application logs and diagnostics."
                    onClick={onViewLogs}
                />
            </div>
        </SettingSection>
    );
}

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

function ToolCard({ icon, title, description, onClick }: ToolCardProps) {
    return (
        <button
            onClick={onClick}
            className="group hover:border-brand-500 dark:hover:border-brand-400 rounded-xl border border-gray-200 p-5 text-left transition-all hover:shadow-md dark:border-gray-700"
        >
            <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                {icon}
            </div>

            <h4 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h4>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </button>
    );
}
