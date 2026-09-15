import {
    UserIcon,
    CreditCardIcon,
    CalendarIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface ProgressBarProps {
    currentStep?: number;
}

const steps = [
    {
        id: 1,
        title: "Member",
        icon: UserIcon,
    },
    {
        id: 2,
        title: "Payment",
        icon: CreditCardIcon,
    },
    {
        id: 3,
        title: "Membership",
        icon: CalendarIcon,
    },
    {
        id: 4,
        title: "Finish",
        icon: CheckCircleIcon,
    },
];

export default function ProgressBar({ currentStep = 1 }: ProgressBarProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    const completed = currentStep > step.id;
                    const active = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-1 items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                                        completed
                                            ? "border-green-600 bg-green-600 text-white"
                                            : active
                                              ? "border-brand-500 bg-brand-500 text-white"
                                              : "border-gray-300 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-900"
                                    }`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                <span
                                    className={`mt-3 text-sm font-medium ${
                                        active
                                            ? "text-brand-600"
                                            : completed
                                              ? "text-green-600"
                                              : "text-gray-500"
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </div>

                            {index !== steps.length - 1 && (
                                <div
                                    className={`mx-4 h-1 flex-1 rounded-full ${
                                        currentStep > step.id
                                            ? "bg-green-500"
                                            : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
