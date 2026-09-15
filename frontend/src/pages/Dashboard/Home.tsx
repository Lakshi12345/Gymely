import PageMeta from "../../components/common/PageMeta";
import DashboardOverview from "./dashboardoverview.tsx";
import TodayTasks from "./todaytask.tsx";
import CollectionAnalytics from "./collectionanalytics.tsx";
import MembershipRenewal from "./membershiprenewal.tsx";
import TodayFollowups from "./todayfollowups.tsx";
import RecentTransactions from "./recenttransactions.tsx";
import LeadFunnel from "./keadfunnel.tsx";
import AttendanceAnalytics from "./AttendanceAnalytics.tsx";
import ActivityTimeline from "./ActivityTimeline.tsx";
import AIInsights from "./AIInsights.tsx";
import UpcomingPendingPayments from "./PendingPayment.tsx";

export default function Home() {
    return (
        <>
            <PageMeta title="Dashboard" description="Gymoryx Dashboard" />

            <div className="space-y-6">
                {/* Overview */}
                <DashboardOverview
                    data={{
                        todayCollection: 18450,
                        expectedCollection: 42000,
                        attendance: 183,
                        newLeads: 12,
                        todayFollowups: 8,
                        expiringToday: 6,
                    }}
                />

                {/* Charts */}

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-12">
                        <CollectionAnalytics
                            data={{
                                today: 18450,
                                yesterday: 15200,
                                week: 112000,
                                month: 482500,
                                growth: 12.5,
                                chart: [12000, 18000, 22000, 15000, 28000, 24000, 18450],
                            }}
                        />
                    </div>
                </div>
                {/* Tasks */}
                <TodayTasks
                    data={{
                        followups: 8,
                        renewals: 6,
                        ptSessions: 12,
                        pendingPayments: 28000,
                        newLeads: 5,
                        birthdays: 2,
                    }}
                />
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-6">
                        <MembershipRenewal
                            members={[
                                {
                                    _id: "1",
                                    name: "Lakshikanta Gorai",
                                    mobile: "7632914836",
                                    packageName: "Gold",
                                    expiryDate: "2026-07-03",
                                    daysLeft: 0,
                                },
                            ]}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <UpcomingPendingPayments
                            totalOutstanding={58500}
                            members={[
                                {
                                    _id: "1",
                                    name: "Lakshikanta Gorai",
                                    packageName: "Gold Membership",
                                    remainingAmount: 5000,
                                    dueDate: "2026-07-04",
                                    daysLeft: 1,
                                },
                                {
                                    _id: "2",
                                    name: "Rahul Singh",
                                    packageName: "Silver Membership",
                                    remainingAmount: 2500,
                                    dueDate: "2026-07-05",
                                    daysLeft: 2,
                                },
                                {
                                    _id: "3",
                                    name: "Amit Kumar",
                                    packageName: "Premium Membership",
                                    remainingAmount: 8000,
                                    dueDate: "2026-07-08",
                                    daysLeft: 5,
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* Bottom Row */}

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-6">
                        <TodayFollowups
                            followups={[
                                {
                                    _id: "1",
                                    name: "Lakshikanta Gorai",
                                    mobile: "7632914836",
                                    status: "Interested",
                                    nextFollowupDate: "2026-07-03",
                                },
                                {
                                    _id: "2",
                                    name: "Rahul Singh",
                                    mobile: "9876543210",
                                    status: "Follow Up",
                                    nextFollowupDate: "2026-07-03",
                                },
                            ]}
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <RecentTransactions
                            transactions={[
                                {
                                    _id: "1",
                                    memberName: "Lakshikanta Gorai",
                                    purpose: "Gold Membership",
                                    paymentMode: "Cash",
                                    amount: 3000,
                                    status: "Paid",
                                    createdAt: "",
                                },
                                {
                                    _id: "2",
                                    memberName: "Rahul Singh",
                                    purpose: "PT Renewal",
                                    paymentMode: "UPI",
                                    amount: 8000,
                                    status: "Paid",
                                    createdAt: "",
                                },
                                {
                                    _id: "3",
                                    memberName: "Amit Kumar",
                                    purpose: "Protein Purchase",
                                    paymentMode: "Card",
                                    amount: 2500,
                                    status: "Pending",
                                    createdAt: "",
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-6">
                        <LeadFunnel
                            data={{
                                newLeads: 120,
                                contacted: 95,
                                followup: 62,
                                trial: 34,
                                joined: 18,
                            }}
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <AttendanceAnalytics
                            data={{
                                today: 183,
                                yesterday: 165,
                                morning: 54,
                                evening: 129,
                                peakHour: "7 PM",
                                chart: [10, 18, 25, 15, 20, 40, 80, 65],
                            }}
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <ActivityTimeline
                            activities={[
                                {
                                    _id: "1",
                                    title: "Lakshikanta Gorai",
                                    subtitle: "Joined Gold Membership",
                                    time: "2 min ago",
                                    type: "member",
                                },
                                {
                                    _id: "2",
                                    title: "Rahul Singh",
                                    subtitle: "Paid ₹3000",
                                    time: "10 min ago",
                                    type: "payment",
                                },
                                {
                                    _id: "3",
                                    title: "Amit Kumar",
                                    subtitle: "Follow-up Completed",
                                    time: "25 min ago",
                                    type: "followup",
                                },
                            ]}
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <AIInsights
                            insights={[
                                {
                                    type: "danger",
                                    title: "8 Follow-ups Pending",
                                    description:
                                        "Complete them before 12 PM to improve conversion.",
                                },
                                {
                                    type: "warning",
                                    title: "6 Memberships Expiring",
                                    description: "Potential revenue ₹18,000. Call members today.",
                                },
                                {
                                    type: "success",
                                    title: "Attendance Increased",
                                    description: "Attendance is 14% higher than yesterday.",
                                },
                                {
                                    type: "info",
                                    title: "PT Opportunity",
                                    description: "15 active members don't have Personal Training.",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
