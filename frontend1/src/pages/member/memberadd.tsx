import DashboardLayout from "../../layouts/DashboardLayout.tsx";
import React, {type FormEvent, useEffect, useState} from "react";
import api from "../../services/api.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
function Memberadd(){

    const  navigate = useNavigate();

    useEffect(() => {
        fetchPackage();
    }, []);

    const [packages, setPackages] = useState([]);
    const [joinDate, setJoinDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [nextPaymentDate, setNextPaymentDate] = useState(new Date());
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [profilePreview, setProfilePreview] = useState("");
    const fetchPackage = async ()=>{
        const response = await api.get('/package/getallPackages');
        setPackages(response.data.data);
        console.log(response);
    }

    const [formData, setFormData] = useState({
            mobile : "",
            fullName : "",
            email : "",
            gender : "",
            planName : "",
            amount : 0,
            discount : 0,
            totalAmount : 0,
            currentInstallment : 0,
            remaining : 0,
            online : 0,
            cash : 0,
            cheque : 0,
            profile: null,
    });

    const handleSelectChange  = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedId = e.target.value;
        // alert(selectedId);
        const selectedPackage = packages.find((pkg)=>pkg.packageName == selectedId);
        console.log(selectedPackage);


        const currentDate = new Date();

        const expiry = new Date(currentDate);

        expiry.setDate(expiry.getDate() + Number(selectedPackage?.duration || 0));


        setJoinDate(currentDate);
        setExpiryDate(expiry);

        setFormData({
            ...formData,
            planName : selectedId,
            amount : selectedPackage.amount,
            totalAmount : selectedPackage.amount,
            currentInstallment : selectedPackage.amount,

        });
    }

    const handleDicountChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const discount = Number(e.target.value) || 0;

        console.log(discount);
        setFormData({
            ...formData,
            discount,
            totalAmount: formData.amount - discount,
            currentInstallment: formData.amount - discount,
        });
    }

    const handleCurrentInstallmentChange  = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const currAmt = Number(e.target.value) || 0;

        setFormData({
            ...formData,
            currentInstallment: currAmt,
            remaining : formData.totalAmount-currAmt,
        });

        if(formData.remaining>0){
            const  currDate = new Date();
            const nextDate = new Date(currDate);

            nextDate.setDate(nextDate.getDate() +  7 );
            setNextPaymentDate(nextDate);
        }
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleProfilePicture  = (e: React.ChangeEvent<HTMLInputElement>)=>{

        const file = e.target.files?.[0];

        if(!file){
            return;
        }
        setFormData({
            ...formData,
            profile : file,
        });

        console.log(file);

        setProfilePreview(
            URL.createObjectURL(
                file
            )
        );
    }

    const handleFormSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        try{


            let finalData = new FormData();
            Object.entries(
                formData
            ).forEach(
                ([key, value])=>
                {
                    finalData.append(key, String(value ?? ""));
                }
            );

            if(formData.profile){
                finalData.append(
                    "profile", formData.profile
                );
            }

            finalData.append(
                "startDate" , joinDate.toISOString()
            );

            finalData.append(
                    "expiryDate" , expiryDate.toISOString()
            );

            finalData.append(
                "paymentDate" , paymentDate.toISOString()
            );

            finalData.append(
                "nextPaymentDate" , nextPaymentDate.toISOString()
            );


            if(Number(formData.currentInstallment) !== Number(formData.online)+Number(formData.cash)+Number(formData.cheque)){
                toast.error("Amount does not match !");
                return;
            }

            const response = await api.post("/member/memberAdd",finalData, {
                headers: {
                    "Content-Type":
                    "multipart/form-data"
                }
            });
            console.log(response.data);
            console.log(finalData);
            toast.success("Successfully Done !");

            navigate(
                "/billings"
            );

        }catch (error : any){
            console.log(error.message);
        }
    }

    return (
        <DashboardLayout>
            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Add Member
                </h1>

                <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                >

                    {/* Member Information */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Member Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Mobile
                                </label>

                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Profile Picture
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="file"
                                        accept="image/png"
                                        name="profile"
                                        onChange={handleProfilePicture}
                                        className="w-full border rounded-lg p-3"
                                    />

                                    {/*<button*/}
                                    {/*    type="button"*/}
                                    {/*    onClick={openCameraModel}*/}
                                    {/*    className="w-full border rounded-lg p-3 bg-green-700 text-white"*/}
                                    {/*>Capture </button>*/}
                                </div>
                            </div>

                            {
                                profilePreview && (

                                    <div className="mt-4">

                                        <img
                                            src={
                                                profilePreview
                                            }

                                            alt="Preview"

                                            className="w-32 h-32 rounded-xl object-cover border shadow"
                                        />

                                    </div>

                                )
                            }

                        </div>

                    </div>

                    {/* Membership Information */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Membership Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="block mb-2">
                                    Membership Plan
                                </label>

                                <select
                                    name="planName"
                                    value={
                                        formData.planName
                                    }
                                    onChange={handleSelectChange}
                                    className="w-full border rounded-lg p-3"
                                >

                                    <option value="">
                                        Select Plan
                                    </option>

                                    {
                                        packages.map((pkg)=>(
                                            <option
                                                key={pkg._id}
                                                value={pkg.packageName}
                                            >
                                                {pkg.packageName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Joining Date
                                </label>
                                <DatePicker
                                    name="joinDate"
                                    selected={joinDate}
                                    onChange={(date)=>setJoinDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown

                                    dropdownMode="select"

                                    className="w-full border rounded-lg p-3"
                                    placeholderText="Select Date"
                                />

                            </div>

                            <div>
                                <label className="block mb-2">
                                    Expiry Date
                                </label>
                                <DatePicker
                                    name="expiryDate"
                                    selected={expiryDate}
                                    onChange={(date)=>setExpiryDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="w-full border rounded-lg p-3"
                                    placeholderText="Select Date"

                                />
                            </div>

                        </div>

                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Cost Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="block mb-2">
                                    Package Cost
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    // onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleDicountChange}
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <div>
                                <label className="block mb-2">
                                    Total Amount
                                </label>
                                <input
                                    type="number"
                                    name="totalAmount"
                                    value={formData.totalAmount}
                                    // onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                        </div>

                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Payment Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                            <div>
                                <label className="block mb-2">
                                    Current Installment
                                </label>
                                <input
                                    type="number"
                                    name="currentInstallment"
                                    value={formData.currentInstallment}
                                    onChange={handleCurrentInstallmentChange}
                                    className="w-full border rounded-lg p-3"
                                />

                                {
                                    formData.remaining>0 && (
                                        <span className="text-orange-700 font-semibold">Pending Amount : {formData.remaining}</span>
                                    )
                                }

                            </div>

                            <div>
                                <label className="block mb-2">
                                    Online Amount
                                </label>
                                <input
                                    type="number"
                                    name="online"
                                    value={formData.online}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <div>
                                <label className="block mb-2">
                                    Cash Amount
                                </label>
                                <input
                                    type="number"
                                    name="cash"
                                    value={formData.cash}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Cheque Amount
                                </label>
                                <input
                                    type="number"
                                    name="cheque"
                                    value={formData.cheque}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>
                            {

                                formData.remaining>0 && (
                                    <div>
                                        <label className="block mb-2">
                                            Next Installment Date
                                        </label>
                                        <DatePicker
                                            name="nextPaymentDate"
                                            selected={nextPaymentDate}
                                            onChange={(date)=>setNextPaymentDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown
                                            showYearDropdown

                                            dropdownMode="select"

                                            className="w-full border rounded-lg p-3"
                                            placeholderText="Select Date"
                                        />

                                    </div>
                                )
                            }
                            <div>
                                <label className="block mb-2">
                                    Payment Date
                                </label>
                                <DatePicker
                                    name="paymentDate"
                                    selected={paymentDate}
                                    onChange={(date)=>setPaymentDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="w-full border rounded-lg p-3"
                                    placeholderText="Select Date"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            Save Member
                        </button>
                    </div>

                </form>

            </div>
        </DashboardLayout>
    );
}

export  default Memberadd;