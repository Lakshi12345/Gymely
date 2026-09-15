import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/AuthPages/SignIn.tsx";
import Register from "../pages/AuthPages/SignUp.tsx";
import Dashboard from "../pages/Dashboard/Home.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import PackageAdd from "../pages/packages/packageAdd.tsx";
import Services from "../pages/settings/services.tsx";
import PackageAll from "../pages/packages/packageAll.tsx";
import PackageEdit from "../pages/packages/packageEdit.tsx";
import MemberAdd from "../pages/members/memberAdd.tsx";
import LeadAdd from "../pages/CRM/leadadd.tsx";
import LeadAll from "../pages/CRM/leadall.tsx";
import LeadProfile from "../pages/CRM/leadprofile.tsx";
import LeadFollowup from "../pages/CRM/leadfollowups.tsx";
import Settings from "../pages/settings/Settings.tsx";
import OperatorAdd from "../pages/operator/operatorAdd.tsx";
import OperatorAll from "../pages/operator/operatorAll.tsx";
import StaffAdd from "../pages/staff/StaffAdd.tsx";
import StaffAll from "../pages/staff/StaffAll.tsx";
import MemberAll from "../pages/members/memberAll.tsx";
import Memberships from "../pages/members/memberships.tsx";
import MemberFollowupAll from "../pages/members/followup.tsx";
import AbsenteeMemberAll from "../pages/members/absenteemembers.tsx";
import BirthdayMemberAll from "../pages/members/birthdaymember.tsx";
import AttendanceAll from "../pages/members/attendanceall.tsx";
import ActiveMemberAll from "../pages/members/activememberhub.tsx";
import ExecutiveDashboard from "../pages/Analytics/ExecutiveDashboard.tsx";
import BusinessInsights from "../pages/Analytics/businessInsights.tsx";
import CheckInInsights from "../pages/Analytics/checkIninsights.tsx";
import TeamPerformance from "../pages/Analytics/TeamPerformance.tsx";
import BillingReport from "../pages/Sales Reports/BillingReport.tsx";
import CustomerSales from "../pages/Sales Reports/CustomerSales.tsx";
import PackageSales from "../pages/Sales Reports/PackageSales.tsx";
import OperatorSales from "../pages/Sales Reports/OperatorSales.tsx";
import DayWiseSummary from "../pages/Operational Reports/DayWiseSummary.tsx";
import AttendanceReport from "../pages/Operational Reports/attendancereport.tsx";
import ExpenseReport from "../pages/Operational Reports/expensereport.tsx";
import LeadReport from "../pages/Operational Reports/leadreport.tsx";
import BillingCenter from "../pages/billings/invoicelist.tsx";
import Logout from "../pages/AuthPages/Logout.tsx";
import MemberProfile from "../pages/members/memberProfile.tsx";
import EditOperator from "../pages/operator/operatorEdit.tsx";
import EditSaff from "../pages/staff/EditStaff.tsx";
import RenewMember from "../pages/members/memberRenew.tsx";
import UploadMembers from "../pages/members/upload.tsx";

function AppRoutes() {
    const token = localStorage.getItem("token");

    return (
        <>
            <ScrollToTop />

            <Routes>
                {/* Login Route */}
                <Route
                    path="/login"
                    element={token ? <Navigate to="/dashboard/home" replace /> : <Login />}
                />
                {/* Register Route */}
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard/logout" element={<Logout />} />
                {/* Layout Route */}
                <Route element={<AppLayout />}>
                    <Route
                        path="/dashboard/home"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/packageadd"
                        element={
                            <PrivateRoute>
                                <PackageAdd />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/services"
                        element={
                            <PrivateRoute>
                                <Services />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/PackageAll"
                        element={
                            <PrivateRoute>
                                <PackageAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/PackageEdit/:id"
                        element={
                            <PrivateRoute>
                                <PackageEdit />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/memberAdd"
                        element={
                            <PrivateRoute>
                                <MemberAdd />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/memberall"
                        element={
                            <PrivateRoute>
                                <MemberAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/leadadd"
                        element={
                            <PrivateRoute>
                                <LeadAdd />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/leadall"
                        element={
                            <PrivateRoute>
                                <LeadAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/leadprofile/:id"
                        element={
                            <PrivateRoute>
                                <LeadProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/leadfollowups"
                        element={
                            <PrivateRoute>
                                <LeadFollowup />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/settings"
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/operatoradd"
                        element={
                            <PrivateRoute>
                                <OperatorAdd />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/operatorall"
                        element={
                            <PrivateRoute>
                                <OperatorAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/operatorEdit/:id"
                        element={
                            <PrivateRoute>
                                <EditOperator />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/staffadd"
                        element={
                            <PrivateRoute>
                                <StaffAdd />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/staffedit/:id"
                        element={
                            <PrivateRoute>
                                <EditSaff />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/staffall"
                        element={
                            <PrivateRoute>
                                <StaffAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/memberships"
                        element={
                            <PrivateRoute>
                                <Memberships />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/memberfollowup"
                        element={
                            <PrivateRoute>
                                <MemberFollowupAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/absentee"
                        element={
                            <PrivateRoute>
                                <AbsenteeMemberAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/birthdaymembers"
                        element={
                            <PrivateRoute>
                                <BirthdayMemberAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/attendance"
                        element={
                            <PrivateRoute>
                                <AttendanceAll />
                            </PrivateRoute>
                        }
                    />{" "}
                    <Route
                        path="/dashboard/activememberhub"
                        element={
                            <PrivateRoute>
                                <ActiveMemberAll />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/executivedashboard"
                        element={
                            <PrivateRoute>
                                <ExecutiveDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/businessinsights"
                        element={
                            <PrivateRoute>
                                <BusinessInsights />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/checkininsights"
                        element={
                            <PrivateRoute>
                                <CheckInInsights />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/teamperformance"
                        element={
                            <PrivateRoute>
                                <TeamPerformance />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/billingreport"
                        element={
                            <PrivateRoute>
                                <BillingReport />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/customersales"
                        element={
                            <PrivateRoute>
                                <CustomerSales />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/packagesales"
                        element={
                            <PrivateRoute>
                                <PackageSales />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/operatorsales"
                        element={
                            <PrivateRoute>
                                <OperatorSales />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/daywisesummary"
                        element={
                            <PrivateRoute>
                                <DayWiseSummary />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/attendancereport"
                        element={
                            <PrivateRoute>
                                <AttendanceReport />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/expensereport"
                        element={
                            <PrivateRoute>
                                <ExpenseReport />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/leadreport"
                        element={
                            <PrivateRoute>
                                <LeadReport />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/invoicelist"
                        element={
                            <PrivateRoute>
                                <BillingCenter />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/dashboard/invoicelist/viewbill/:id" element={<BillingCenter />} />
                    <Route
                        path="/dashboard/profile/:id"
                        element={
                            <PrivateRoute>
                                <MemberProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/renewmebership/:id"
                        element={
                            <PrivateRoute>
                                <RenewMember />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/uploadMember/"
                        element={
                            <PrivateRoute>
                                <UploadMembers />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={token ? <Navigate to="/dashboard/home" replace /> : <Login />}
                />
            </Routes>
        </>
    );
}

export default AppRoutes;
