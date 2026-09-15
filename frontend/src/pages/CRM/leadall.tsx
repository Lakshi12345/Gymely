import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import api from "../../services/api.ts";
import toast from "react-hot-toast";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../components/common/Loader.tsx";
interface Lead {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    profile?: string;
}

function LeadAll() {
    const navigate = useNavigate();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFollowupModal, setShowFollowupModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [status, setStatus] = useState("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [nextFollowupDate, setNextFollowupDate] = useState(tomorrow);

    const [leadRemark, setLeadRemark] = useState("");

    useEffect(() => {
        getLeads();
    }, []);

    const getLeads = async () => {
        try {
            // Replace with your API
            const response = await api.get("/lead/getallleads");
            setLeads(response.data.data);

            // setLeads([]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (lead: Lead) => {
        setSelectedLead(lead);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await api.delete(`/lead/deleteLead/${selectedLead._id}`);
            setLeads((prev) => prev.filter((item) => item._id !== selectedLead?._id));
            setShowDeleteModal(false);
            toast.success(response.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateFollowup = async () => {
        setLoading(true);
        try {
            await api.post("/lead/leadfollowup", {
                leadId: selectedLead._id,
                status,
                leadRemark,
                nextFollowupDate,
            });
            setShowFollowupModal(false);
            getLeads();
            setLoading(false);
            toast.success("Followup updated successfully");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Loader loading={loading} text="Loading ..." />
            <PageBreadcrumb pageTitle="All Prospects" />

            <div className="space-y-6">
                <ComponentCard title="👤 Prospect List">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold">All Prospects</h1>

                        <button
                            onClick={() => navigate("/dashboard/leadadd")}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            + Add Prospect
                        </button>
                    </div>

                    <div className="overflow-auto rounded-xl bg-white shadow">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Contact</th>
                                    <th className="p-4 text-left">Location</th>
                                    <th className="p-4 text-left">Purpose</th>
                                    <th className="p-4 text-left">Services</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Next Action</th>
                                    <th className="p-4 text-left">Remark</th>
                                    <th className="p-4 text-left">Created</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && leads.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No Prospect Found
                                        </td>
                                    </tr>
                                )}

                                {leads.map((lead) => (
                                    <tr key={lead._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-semibold">{lead.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {lead.gender}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/leadprofile/${lead._id}`
                                                        )
                                                    }
                                                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    {lead.mobile}
                                                </button>
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                {lead.email}
                                            </div>
                                        </td>

                                        <td className="p-4">{lead.location}</td>

                                        <td className="p-4">{lead.purpose}</td>

                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {lead.services.map((service, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    lead.status === "New"
                                                        ? "bg-green-100 text-green-700"
                                                        : lead.status === "Follow Up"
                                                          ? "bg-yellow-100 text-yellow-700"
                                                          : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div>{lead.nextAction}</div>

                                            <div className="text-xs text-gray-500">
                                                {lead.nextActionDate
                                                    ? new Date(
                                                          lead.nextActionDate
                                                      ).toLocaleDateString("en-GB")
                                                    : "-"}
                                            </div>
                                        </td>

                                        <td
                                            className="max-w-[220px] truncate p-4"
                                            title={lead.remark}
                                        >
                                            {lead.remark}
                                        </td>

                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setShowFollowupModal(true);
                                                    }}
                                                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                                                >
                                                    📞 Follow-up
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/leadprofile/${lead._id}`
                                                        )
                                                    }
                                                    className="rounded-lg border border-indigo-200 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50"
                                                >
                                                    Profile
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(lead)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ComponentCard>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/50">
                    <div className="w-[420px] rounded-2xl bg-white p-8 text-center shadow-2xl">
                        <div className="mb-5 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                <span className="text-4xl">🗑️</span>
                            </div>
                        </div>

                        <h2 className="mb-2 text-2xl font-bold">Delete Prospect?</h2>

                        <p className="mb-8 text-gray-500">
                            Are you sure you want to delete
                            <span className="font-semibold text-black">
                                {" "}
                                {selectedLead?.fullName}
                            </span>
                            ?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full rounded-xl border border-gray-300 py-3 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="w-full rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFollowupModal && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50">
                    <div className="w-[550px] rounded-xl bg-white p-6 shadow-2xl">
                        <h2 className="mb-6 text-2xl font-bold">Update Follow-up</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-1 block text-sm font-semibold">
                                    Last Remark
                                </label>

                                <div className="rounded-lg bg-gray-100 p-3 text-gray-700">
                                    {selectedLead?.remark || "-"}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">
                                    Update Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-lg border p-3"
                                >
                                    <option value="New">🆕 New Enquiry</option>

                                    <option value="Attempted Contact">📞 Attempted Contact</option>

                                    <option value="Contacted">☎️ Contacted</option>

                                    <option value="Follow-up Scheduled">
                                        📅 Follow-up Scheduled
                                    </option>

                                    <option value="Visit Scheduled">🏋️ Gym Visit Scheduled</option>

                                    <option value="Visited Gym">🚶 Visited Gym</option>

                                    <option value="Trial Session">💪 Trial Session Taken</option>

                                    <option value="Negotiation">💰 Fee Discussion</option>

                                    <option value="Interested">✅ Interested</option>

                                    <option value="Thinking">🤔 Thinking</option>

                                    <option value="Joined">🎉 Joined</option>

                                    <option value="Lost">❌ Lost</option>

                                    <option value="Not Interested">🚫 Not Interested</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">
                                    Next Follow-up Date
                                </label>

                                <ReactDatePicker
                                    selected={nextFollowupDate}
                                    onChange={(date: Date | null) => setNextFollowupDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Follow-up Date"
                                    className="h-11 w-full rounded-full border border-gray-300 px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold">
                                    Enter Remark
                                </label>

                                <textarea
                                    rows={4}
                                    value={leadRemark}
                                    onChange={(e) => setLeadRemark(e.target.value)}
                                    className="w-full rounded-lg border p-3"
                                    placeholder="Write today's discussion..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setShowFollowupModal(false)}
                                className="rounded-lg border px-5 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateFollowup}
                                className="rounded-lg bg-green-700 px-6 py-2 text-white hover:bg-green-800"
                            >
                                Save Follow-up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LeadAll;
