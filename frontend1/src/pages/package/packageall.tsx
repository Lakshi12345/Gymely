import DashboardLayout from "../../layouts/DashboardLayout.tsx";
import {useEffect,useState} from "react";
import api from "../../services/api.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function PackageAll(){

const navigate = useNavigate()

    useEffect(() => {
        fetchPackage();
    }, []);

    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const fetchPackage = async ()=>{
        try{
            const response = await  api.get('/package/getallPackages');
            console.log(response.data);
            setPackages(response.data.data);
        }catch (error){
            console.log(error);
        }
    }

    const handleDelete = async (packageData: any)=>{

        try{
            setShowDeleteModal(true);
            setSelectedPackage(packageData);
        }catch (error : any){
            console.log(error.response?.data);
        }
    }

    const confirmDelete = async ()=>{
        try{
            const response = await api.delete(`/package/deletePackage/${selectedPackage._id}`);
            // alert(response.data.message);
            setShowDeleteModal(false);
            toast.success(response.data.message);
            // alert(packageName);
            await  fetchPackage();

        }catch (error : any){
            console.log(error.response?.data);
        }
    }

    // @ts-ignore
    // @ts-ignore
    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    All Packages
                </h1>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">
                            Package Name
                        </th>

                        <th className="text-left p-4">
                            Duration
                        </th>

                        <th className="text-left p-4">
                            Type
                        </th>

                        <th className="text-left p-4">
                            Amount
                        </th>

                        <th className="text-left p-4">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        packages.map(
                            (pkg) => (
                                <tr
                                    key={pkg._id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {
                                            pkg.packageName
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.duration
                                        } Months
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.pType
                                        }
                                    </td>

                                    <td className="p-4">
                                        ₹
                                        {
                                            pkg.amount
                                        }
                                    </td>

                                    <td className="p-4 space-x-2">

                                        <button

                                            onClick={()=>

                                                // navigate(`/PackageEdit`)
                                                navigate(`/PackageEdit/${pkg._id}`)
                                        }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={()=>handleDelete(pkg)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                    </tbody>

                </table>
                {
                    showDeleteModal && (

                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

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
                                        {selectedPackage?.packageName}

                                    </span>

                                    ?

                                </p>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(
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

            </div>



        </DashboardLayout>

    );
}
export  default PackageAll;