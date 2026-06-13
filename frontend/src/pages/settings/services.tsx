import ServiceCard from "../../components/custom/serviceCard.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/button/Button.tsx";
import React, {useEffect, useState} from "react";
import Radio from "../../components/form/input/Radio.tsx";
import api from "../../services/api.ts";
import toast from "react-hot-toast";

function Services(){

    useEffect(() => {
        fetchServices();
    }, []);

    const [services, setServices] = useState([]);
    const[showDeleteModal, setDeleteModal] = useState(false);
    const[serviceData, setServiceData] = useState([]);

    const fetchServices = async () => {
        const services = await api.get('/service/getServices');
        setServices(services.data.data);
    }


    const handleAddPakckageClick = async ()=>{
        setModal(true);
    }
    const [model, setModal] = useState(false);
    const[formData, setFormData] = useState({
        name: "",
        type: "Base",
    });

    const handleForm  = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleServiceSubmit = async (e : React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await api.post('/service/serviceAdd', formData);
            console.log(response);
            // console.log(formData);
            setModal(false);
            toast.success(response.data.data.message);
            fetchServices();
        }catch (error : any){
            console.log(error.message);
        }
    }

    const handleButtonClick = async (service)=>{
        setServiceData(service);
        setDeleteModal(true);
    }

    const confirmDelete = async  ()=>{
        try {
            const respone = await api.delete(`/service/deleteService/${serviceData._id}`);
            console.log(respone);
            toast.success(respone.data.message)
            fetchServices();
            setDeleteModal(false);
            // toast.success("dssdsd")
        }catch (error : any){
            console.log(error.message);
            setDeleteModal(false);
        }
    }


    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 ">
                <div className="px-6 py-5 flex justify-between"><h3
                    className="text-base font-medium text-gray-800 dark:text-white/90">Services</h3>
                    <Button
                        className="transition"
                        variant="primary"
                        size="md"
                        disabled={false}
                        onClick={handleAddPakckageClick}
                        startIcon={
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                            />
                        }
                    >
                        Add Service
                    </Button>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {
                            services.map((serv) =>(
                                <ServiceCard service={serv}
                                key = {serv._id}
                                onDeleteButtonClick={()=>handleButtonClick(serv)}

                                />
                            ))
                        }

                    </div>
                </div>
            </div>
            {
                model && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4">

                        <div className="relative w-full max-w-[584px] rounded-3xl bg-white p-5 lg:p-10 dark:bg-gray-900">

                            {/* Close Button */}
                            <button
                                onClick={() => setModal(false)}
                                className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
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
                                                name = "name"
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
                                                <Radio id="Base" name="type" value="Base" checked={formData.type === "Base"} label="Base"
                                                       onChange={(value: string) =>{
                                                            setFormData(prev=>({
                                                                ...prev,
                                                                type : value,
                                                            }));
                                                       }}
                                                />
                                                <Radio id="Addon" name="type" value="Addon" checked={formData.type === "Addon"} label="Addon"
                                                       onChange={(value: string) =>{
                                                           setFormData(prev=>({
                                                               ...prev,
                                                               type : value,
                                                           }));
                                                       }} ></Radio>
                                                <Radio id="Complementry" name="type" value="Complementry" checked={formData.type ==="Complementry"}
                                                       label="Complementry"  onChange={(value: string) =>{
                                                    setFormData(prev=>({
                                                        ...prev,
                                                        type : value,
                                                    }));
                                                }} ></Radio>
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
                                            className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm text-white"
                                        >
                                            Save Changes
                                        </button>

                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                )
            }

            {
                showDeleteModal && (

                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999999">

                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-[420px] text-center">

                            <div className="flex justify-center mb-5">

                                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

                        <span className="text-4xl">
                            🗑️
                        </span>

                                </div>

                            </div>

                            <h2 className="text-2xl font-bold mb-2">

                                Delete Package?

                            </h2>

                            <p className="text-gray-500 mb-8">

                                Are you sure you want to delete

                                <span className="font-semibold text-black">

                                        {" "}
                                    {serviceData?.name}

                                    </span>

                                ?

                            </p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        setDeleteModal(
                                            false
                                        )
                                    }
                                    className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        confirmDelete
                                    }
                                    className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </>

    );

}

export default Services;