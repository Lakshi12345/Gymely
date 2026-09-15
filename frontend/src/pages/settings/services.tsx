import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Box, Gift, Layers, Plus, Search, Sparkles } from "lucide-react";

import api from "../../services/api.ts";
import Button from "../../components/ui/button/Button.tsx";
import Radio from "../../components/form/input/Radio.tsx";

function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const [model, setModal] = useState(false);

    const [showDeleteModal, setDeleteModal] = useState(false);

    const [serviceData, setServiceData] = useState<any>({});

    const [formData, setFormData] = useState({
        name: "",
        type: "Base",
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const response = await api.get("/service/getServices");

        setServices(response.data.data);
    };

    const handleAddPakckageClick = () => {
        setModal(true);
    };

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

            toast.success(response.data.data.message);

            setModal(false);

            fetchServices();
        } catch (error: any) {
            toast.error(error.response?.data.error);
        }
    };

    const handleButtonClick = (service: any) => {
        setServiceData(service);

        setDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await api.delete(`/service/deleteService/${serviceData._id}`);

            toast.success(response.data.message);

            fetchServices();

            setDeleteModal(false);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const statistics = [
        {
            title: "Total Services",
            value: services.length,
            icon: Layers,
            color: "bg-blue-50",
        },
        {
            title: "Base",
            value: services.filter((s) => s.type === "Base").length,
            icon: Box,
            color: "bg-violet-50",
        },
        {
            title: "Addon",
            value: services.filter((s) => s.type === "Addon").length,
            icon: Sparkles,
            color: "bg-amber-50",
        },
        {
            title: "Complimentary",
            value: services.filter((s) => s.type === "Complementry").length,
            icon: Gift,
            color: "bg-emerald-50",
        },
    ];

    const filteredServices = services.filter((service: any) => {
        const searchMatch = service.name.toLowerCase().includes(search.toLowerCase());

        const typeMatch = activeFilter === "All" ? true : service.type === activeFilter;

        return searchMatch && typeMatch;
    });

    const filters = ["All", "Base", "Addon", "Complementry"];

    return (
        <>
            <div className="space-y-6">
                {/* HERO */}

                <div className="overflow-hidden rounded-2xl">
                    <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 px-6 py-5 text-white">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                                    <Layers size={24} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold">Service Catalog</h1>

                                    <p className="mt-1 text-sm text-indigo-100">
                                        Manage services available in your gym.
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleAddPakckageClick}
                                startIcon={<Plus size={17} />}
                            >
                                Add Service
                            </Button>
                        </div>
                    </div>
                </div>

                {/* STATISTICS */}

                <div className="grid grid-cols-12 gap-4">
                    {statistics.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div key={index} className="col-span-12 sm:col-span-6 xl:col-span-3">
                                <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                {item.title}
                                            </p>

                                            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                                {item.value}
                                            </h2>
                                        </div>

                                        <div className={`rounded-xl p-3 ${item.color}`}>
                                            <Icon size={21} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* SEARCH */}

                {/* =====================================================
    SEARCH & FILTER
===================================================== */}

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        {/* SEARCH */}

                        <div className="relative w-full lg:w-[320px]">
                            <Search
                                size={17}
                                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search services..."
                                className="h-10 w-full rounded-xl border border-gray-200 bg-white pr-3 pl-10 text-sm transition outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* FILTERS */}

                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                        activeFilter === filter
                                            ? "bg-indigo-600 text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =====================================================
    SERVICE LIST
===================================================== */}

                <div className="space-y-3">
                    {filteredServices.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                            <h2 className="text-lg font-semibold text-gray-700">
                                No services found
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Try changing your search criteria.
                            </p>
                        </div>
                    )}

                    {filteredServices.map((service: any) => (
                        <div
                            key={service._id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                        >
                            {/* MAIN */}

                            <div className="p-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    {/* SERVICE INFO */}

                                    <div className="flex min-w-0 items-center gap-4">
                                        <div
                                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${
                                                service.type === "Base"
                                                    ? "bg-blue-50"
                                                    : service.type === "Addon"
                                                      ? "bg-amber-50"
                                                      : "bg-emerald-50"
                                            }`}
                                        >
                                            {service.type === "Base"
                                                ? "🏋️"
                                                : service.type === "Addon"
                                                  ? "⚡"
                                                  : "🎁"}
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="truncate text-lg font-bold text-gray-800">
                                                    {service.name}
                                                </h2>

                                                <span
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        service.type === "Base"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : service.type === "Addon"
                                                              ? "bg-amber-100 text-amber-700"
                                                              : "bg-emerald-100 text-emerald-700"
                                                    }`}
                                                >
                                                    {service.type}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Managed within the Gymely ecosystem.
                                            </p>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                                    Active
                                                </span>

                                                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                                    Packages
                                                </span>

                                                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                                    Analytics
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}

                                    <div className="flex shrink-0 gap-2">
                                        <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                            View
                                        </button>

                                        <button className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleButtonClick(service)}
                                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* DETAILS */}

                            <div className="grid grid-cols-12 gap-4 border-t border-gray-100 bg-gray-50 px-4 py-3">
                                <div className="col-span-12 sm:col-span-4">
                                    <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                                        Service ID
                                    </p>

                                    <p className="mt-0.5 truncate text-xs font-medium text-gray-700">
                                        {service._id}
                                    </p>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                                        Category
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-gray-700">
                                        {service.type}
                                    </p>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                                        Status
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-emerald-600">
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {model && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
                            {/* HEADER */}

                            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-8 text-white">
                                <button
                                    onClick={() => setModal(false)}
                                    className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30"
                                >
                                    ✕
                                </button>

                                <div className="flex items-center gap-5">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
                                        ✨
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold">Create Service</h2>

                                        <p className="mt-2 text-indigo-100">
                                            Create and organize your gym services.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* BODY */}

                            <form onSubmit={handleServiceSubmit} className="space-y-8 p-8">
                                <div>
                                    <label className="mb-3 block text-sm font-medium text-gray-700">
                                        Service Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        placeholder="Personal Training"
                                        onChange={handleForm}
                                        className="h-14 w-full rounded-2xl border border-gray-200 px-5 transition-all outline-none focus:border-indigo-500"
                                    />
                                </div>

                                {/* SERVICE TYPE */}

                                <div>
                                    <label className="mb-4 block text-sm font-medium text-gray-700">
                                        Service Type
                                    </label>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    type: "Base",
                                                })
                                            }
                                            className={`rounded-3xl border p-5 text-left transition-all ${
                                                formData.type === "Base"
                                                    ? "border-indigo-500 bg-indigo-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <div className="text-3xl">🏋️</div>

                                            <h3 className="mt-4 font-semibold">Base</h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Core services.
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    type: "Addon",
                                                })
                                            }
                                            className={`rounded-3xl border p-5 text-left transition-all ${
                                                formData.type === "Addon"
                                                    ? "border-amber-500 bg-amber-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <div className="text-3xl">⚡</div>

                                            <h3 className="mt-4 font-semibold">Addon</h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Additional services.
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    type: "Complementry",
                                                })
                                            }
                                            className={`rounded-3xl border p-5 text-left transition-all ${
                                                formData.type === "Complementry"
                                                    ? "border-emerald-500 bg-emerald-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <div className="text-3xl">🎁</div>

                                            <h3 className="mt-4 font-semibold">Complimentary</h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Free services.
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                {/* FOOTER */}

                                <div className="flex justify-end gap-4 border-t border-gray-100 pt-8">
                                    <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="rounded-2xl border border-gray-200 px-6 py-3 transition-all hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-2xl bg-indigo-600 px-6 py-3 text-white transition-all hover:bg-indigo-700"
                                    >
                                        Create Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl">
                            {/* top section */}

                            <div className="bg-gradient-to-r from-red-500 to-rose-500 p-8 text-center text-white">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl">
                                    🗑️
                                </div>

                                <h2 className="mt-6 text-3xl font-bold">Delete Service</h2>

                                <p className="mt-3 text-red-100">This action cannot be undone.</p>
                            </div>

                            {/* content */}

                            <div className="space-y-6 p-8">
                                <div className="rounded-3xl border border-red-100 bg-red-50 p-5">
                                    <p className="text-sm text-gray-500">Selected service</p>

                                    <h3 className="mt-2 text-xl font-semibold">
                                        {serviceData?.name}
                                    </h3>

                                    <div className="mt-4">
                                        <span
                                            className={`rounded-full px-4 py-2 text-sm ${
                                                serviceData?.type === "Base"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : serviceData?.type === "Addon"
                                                      ? "bg-amber-100 text-amber-700"
                                                      : "bg-emerald-100 text-emerald-700"
                                            }`}
                                        >
                                            {serviceData?.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-5">
                                    <p className="text-sm leading-7 text-gray-500">
                                        Deleting this service may affect packages, subscriptions,
                                        reports, invoices and other related records.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setDeleteModal(false)}
                                        className="w-full rounded-2xl border border-gray-200 py-4 font-medium transition-all hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={confirmDelete}
                                        className="w-full rounded-2xl bg-red-500 py-4 font-medium text-white transition-all hover:bg-red-600"
                                    >
                                        Delete Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Services;
