import Lead from "../models/Lead";
import LeadFollowup from "../models/LeadFollowup";

export const addLead = async (gymId: string, leadData: any) => {
    const data = {
        ...leadData,
        gymId,
        status: "New Enquiry",
        nextActionDate: leadData.nextActionDate ? new Date(leadData.nextActionDate) : null,
    };

    const response = await Lead.create([data]);
    return {
        members: response,
    };
};

export const leadGet = async (gymId: string) => {
    return await Lead.find({ gymId: gymId });
};
export const getleadprofile = async (gymId: string, leadId: string) => {
    const lead = await Lead.findOne({
        gymId,
        _id: leadId,
    });

    if (!lead) {
        throw new Error("Lead not found");
    }

    const followups = await LeadFollowup.find({
        gymId,
        leadId,
    }).sort({
        createdAt: -1,
    });

    return {
        lead,
        followups,
    };
};

export const leadDelete = async (gymId: string, leadId: string) => {
    const response = await Lead.findOneAndDelete({
        _id: leadId,
        gymId,
    });

    if (!response) {
        throw new Error("Lead not found");
    }

    return response;
};

export const leadFollowupAdd = async (gymId: string, data: any) => {
    if (data.nextFollowupDate) {
        data.nextFollowupDate = new Date(data.nextFollowupDate);
    }

    // Get lead details
    const lead = await Lead.findOne({
        _id: data.leadId,
        gymId,
    });

    if (!lead) {
        throw new Error("Lead not found");
    }

    // Update Lead
    await Lead.findByIdAndUpdate(lead._id, {
        $set: {
            status: data.status,
            nextActionDate: data.nextFollowupDate,
            remark: data.leadRemark,
        },
    });

    // Prepare Follow-up Record
    data.gymId = gymId;
    data.leadName = lead.name;
    data.mobile = lead.mobile;
    data.email = lead.email;
    data.location = lead.location;
    data.purpose = lead.purpose;

    return await LeadFollowup.create(data);
};

export const leadFollowupReport = async (gymId: string, startDate: string, endDate: string) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return await LeadFollowup.find({
        gymId,
        createdAt: {
            $gte: start,
            $lte: end,
        },
    }).sort({
        createdAt: -1,
    });
};
