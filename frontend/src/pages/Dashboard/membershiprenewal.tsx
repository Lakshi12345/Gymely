import { useNavigate } from "react-router-dom";
import { CalendarClock, ChevronRight } from "lucide-react";

interface RenewalMember {
    _id: string;
    name: string;
    mobile: string;
    packageName: string;
    expiryDate: string;
    daysLeft: number;
}

interface MembershipRenewalProps {
    members: RenewalMember[];
}

export default function MembershipRenewal({ members }: MembershipRenewalProps) {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Membership Renewal
                    </h3>

                    <p className="text-sm text-gray-500">Members expiring in next 7 days</p>
                </div>

                <div className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 dark:bg-red-500/10">
                    {members.length}
                </div>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
                {members.length === 0 && (
                    <div className="py-12 text-center text-gray-500">🎉 No Membership Expiring</div>
                )}

                {members.map((member) => (
                    <div
                        key={member._id}
                        className="flex items-center justify-between border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10">
                                <CalendarClock size={20} />
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">
                                    {member.name}
                                </h4>

                                <p className="text-sm text-gray-500">{member.packageName}</p>

                                <p className="mt-1 text-xs text-red-600">
                                    {member.daysLeft === 0
                                        ? "Expires Today"
                                        : `${member.daysLeft} Day(s) Left`}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/dashboard/memberprofile/${member._id}`)}
                            className="bg-brand-500 hover:bg-brand-600 flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white transition"
                        >
                            Renew
                            <ChevronRight size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/dashboard/memberrenewal")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View All
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
