import SettingSection from "./SettingSection";

interface CustomerSetup {
    sources?: string[];
    occupations?: string[];
    addresses?: string[];
}

interface Props {
    data?: CustomerSetup;
    onConfigure: () => void;
}

export default function CustomerSetupSection({ data, onConfigure }: Props) {
    const sources = data?.sources ?? [];
    const occupations = data?.occupations ?? [];
    const addresses = data?.addresses ?? [];

    return (
        <SettingSection
            id="customer"
            title="Customer Setup"
            description="Manage customer master data and enrollment options."
            onConfigure={onConfigure}
        >
            <div className="grid gap-5 md:grid-cols-3">
                <SummaryCard title="Customer Sources" count={sources.length} items={sources} />

                <SummaryCard title="Occupations" count={occupations.length} items={occupations} />

                <SummaryCard title="Addresses" count={addresses.length} items={addresses} />
            </div>
        </SettingSection>
    );
}

interface SummaryCardProps {
    title: string;
    count: number;
    items: string[];
}

function SummaryCard({ title, count, items }: SummaryCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>

                <span className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 rounded-full px-2.5 py-1 text-xs font-semibold">
                    {count}
                </span>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No records found</p>
            ) : (
                <div className="space-y-2">
                    {items.slice(0, 4).map((item, index) => (
                        <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            • {item}
                        </div>
                    ))}

                    {items.length > 4 && (
                        <div className="text-brand-600 pt-2 text-xs">+{items.length - 4} more</div>
                    )}
                </div>
            )}
        </div>
    );
}
