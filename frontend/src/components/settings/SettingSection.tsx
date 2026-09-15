import { ReactNode } from "react";
import Button from "../ui/button/Button";
import { PencilIcon } from "../../icons";

interface SettingSectionProps {
    id: string;
    title: string;
    description?: string;
    children: ReactNode;
    onConfigure?: () => void;
}

export default function SettingSection({
    id,
    title,
    description,
    children,
    onConfigure,
}: SettingSectionProps) {
    return (
        <section
            id={id}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        >
            {/* Header */}

            <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>

                    {description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>

                {onConfigure && (
                    <Button
                        size="sm"
                        variant="outline"
                        startIcon={<PencilIcon />}
                        onClick={onConfigure}
                    >
                        Configure
                    </Button>
                )}
            </div>

            {/* Content */}

            <div className="p-6">{children}</div>
        </section>
    );
}
