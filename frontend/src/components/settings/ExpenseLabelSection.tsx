import SettingSection from "./SettingSection";

interface ExpenseLabel {
    id: string;
    name: string;
    expenseCount?: number;
}

interface Props {
    data?: ExpenseLabel[];
    onConfigure: () => void;
}

export default function ExpenseLabelSection({ data = [], onConfigure }: Props) {
    return (
        <SettingSection
            id="expense"
            title="Expense Labels"
            description="Organize expenses using predefined labels."
            onConfigure={onConfigure}
        >
            {data.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No expense labels available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Labels</p>

                            <h4 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                {data.length}
                            </h4>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {data.slice(0, 8).map((label) => (
                            <div
                                key={label.id}
                                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                            >
                                <div>
                                    <h5 className="font-medium text-gray-800 dark:text-white">
                                        {label.name}
                                    </h5>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {label.expenseCount ?? 0} Expenses
                                    </p>
                                </div>

                                <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                    Label
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </SettingSection>
    );
}
