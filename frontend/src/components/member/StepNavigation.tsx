import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface StepNavigationProps {
    step: number;
    totalSteps?: number;
    loading?: boolean;
    disableNext?: boolean;
    onBack: () => void;
    onNext: () => void;
    nextLabel?: string;
    backLabel?: string;
}

export default function StepNavigation({
    step,
    totalSteps = 4,
    loading = false,
    disableNext = false,
    onBack,
    onNext,
    nextLabel,
    backLabel = "Back",
}: StepNavigationProps) {
    const isLastStep = step === totalSteps;

    return (
        <div className="sticky bottom-4 z-20 mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={step === 1}
                    className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    {backLabel}
                </button>

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        Step {step} of {totalSteps}
                    </p>

                    <div className="mt-2 flex gap-2">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-12 rounded-full transition-all ${
                                    index + 1 <= step
                                        ? "bg-brand-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onNext}
                    disabled={disableNext || loading}
                    className="bg-brand-600 hover:bg-brand-700 flex h-10 items-center gap-2 rounded-lg px-6 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        "Loading..."
                    ) : (
                        <>
                            {nextLabel || (isLastStep ? "Finish" : "Continue")}

                            {!isLastStep && <ArrowRightIcon className="h-4 w-4" />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
