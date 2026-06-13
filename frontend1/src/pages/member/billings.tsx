import DashboardLayout from "../../layouts/DashboardLayout.tsx";
import {useEffect,useState,useRef} from "react";
import api from "../../services/api.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import $ from 'jquery';
import 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.css";
import {setGlobalLoader} from "../../App.tsx";

function Billings(){

    const navigate = useNavigate()



    const [members, setMembers] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [

        invoiceModel,

        setInvoiceModel

    ] = useState(
        false
    );

    const [

        invoiceLink,

        setInvoiceLink

    ] = useState("");

    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        fetchPackage();
    }, []);

    useEffect(() => {
        let table : any;
        if(members.length){
            table = $(tableRef.current!

            ).DataTable({
                destroy : true,
                pageLength : 10,
            })
        }
        return ()=>{
            if(table){
                table.destroy();
            }
        };
    }, [members]);



    const fetchPackage = async ()=>{
        try{
            setGlobalLoader(
                true
            );

            const response = await  api.get('/member/allbillings');
            console.log(response.data);
            setMembers(response.data.data);
        }catch (error){
            console.log(error);
        }finally {

            setGlobalLoader(
                false
            );

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

    const viewBillHandle = async (id: any)=>{
        try {

            setGlobalLoader(
                true
            );


            const response = await api.get(`/member/viewBill/${id}`);
            console.log(response.data.data.invoicePath);
            setInvoiceLink(

                `http://localhost:5000/uploads/invoices/${response.data.data.invoiceName}`

            );

            setInvoiceModel(
                true
            );
        }catch (error : any){
            console.log(error.response?.data);
        }finally {
            setGlobalLoader(
                false
            );

        }

    }



    // @ts-ignore
    // @ts-ignore
    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Billings
                </h1>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full"

                       ref={tableRef}
                >

                    <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">
                             #
                        </th>
                        <th className="text-left p-4">#</th>

                        <th className="text-left p-4">
                             Name
                        </th>

                        <th className="text-left p-4">
                            Mobile
                        </th>

                        <th className="text-left p-4">
                            Plan
                        </th>
                        <th className="text-left p-4">
                            Paid Amount
                        </th>

                        <th className="text-left p-4">
                            Discount
                        </th>
                        <th className="text-left p-4">
                            Due Amount
                        </th>
                        <th className="text-left p-4">
                            Due Date
                        </th>
                        <th className="text-left p-4">
                            Payment Date
                        </th>

                        <th className="text-left p-4">
                            Start Date
                        </th>

                        <th className="text-left p-4">
                            End Date
                        </th>


                        <td className="text-left p-4">Action</td>
                    </tr>

                    </thead>

                    <tbody>

                    {

                        members.map(
                            (pkg, index) => (
                                <tr
                                    key={pkg._id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        {index  + 1}

                                    </td>
                                    <td>
                                        <button
                                            onClick={()=>viewBillHandle(pkg._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            View Bill
                                        </button>
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.name
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.mobile
                                        } Months
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.planName
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            pkg.cost
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.discount
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            pkg.remaining
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            pkg.nextPaymentDate
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            pkg.paymentDate
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            pkg.startDate
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            pkg.expiryDate
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
                                        {/*{selectedPackage?.packageName}*/}

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
                {
                    invoiceModel && (

                        <div className=
                                 "fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                            <div className=
                                     "relative bg-white p-4 rounded-xl">

                                <button

                                    onClick={() => {

                                        setInvoiceModel(
                                            false
                                        );

                                        setInvoiceLink(
                                            ""
                                        );

                                    }}

                                    className=
                                        "absolute top-2 right-2 text-xl"
                                >
                                    ×
                                </button>

                                <iframe

                                    src={
                                        `${invoiceLink}#zoom=80`
                                    }

                                    className=
                                        "w-[900px] h-[90vh] rounded-xl"

                                    title=
                                        "Invoice"

                                />

                            </div>

                        </div>

                    )
                }

            </div>



        </DashboardLayout>

    );
}
export  default Billings;