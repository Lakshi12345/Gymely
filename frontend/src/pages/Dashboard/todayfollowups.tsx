import { useNavigate } from "react-router-dom";
import { PhoneCall, ChevronRight } from "lucide-react";

interface Followup {
    _id: string;
    name: string;
    mobile: string;
    status: string;
    nextFollowupDate: string;
}

interface Props {
    followups: Followup[];
}

export default function TodayFollowups({ followups }: Props) {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Today's Follow-ups
                    </h3>

                    <p className="text-sm text-gray-500">Leads waiting for your action</p>
                </div>

                <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600 dark:bg-green-500/10">
                    {followups.length}
                </div>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
                {followups.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">🎉 No Follow-ups Today</div>
                ) : (
                    followups.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10">
                                    <PhoneCall size={20} />
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">{item.mobile}</p>

                                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/dashboard/leadprofile/${item._id}`)}
                                className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                            >
                                Follow-up
                            </button>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate("/dashboard/leadfollowup")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View All
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
