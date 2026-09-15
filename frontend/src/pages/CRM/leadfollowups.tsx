import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router";

interface Followup {
    _id: string;
    leadName: string;
    mobile: string;
    status: string;
    remark: string;
    nextFollowupDate: string;
    createdAt: string;
}

function LeadFollowup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const [followups, setFollowups] = useState<Followup[]>([]);

    const getReport = async () => {
        try {
            setLoading(true);

            const response = await api.post("/lead/leadfollowupreport", {
                startDate,
                endDate,
            });

            setFollowups(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReport();
    }, []);

    return (
        <>
            <Loader loading={loading} text="Loading Report..." />

            <PageBreadcrumb pageTitle="Lead Follow-up Report" />

            <ComponentCard title="Lead Follow-up Report">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
                    <div className="w-full">
                        <label className="mb-2 block text-sm font-medium">Start Date</label>

                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <div className="w-full">
                        <label className="mb-2 block text-sm font-medium">End Date</label>

                        <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <button
                        onClick={getReport}
                        className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                    >
                        Get Report
                    </button>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Lead</th>

                                <th className="p-4 text-left">Mobile</th>

                                <th className="p-4 text-left">Status</th>

                                <th className="p-4 text-left">Follow-up Date</th>

                                <th className="p-4 text-left">Remark</th>

                                <th className="p-4 text-left">Next Follow-up</th>
                            </tr>
                        </thead>

                        <tbody>
                            {followups.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-gray-500">
                                        No Record Found
                                    </td>
                                </tr>
                            ) : (
                                followups.map((item) => (
                                    <tr key={item._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 font-medium">{item.leadName}</td>

                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/leadprofile/${item.leadId}`
                                                    )
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {item.mobile}
                                            </button>
                                        </td>

                                        <td className="p-4">
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                        </td>

                                        <td className="max-w-sm p-4">{item.leadRemark}</td>

                                        <td className="p-4">
                                            {item.nextFollowupDate
                                                ? new Date(
                                                      item.nextFollowupDate
                                                  ).toLocaleDateString("en-GB")
                                                : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </ComponentCard>
        </>
    );
}

export default LeadFollowup;
