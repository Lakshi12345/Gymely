import ServiceCard from "../../components/custom/serviceCard.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/button/Button.tsx";
import React, { useEffect, useState } from "react";
import Radio from "../../components/form/input/Radio.tsx";
import api from "../../services/api.ts";
import toast from "react-hot-toast";

function Services() {
    useEffect(() => {
        fetchServices();
    }, []);

    const [services, setServices] = useState([]);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [serviceData, setServiceData] = useState([]);

    const fetchServices = async () => {
        const services = await api.get("/service/getServices");
        setServices(services.data.data);
    };

    const handleAddPakckageClick = async () => {
        setModal(true);
    };
    const [model, setModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "Base",
    });

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/service/serviceAdd", formData);
            console.log(response);
            // console.log(formData);
            setModal(false);
            toast.success(response.data.data.message);
            fetchServices();
        } catch (error: any) {
            setModal(false);
            toast.error(error.response?.data.error);
            console.log(error.response?.data.error);
        }
    };

    const handleButtonClick = async (service) => {
        setServiceData(service);
        setDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const respone = await api.delete(`/service/deleteService/${serviceData._id}`);
            console.log(respone);
            toast.success(respone.data.message);
            fetchServices();
            setDeleteModal(false);
            // toast.success("dssdsd")
        } catch (error: any) {
            console.log(error.message);
            setDeleteModal(false);
        }
    };

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="flex justify-between px-6 py-5">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                        Services
                    </h3>
                    <Button
                        className="transition"
                        variant="primary"
                        size="md"
                        disabled={false}
                        onClick={handleAddPakckageClick}
                        startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                    >
                        Add Service
                    </Button>
                </div>
                <div className="border-t border-gray-100 p-4 sm:p-6 dark:border-gray-800">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {services.map((serv) => (
                            <ServiceCard
                                service={serv}
                                key={serv._id}
                                onDeleteButtonClick={() => handleButtonClick(serv)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {model && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-[584px] rounded-3xl bg-white p-5 lg:p-10 dark:bg-gray-900">
                        {/* Close Button */}
                        <button
                            onClick={() => setModal(false)}
                            className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            ✕
                        </button>

                        <div>
                            <form onSubmit={handleServiceSubmit}>
                                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                                    Service Information
                                </h4>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Name
                                        </label>

                                        <input
                                            placeholder="Gym"
                                            name="name"
                                            onChange={handleForm}
                                            className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white"
                                            type="text"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Service Type
                                        </label>
                                        <div className="flex gap-4">
                                            <Radio
                                                id="Base"
                                                name="type"
                                                value="Base"
                                                checked={formData.type === "Base"}
                                                label="Base"
                                                onChange={(value: string) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                    }));
                                                }}
                                            />
                                            <Radio
                                                id="Addon"
                                                name="type"
                                                value="Addon"
                                                checked={formData.type === "Addon"}
                                                label="Addon"
                                                onChange={(value: string) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                    }));
                                                }}
                                            ></Radio>
                                            <Radio
                                                id="Complementry"
                                                name="type"
                                                value="Complementry"
                                                checked={formData.type === "Complementry"}
                                                label="Complementry"
                                                onChange={(value: string) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                    }));
                                                }}
                                            ></Radio>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm"
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-brand-500 inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm text-white"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/50">
                    <div className="w-[420px] rounded-2xl bg-white p-8 text-center shadow-2xl">
                        <div className="mb-5 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                <span className="text-4xl">🗑️</span>
                            </div>
                        </div>

                        <h2 className="mb-2 text-2xl font-bold">Delete Package?</h2>

                        <p className="mb-8 text-gray-500">
                            Are you sure you want to delete
                            <span className="font-semibold text-black"> {serviceData?.name}</span>?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="w-full rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="w-full rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Services;
