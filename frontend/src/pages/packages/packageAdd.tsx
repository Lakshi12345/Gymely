import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import React, { useEffect, useState } from "react";
import api from "../../services/api.ts";
import Checkbox from "../../components/form/input/Checkbox.tsx";
import Radio from "../../components/form/input/Radio.tsx";
import Button from "../../components/ui/button/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Service {
    _id: string;
    name: string;
    type: string;
}

interface SelectedService {
    name: string;
    type: string;
    session: number;
}

function PackageAdd() {
    const navigate = useNavigate();
    const [services, setServices] = useState<Service[]>([]);

    const [selectedService, setSelectedService] = useState<SelectedService[]>([]);

    const [formData, setFormData] = useState<any>({});

    const [selectGstType, setSelectGstType] = useState("NO");

    // =====================================================
    // GET SERVICES
    // =====================================================

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/service/getServices");

            setServices(response.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        }
    };

    // =====================================================
    // SERVICE SELECT
    // =====================================================

    const handleServiceChange = (checked: boolean, serviceName: string, type: string) => {
        if (checked) {
            setSelectedService((prev) => [
                ...prev,
                {
                    name: serviceName,
                    type: type,
                    session: 0,
                },
            ]);
        } else {
            setSelectedService((prev) => prev.filter((service) => service.name !== serviceName));
        }
    };

    // =====================================================
    // SESSION CHANGE
    // =====================================================

    const onSessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = Number(e.target.value);

        setSelectedService((prev) =>
            prev.map((service) =>
                service.name === name
                    ? {
                          ...service,
                          session: value,
                      }
                    : service
            )
        );
    };

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
        }));
    };

    // =====================================================
    // GST
    // =====================================================

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectGstType(e.target.value);
    };

    // =====================================================
    // CREATE PACKAGE
    // =====================================================

    const handleAddPakckageClick = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            /*
             * Determine package type
             *
             * If ANY selected service is Addon
             * packageType = Addon
             *
             * Otherwise packageType = Base
             */
            const packageType = selectedService.some((service) => service.type === "Base")
                ? "Base"
                : "Addon";

            const finalData = {
                ...formData,

                services: selectedService,

                packageType,

                isIncludeGst: selectGstType,
            };

            console.log("FINAL PACKAGE DATA:", finalData);
            // return;
            /*
            Example:

            {
                packageName: "Gym Monthly",
                duration: 30,
                amount: 1000,
                minimumSalePercent: 10,

                services: [
                    {
                        name: "Gym",
                        type: "Base",
                        session: 30
                    },
                    {
                        name: "Personal Training",
                        type: "Addon",
                        session: 10
                    }
                ],

                packageType: "Addon",
                isIncludeGst: "NO"
            }
            */
            const response = await api.post("/package/packageAdd", finalData);

            console.log("PACKAGE RESPONSE:", response.data);

            if (response.data.success) {
                toast.success(response.data.message || "Package created successfully!");
                navigate("/dashboard/packageall");
            } else {
                toast.error(
                    response.data.error || response.data.message || "Failed to create package!"
                );
            }
        } catch (error: any) {
            console.error("Package creation failed:", error?.response?.data);

            toast.error(
                error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong!"
            );
        }
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <>
            <PageBreadcrumb pageTitle="Create New Package" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                <div className="space-y-6">
                    <ComponentCard title="Package Details">
                        <div className="space-y-6">
                            {/* PACKAGE NAME */}

                            <div>
                                <Label htmlFor="packageName">Package Name</Label>

                                <Input
                                    onChange={handleInputChange}
                                    type="text"
                                    id="packageName"
                                    name="packageName"
                                    placeholder="Gym Monthly"
                                />
                            </div>

                            {/* DURATION */}

                            <div>
                                <Label htmlFor="duration">Duration</Label>

                                <Input
                                    onChange={handleInputChange}
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    placeholder="30"
                                />
                            </div>

                            {/* SERVICES */}

                            <div>
                                <Label>Services</Label>

                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {services.map((serv) => {
                                        const selected = selectedService.some(
                                            (item) => item.name === serv.name
                                        );

                                        return (
                                            <div
                                                key={serv._id}
                                                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-700"
                                            >
                                                <Checkbox
                                                    id={serv._id}
                                                    checked={selected}
                                                    value={serv.name}
                                                    onChange={(checked) =>
                                                        handleServiceChange(
                                                            checked,
                                                            serv.name,
                                                            serv.type
                                                        )
                                                    }
                                                    label={serv.name}
                                                />

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        serv.type === "Base"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-amber-100 text-amber-700"
                                                    }`}
                                                >
                                                    {serv.type}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* SESSIONS */}

                            {selectedService.map((service) => (
                                <div key={service.name}>
                                    <Label htmlFor={service.name}>{service.name} Session</Label>

                                    <Input
                                        type="number"
                                        id={service.name}
                                        name={service.name}
                                        value={service.session}
                                        onChange={onSessionChange}
                                        placeholder="30"
                                    />
                                </div>
                            ))}

                            {/* PACKAGE AMOUNT */}

                            <div>
                                <Label>Package Amount</Label>

                                <Input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    onChange={handleInputChange}
                                    placeholder="1000"
                                />
                            </div>

                            {/* GST */}

                            <div>
                                <Label>Package Include GST</Label>

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

                            {/* MINIMUM SALES */}

                            <div>
                                <Label>Minimum Sales Percent</Label>

                                <Input
                                    name="minimumSalePercent"
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="10"
                                />
                            </div>

                            {/* PACKAGE TYPE PREVIEW */}

                            {selectedService.length > 0 && (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Package Type</span>

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                selectedService.some(
                                                    (service) => service.type === "Addon"
                                                )
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                        >
                                            {selectedService.some(
                                                (service) => service.type === "Base"
                                            )
                                                ? "Base"
                                                : "Addon"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* SUBMIT */}

                            <div className="flex justify-center">
                                <Button
                                    className="transition"
                                    variant="primary"
                                    size="md"
                                    onClick={handleAddPakckageClick}
                                    startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                >
                                    Create Package
                                </Button>
                            </div>
                        </div>
                    </ComponentCard>
                </div>
            </div>
        </>
    );
}

export default PackageAdd;
