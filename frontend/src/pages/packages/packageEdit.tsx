import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import Checkbox from "../../components/form/input/Checkbox.tsx";
import Radio from "../../components/form/input/Radio.tsx";
import Button from "../../components/ui/button/Button.tsx";
import { useNavigate, useParams } from "react-router";
import SuccessModal from "../../components/modals/succeModal.tsx";

function PackageEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [formData, setFormData] = useState<any>([]);
    const [sessionData, setSessionData] = useState<any[]>([]);

    const [successModal, setSuccessModal] = useState(false);

    useEffect(() => {
        fetchServices();
        fetchPackage();
    }, []);

    const fetchServices = async () => {
        const services = await api.get("/service/getServices");
        setServices(services.data.data);
    };

    const handleServiceChange = (checked: boolean, serviceName: string) => {
        // const { value, checked } = e.target;

        // console.log(checked + serviceName);
        if (checked) {
            setSelectedService((prev) => [...prev, serviceName]);
            // console.log(selectedService)
        } else {
            setSelectedService((prev) => prev.filter((service) => service !== serviceName));
        }
    };

    const [selectGstType, setSelectGstType] = useState("NO");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectGstType(e);
        // console.log(selectGstType);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSessionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);

        const name = e.target.name;
        const value = e.target.value;
        const matchedService = selectedService.find((val) => val === name);

        setSessionData((prev: any) => {
            const exists = prev.find((item: any) => item.name === matchedService);

            if (exists) {
                return prev.map((item) =>
                    item.name === matchedService ? { ...item, session: value } : item
                );
            }

            return [
                ...prev,
                {
                    name: matchedService,
                    session: value,
                },
            ];
        });

        console.log(sessionData);
    };

    const fetchPackage = async () => {
        try {
            const response = await api.get(`/package/getSinglePackage/${id}`);
            setFormData({
                packageName: response.data.data.packageName,
                duration: response.data.data.duration,
                amount: response.data.data.amount,
                isIncludeGst: response.data.data.isIncludeGst,
                minimumSalePercent: response.data.data.minimumSalePercent,
            });
            setSelectGstType(response.data.data.isIncludeGst);
            const temp: any[] = [];
            const tempSession: any[] = [];

            response.data.data.services.forEach((serv: any) => {
                temp.push(serv.name);
                tempSession.push({
                    name: serv.name,
                    session: serv.session,
                });
            });
            // console.log(tempSession)

            setSelectedService(temp);
            setSessionData(tempSession);

            // console.log(response.data.data);
        } catch (error: any) {
            console.log(error.response?.message);
        }
    };

    const handleAddPakckageClick = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let finalData = {
                ...formData,
                services: sessionData,
                isIncludeGst: selectGstType,
            };

            // const response = await api.post('/package/packageAdd', finalData);
            const response = await api.post(`/package/packageUpdate/${id}`, finalData);
            console.log(response.data);
            setSuccessModal(true);
            // console.log(formData);
        } catch (error: any) {
            // toast.error(error.response?.data?.error || "Something went wrong !");
            console.log(error.response?.data);
        }
    };
    return (
        <>
            <PageBreadcrumb pageTitle="Create New Package" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                <div className="space-y-6">
                    <ComponentCard title="Package Details">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="packageName">Package Name</Label>
                                <Input
                                    onChange={handleInputChange}
                                    value={formData.packageName}
                                    type="text"
                                    id="packageName"
                                    name="packageName"
                                    placeholder="Gym Monthly"
                                />
                            </div>
                            <div>
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    onChange={handleInputChange}
                                    value={formData.duration}
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    placeholder="30"
                                />
                            </div>

                            <div className="flex gap-4">
                                {services.map((serv: any) => (
                                    <div key={serv._id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={serv.name}
                                            checked={selectedService.includes(serv.name)}
                                            value={serv.name}
                                            onChange={(checked) =>
                                                handleServiceChange(checked, serv.name)
                                            }
                                            label={serv.name}
                                        />
                                    </div>
                                ))}
                            </div>

                            {selectedService.map((list) => (
                                <div>
                                    <Label htmlFor={list}>{list} Session : </Label>
                                    <Input
                                        value={
                                            sessionData.find((item) => item.name === list)
                                                ?.session || ""
                                        }
                                        onChange={onSessionChange}
                                        type="text"
                                        id={list}
                                        name={list}
                                        placeholder="30"
                                    />
                                </div>
                            ))}
                            <div>
                                <Label>Package Amount</Label>
                                <Input
                                    type="text"
                                    value={formData.amount}
                                    id="amount"
                                    name="amount"
                                    onChange={handleInputChange}
                                    placeholder="1000"
                                />
                            </div>
                            <div>
                                <Label htmlFor="duration">Package Include GST</Label>
                                <div className="flex gap-4">
                                    <Radio
                                        id="No"
                                        name="isIncludeGst"
                                        value="NO"
                                        checked={selectGstType === "NO"}
                                        onChange={handleRadioChange}
                                        label="NO"
                                    />
                                    <Radio
                                        id="Yes"
                                        name="isIncludeGst"
                                        value="YES"
                                        checked={selectGstType === "YES"}
                                        onChange={handleRadioChange}
                                        label="YES"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Minimum Sales Percent</Label>
                                <Input
                                    name="minimumSalePercent"
                                    value={formData.minimumSalePercent}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="10"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    className="transition"
                                    variant="primary"
                                    size="md"
                                    onClick={handleAddPakckageClick}
                                >
                                    Update Package
                                </Button>
                            </div>
                        </div>
                    </ComponentCard>
                </div>
            </div>
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Package Updated Successfully"
                description="What would you like to do next?"
                buttons={[
                    {
                        label: "Create New",

                        className: "bg-blue-600",
                        onClick: () => navigate("/dashboard/packageadd"),
                    },

                    {
                        label: "View All",

                        className: "bg-green-600",
                        onClick: () => navigate("/dashboard/packageall"),
                    },

                    {
                        label: "New Member",

                        className: "bg-purple-600",

                        onClick: () => navigate("/member/add"),
                    },
                ]}
            />
        </>
    );
}
export default PackageEdit;
