import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { useEffect, useState } from "react";
import api from "../../services/api.ts";
import Button from "../../components/ui/button/Button.tsx";
import { Modal } from "../../components/ui/modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useDevice from "../../hooks/useDevice.ts";
import PackageMobileView from "./PackageMobileView.tsx";
export default function PackageAll() {
    const navigate = useNavigate();
    useEffect(() => {
        fetchPackages();
    }, []);
    const [packages, setPackges] = useState<any[]>([]);

    const fetchPackages = async () => {
        try {
            const response = await api.get("/package/getallPackages");
            console.log(response.data);
            setPackges(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    const handleDelete = async () => {
        console.log(selectedPackage);
        try {
            const response = await api.delete(`/package/deletePackage/${selectedPackage._id}`);
            // alert(response.data.message);
            toast.success(response.data.message);
            // alert(packageName);
            await fetchPackages();
            setDeleteModal(false);
        } catch (error: any) {
            console.log(error.response?.data);
        }
    };
    const { isMobile } = useDevice();
    const handleDeleteClick = (pack: any) => {
        setSelectedPackage(pack);

        setDeleteModal(true);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="All Packages" />
            <div className="space-y-6">
                <ComponentCard title="Package Information">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            {isMobile ? (
                                <PackageMobileView
                                    packages={packages}
                                    onDelete={handleDeleteClick}
                                />
                            ) : (
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Sl
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Package Name
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Duration
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Amount
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Services
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                GST included
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                Minimum Sale Percent
                                            </TableCell>
                                            <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                                                #
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {packages.map((pack, index) => (
                                            <TableRow key={pack._id}>
                                                <TableCell className="px-5 py-4 text-start sm:px-6">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    {pack.packageName}
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    {pack.duration}
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    {pack.amount}
                                                </TableCell>

                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    <ul>
                                                        {pack.services.map((jsonObj: any) => (
                                                            <li>
                                                                {jsonObj.name} - {jsonObj.session}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    {pack.isIncludeGst}
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                                    {`${pack.minimumSalePercent}%`}
                                                </TableCell>
                                                <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            children="Edit"
                                                            className="bg-yellow-600 px-3 py-1 text-xs"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/dashboard/PackageEdit/${pack._id}`
                                                                )
                                                            }
                                                        />

                                                        <Button
                                                            onClick={() => {
                                                                handleDeleteClick(pack);
                                                            }}
                                                            children="Delete"
                                                            className="bg-red-600 px-3 py-1 text-xs"
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                            <Modal
                                isOpen={deleteModal}
                                onClose={() => setDeleteModal(false)}
                                className="max-w-md p-6"
                            >
                                <div className="text-center">
                                    <h3 className="mb-2 text-lg font-semibold"> Delete Package </h3>

                                    <p className="mb-5 text-gray-500">
                                        Are you sure you want to delete
                                        <span className="font-semibold">
                                            {" "}
                                            {selectedPackage?.packageName}
                                        </span>
                                        ?
                                    </p>

                                    <div className="flex justify-center gap-3">
                                        <Button
                                            children="Cancel"
                                            className="bg-gray-400 px-4 py-2"
                                            onClick={() => setDeleteModal(false)}
                                        />

                                        <Button
                                            children="Delete"
                                            className="bg-red-600 px-4 py-2"
                                            onClick={handleDelete}
                                        />
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}
