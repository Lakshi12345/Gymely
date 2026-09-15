import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Insight {
    type: "danger" | "warning" | "success" | "info";
    title: string;
    description: string;
}

interface Props {
    insights: Insight[];
}

export default function AIInsights({ insights }: Props) {
    const navigate = useNavigate();

    const colors = {
        danger: "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20",

        warning:
            "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-500/10 dark:border-yellow-500/20",

        success:
            "bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20",

        info: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20",
    };

    const icons = {
        danger: "🔴",
        warning: "🟠",
        success: "🟢",
        info: "🔵",
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold">🤖 AI Business Insights</h3>

                <p className="text-sm text-gray-500">Smart recommendations for today</p>
            </div>

            <div className="space-y-3 p-4">
                {insights.map((item, index) => (
                    <div key={index} className={`rounded-xl border p-4 ${colors[item.type]}`}>
                        <div className="flex gap-3">
                            <div className="text-xl">{icons[item.type]}</div>

                            <div>
                                <h4 className="font-semibold">{item.title}</h4>

                                <p className="mt-1 text-sm opacity-80">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/dashboard/business-report")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View Business Report
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
