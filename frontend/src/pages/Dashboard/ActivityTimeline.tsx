import { useNavigate } from "react-router-dom";
import { UserPlus, IndianRupee, PhoneCall, CalendarCheck, ChevronRight } from "lucide-react";

interface Activity {
    _id: string;
    title: string;
    subtitle: string;
    time: string;
    type: string;
}

interface Props {
    activities: Activity[];
}

export default function ActivityTimeline({ activities }: Props) {
    const navigate = useNavigate();

    const getIcon = (type: string) => {
        switch (type) {
            case "payment":
                return <IndianRupee size={18} className="text-green-600" />;

            case "member":
                return <UserPlus size={18} className="text-blue-600" />;

            case "followup":
                return <PhoneCall size={18} className="text-orange-600" />;

            default:
                return <CalendarCheck size={18} className="text-purple-600" />;
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Activity Timeline</h3>

                <p className="text-sm text-gray-500">Latest activities</p>
            </div>

            <div className="max-h-[450px] overflow-y-auto">
                {activities.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-start gap-4 border-b border-gray-100 px-4 py-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                    >
                        <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                            {getIcon(item.type)}
                        </div>

                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                                {item.title}
                            </h4>

                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                        </div>

                        <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/dashboard/activity")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View All
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
