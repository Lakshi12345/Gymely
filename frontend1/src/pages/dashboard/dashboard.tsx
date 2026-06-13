
import DashboardCard from "../../components/DashboardCard.tsx";
import DashboardLayout from "../../layouts/DashboardLayout.tsx";

function Dashboard() {
    return (
        <DashboardLayout>

            <h2 className="text-2xl font-bold mb-6">
                Welcome Back 👋
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                    title="Total Members"
                    value="120"
                />

                <DashboardCard
                    title="Active Members"
                    value="95"
                />

                <DashboardCard
                    title="Monthly Revenue"
                    value="₹45,000"
                />

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;