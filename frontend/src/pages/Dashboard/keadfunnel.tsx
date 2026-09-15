import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
    data: {
        newLeads: number;
        contacted: number;
        followup: number;
        trial: number;
        joined: number;
    };
}

export default function LeadFunnel({ data }: Props) {
    const navigate = useNavigate();

    const stages = [
        {
            title: "New Leads",
            value: data.newLeads,
            color: "bg-blue-500",
        },
        {
            title: "Contacted",
            value: data.contacted,
            color: "bg-cyan-500",
        },
        {
            title: "Follow-up",
            value: data.followup,
            color: "bg-yellow-500",
        },
        {
            title: "Trial",
            value: data.trial,
            color: "bg-purple-500",
        },
        {
            title: "Joined",
            value: data.joined,
            color: "bg-green-500",
        },
    ];

    const max = Math.max(...stages.map((x) => x.value));

    const conversion = data.newLeads === 0 ? 0 : ((data.joined / data.newLeads) * 100).toFixed(1);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Lead Funnel</h3>

                <p className="text-sm text-gray-500">Lead conversion overview</p>
            </div>

            <div className="space-y-5 p-4">
                {stages.map((item) => (
                    <div key={item.title}>
                        <div className="mb-2 flex justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {item.title}
                            </span>

                            <span className="font-semibold text-gray-800 dark:text-white">
                                {item.value}
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                            <div
                                className={`${item.color} h-full rounded-full`}
                                style={{
                                    width: `${(item.value / max) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}

                <div className="mt-6 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                    <p className="text-sm text-gray-500">Overall Conversion</p>

                    <h2 className="mt-1 text-3xl font-bold text-green-600">{conversion}%</h2>
                </div>
            </div>

            <button
                onClick={() => navigate("/dashboard/leadall")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                Open CRM
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
