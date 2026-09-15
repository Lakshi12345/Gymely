interface EnrollFooterProps {
    loading?: boolean;
    onSubmit: () => void;
}

export default function EnrollFooter({ loading, onSubmit }: EnrollFooterProps) {
    return (
        <div className="sticky bottom-4 z-20 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <button
                onClick={onSubmit}
                disabled={loading}
                className="bg-brand-600 hover:bg-brand-700 flex h-11 w-full items-center justify-center rounded-lg px-6 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        Enrolling...
                    </>
                ) : (
                    "Enroll Member"
                )}
            </button>
        </div>
    );
}
