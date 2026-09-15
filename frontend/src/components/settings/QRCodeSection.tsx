import SettingSection from "./SettingSection";

interface QRCodeItem {
    id: string;
    name: string;
    generated: boolean;
    lastUpdated?: string;
}

interface Props {
    data?: QRCodeItem[];
    onConfigure: () => void;
}

export default function QRCodeSection({ data = [], onConfigure }: Props) {
    return (
        <SettingSection
            id="qr"
            title="QR Codes"
            description="Manage QR codes used across your gym."
            onConfigure={onConfigure}
        >
            {data.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No QR Codes available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total QR Codes
                            </p>

                            <h4 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                {data.length}
                            </h4>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                            >
                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white">
                                        {item.name}
                                    </h5>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {item.lastUpdated
                                            ? `Updated: ${item.lastUpdated}`
                                            : "No update history"}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        item.generated
                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    }`}
                                >
                                    {item.generated ? "Generated" : "Pending"}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </SettingSection>
    );
}
