import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../services/api";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";

function LeadProfile() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [lead, setLead] = useState<[]>();
    const [followups, setFollowups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showFollowupModal, setShowFollowupModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any[]>([]);
    const [status, setStatus] = useState("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [nextFollowupDate, setNextFollowupDate] = useState(tomorrow);

    const [leadRemark, setLeadRemark] = useState("");

    useEffect(() => {
        getLead();
    }, []);

    const getLead = async () => {
        setLoading(true);
        const response = await api.get(`/lead/getprofile/${id}`);

        // console.log(response.data.data.lead);
        setLead(response.data.data.lead);
        setFollowups(response.data.data.followups);
        setLoading(false);
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
            getLead();
            setLoading(false);
            toast.success("Followup updated successfully");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Loader loading={loading} text="Loading Profile..." />

            <PageBreadcrumb pageTitle="Lead Profile" />
            <div className="space-y-6">
                <ComponentCard title="Lead Summary">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">{lead?.name}</h2>

                            <p className="mt-1 text-gray-500">{lead?.mobile}</p>

                            <p className="text-gray-500">{lead?.email}</p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedLead(lead);
                                setShowFollowupModal(true);
                            }}
                            className="w-full rounded-lg bg-green-700 px-5 py-2 text-white md:w-auto"
                        >
                            Update Follow-up
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-gray-400">Gender</p>

                            <p>{lead?.gender}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Location</p>

                            <p>{lead?.location}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Purpose</p>

                            <p>{lead?.purpose}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Status</p>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                                {lead?.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-400">Interested Services</p>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {lead?.services.map((service) => (
                                <span
                                    key={service}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-400">Current Remark</p>

                        <div className="mt-2 rounded-lg bg-gray-100 p-4">{lead?.remark}</div>
                    </div>
                </ComponentCard>

                <ComponentCard title="Lead Information">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="text-sm text-gray-400">Name</label>

                            <p>{lead?.name}</p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Mobile</label>

                            <p>{lead?.mobile}</p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Email</label>

                            <p>{lead?.email}</p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Next Follow-up</label>

                            <p>
                                {lead?.nextActionDate
                                    ? new Date(lead.nextActionDate).toLocaleDateString("en-GB")
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </ComponentCard>
                <ComponentCard title="📋 Follow-up Timeline">
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                        <div className="rounded-xl bg-white p-5 shadow">
                            <p className="text-sm text-gray-500">Total Follow-ups</p>

                            <h2 className="mt-2 text-3xl font-bold">{followups.length}</h2>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow">
                            <p className="text-sm text-gray-500">Current Status</p>

                            <h2 className="mt-2 text-xl font-semibold">{lead?.status}</h2>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow">
                            <p className="text-sm text-gray-500">Next Follow-up</p>

                            <h2 className="mt-2 text-lg">
                                {lead?.nextActionDate
                                    ? new Date(lead.nextActionDate).toLocaleDateString("en-GB")
                                    : "-"}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow">
                            <p className="text-sm text-gray-500">Lead Since</p>

                            <h2 className="mt-2 text-lg">
                                {lead?.createdAt
                                    ? new Date(lead.createdAt).toLocaleDateString("en-GB")
                                    : "-"}
                            </h2>
                        </div>
                    </div>
                    <div className="custom-scrollbar max-h-[600px] overflow-y-auto pr-2">
                        <div className="relative ml-4 border-l-2 border-gray-200">
                            {followups.length === 0 ? (
                                <div className="py-10 text-center text-gray-400">
                                    No Follow-up Available
                                </div>
                            ) : (
                                followups.map((item) => (
                                    <div key={item._id} className="relative mb-8 ml-6">
                                        {/* Timeline Dot */}

                                        <div className="absolute -left-[38px] h-5 w-5 rounded-full border-4 border-white bg-green-600 shadow"></div>

                                        {/* Card */}

                                        <div className="rounded-xl border bg-white p-5 shadow-sm">
                                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                    {item.status}
                                                </span>

                                                <div className="text-sm text-gray-500">
                                                    {new Date(item.createdAt).toLocaleString(
                                                        "en-GB"
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="font-medium">Remark</p>

                                                <p className="mt-1 text-gray-600">
                                                    {item.leadRemark}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm text-gray-400">
                                                    Next Follow-up
                                                </p>

                                                <p>
                                                    {item.nextFollowupDate
                                                        ? new Date(
                                                              item.nextFollowupDate
                                                          ).toLocaleDateString("en-GB")
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </ComponentCard>
            </div>

            {showFollowupModal && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-xl rounded-xl bg-white p-5 shadow-2xl md:p-6">
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

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setShowFollowupModal(false)}
                                className="w-full rounded-lg border py-2 sm:w-auto"
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

export default LeadProfile;
