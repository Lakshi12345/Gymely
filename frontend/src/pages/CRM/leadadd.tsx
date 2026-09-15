import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Radio from "../../components/form/input/Radio";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import api from "../../services/api";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

function LeadAdd() {
    const navigate = useNavigate();
    const [followupDate, setFollowupDate] = useState<Date | null>(new Date());
    const [services, setServices] = useState<any[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const [errors, setErrors] = useState({
        name: "",
        mobile: "",
        email: "",
        location: "",
    });

    const validate = () => {
        const newErrors: any = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full Name is required";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile Number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid mobile number";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (selectedServices.length === 0) {
            newErrors.services = "Select at least one service";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        countryCode: "91",
        email: "",
        gender: "Male",
        location: "",
        purpose: "",
        reference: "",
        nextAction: "Call",
        nextActionDate: "",
        remark: "",
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/service/getServices");
            setServices(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));
    };
    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleServiceChange = (checked: boolean, service: string) => {
        if (checked) {
            setSelectedServices((prev) => [...prev, service]);
        } else {
            setSelectedServices((prev) => prev.filter((item) => item !== service));
        }
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        try {
            const finalData = {
                ...formData,
                services: selectedServices,
                nextActionDate: followupDate.toISOString(),
            };

            console.log(finalData);

            const response = await api.post("/lead/addLead", finalData);

            navigate("/dashboard/leadall");
            console.log(response.data);
        } catch (err: any) {
            console.log(err.response?.data);
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Add Prospect" />

            <div className="space-y-6">
                <ComponentCard title="👤 Prospect Information">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label>Full Name</Label>

                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label>Mobile Number</Label>

                            <div className="flex gap-2">
                                <div className="w-28">
                                    <Select
                                        options={[
                                            {
                                                value: "91",
                                                label: "+91",
                                            },
                                            {
                                                value: "1",
                                                label: "+1",
                                            },
                                            {
                                                value: "44",
                                                label: "+44",
                                            },
                                        ]}
                                        defaultValue="91"
                                        onChange={(value) =>
                                            handleSelectChange("countryCode", value)
                                        }
                                    />
                                </div>

                                <Input
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    placeholder="9876543210"
                                />

                                {errors.mobile && (
                                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label>Email</Label>

                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@gmail.com"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <Label>Gender</Label>

                            <div className="mt-3 flex gap-6">
                                <Radio
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleRadioChange}
                                    label="Male"
                                />

                                <Radio
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleRadioChange}
                                    label="Female"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <Label>Location</Label>

                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Kolkata"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                            )}
                        </div>
                    </div>
                </ComponentCard>

                <ComponentCard title="🎯 Fitness Goal">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label>Primary Goal</Label>

                            <Select
                                options={[
                                    {
                                        value: "Fat Loss",
                                        label: "🔥 Fat Loss",
                                    },
                                    {
                                        value: "Weight Gain",
                                        label: "💪 Weight Gain",
                                    },
                                    {
                                        value: "Muscle Building",
                                        label: "🏋️ Muscle Building",
                                    },
                                    {
                                        value: "General Fitness",
                                        label: "❤️ General Fitness",
                                    },
                                    {
                                        value: "Sports Training",
                                        label: "🏃 Sports Training",
                                    },
                                    {
                                        value: "Others",
                                        label: "✨ Others",
                                    },
                                ]}
                                onChange={(value) => handleSelectChange("purpose", value)}
                            />
                        </div>

                        <div>
                            <Label>Lead Source</Label>

                            <Select
                                options={[
                                    {
                                        value: "Walk In",
                                        label: "🚶 Walk In",
                                    },
                                    {
                                        value: "Instagram",
                                        label: "📸 Instagram",
                                    },
                                    {
                                        value: "Facebook",
                                        label: "📘 Facebook",
                                    },
                                    {
                                        value: "Google",
                                        label: "🔍 Google",
                                    },
                                    {
                                        value: "Referral",
                                        label: "🤝 Referral",
                                    },
                                    {
                                        value: "Employee",
                                        label: "👨‍💼 Employee",
                                    },
                                ]}
                                onChange={(value) => handleSelectChange("reference", value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <Label>Interested Services</Label>

                        <div className="mt-3 flex flex-wrap gap-3">
                            {services.map((service: any) => {
                                const active = selectedServices.includes(service.name);

                                return (
                                    <button
                                        key={service._id}
                                        type="button"
                                        onClick={() => handleServiceChange(!active, service.name)}
                                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                            active
                                                ? "border-red-600 bg-red-600 text-white"
                                                : "border-gray-300 bg-white text-gray-700 hover:bg-red-50"
                                        } `}
                                    >
                                        {service.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ComponentCard>
                <ComponentCard title="📅 Follow-up">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label>Next Action</Label>

                            <Select
                                options={[
                                    {
                                        value: "Call",
                                        label: "📞 Phone Call",
                                    },
                                    {
                                        value: "WhatsApp",
                                        label: "💬 WhatsApp",
                                    },
                                    {
                                        value: "Visit",
                                        label: "🏢 Gym Visit",
                                    },
                                    {
                                        value: "Email",
                                        label: "📧 Email",
                                    },
                                ]}
                                onChange={(value) => handleSelectChange("nextAction", value)}
                            />
                        </div>

                        <div>
                            <Label>Follow-up Date</Label>

                            <ReactDatePicker
                                selected={followupDate}
                                onChange={(date: Date | null) => setFollowupDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Follow-up Date"
                                className="h-11 w-full rounded-full border border-gray-300 px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Notes</Label>

                            <textarea
                                name="remark"
                                rows={2}
                                value={formData.remark}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        remark: e.target.value,
                                    }))
                                }
                                placeholder="Write important notes..."
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition outline-none focus:border-red-500 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </ComponentCard>
                <div className="flex justify-center">
                    <Button
                        size="md"
                        variant="primary"
                        className="rounded-xl bg-red-600 px-10 py-3 transition-all hover:bg-red-700"
                        onClick={handleSave}
                    >
                        + Create Prospect
                    </Button>
                </div>
            </div>
        </>
    );
}

export default LeadAdd;
