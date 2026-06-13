import DashboardLayout from "../../layouts/DashboardLayout.tsx";
import React, {useState} from "react";
import api from "../../services/api.ts";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
function PackageAdd(){

    const navigate  = useNavigate();

    const [showSuccessModal,setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        packageName : "",
        duration : "",
        pType : "Base",
        amount  : "",
    });
    
    const  handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    }


    const handleSubmit = async  (e:React.FormEvent)=>{
        e.preventDefault();
        try {
            const response = await api.post('/package/packageAdd', formData);
            console.log(response.data);
            setShowSuccessModal(true);
            // console.log(formData);
        }catch (error : any){
            toast.error(error.response?.data?.error || "Something went wrong !");
            console.log(error.response?.data);
        }
    }

    return (

        <DashboardLayout>
            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Add Package
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Member Information */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Package Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block mb-2">
                                    Package Name
                                </label>

                                <input
                                    type="text"
                                    name="packageName"
                                    value={formData.packageName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Duration
                                </label>

                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Package Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-3">
                                    Package Type
                                </label>

                                <div className="flex gap-6">

                                    <label className="flex items-center gap-2 cursor-pointer">

                                        <input
                                            type="radio"
                                            name="pType"
                                            value="Base"
                                            checked={formData.pType === "Base"}
                                            onChange={handleChange}
                                        />

                                        Base

                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">

                                        <input
                                            type="radio"
                                            name="pType"
                                            value="Addon"
                                            checked={formData.pType === "Addon"}
                                            onChange={handleChange}
                                        />

                                        Addon

                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            Proceed
                        </button>
                    </div>

                </form>

                {
                    showSuccessModal && (

                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                            <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[450px] text-center animate-fade-in">

                                <button
                                    onClick={() =>
                                        setShowSuccessModal(false)
                                    }
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                                <div className="flex justify-center mb-4">

                                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                                        <span className="text-4xl">

                                            ✅

                                        </span>

                                    </div>

                                </div>

                                <h2 className="text-2xl font-bold mb-2">

                                    Package Created Successfully

                                </h2>

                                <p className="text-gray-500 mb-8">

                                    What would you like to do next?

                                </p>

                                <div className="flex gap-3 justify-center mt-6">

                                    <button
                                        onClick={() => {

                                            setShowSuccessModal(
                                                false
                                            );

                                            setFormData({
                                                packageName: "",
                                                duration: "",
                                                pType: "Base",
                                                amount: ""

                                            });

                                        }}
                                        className="w-full  bg-blue-600 text-white py-3  rounded-xl hover:bg-blue-700 transition"
                                    >
                                        New Package
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/packageAll"
                                            )
                                        }
                                        className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
                                    >
                                        View All
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/members/add"
                                            )
                                        }
                                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                                    >
                                        Add Member
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>
        </DashboardLayout>


    );
}

export  default PackageAdd;