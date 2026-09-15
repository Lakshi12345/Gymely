import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import MemberInfoCard from "../../components/member/MemberInfoCard";

import { MemberForm, Package, PaymentForm, MembershipForm } from "../../types/member";

import MembershipCard from "../../components/member/MembershipCard";
import SummarySidebar from "../../components/member/SummarySidebar";
import { useState, useEffect } from "react";
import api from "../../services/api.ts";
import BillingCard from "../../components/member/BillingCard.tsx";

import useMemberCalculator from "../../hooks/useMemberCalculator";
import StepNavigation from "../../components/member/StepNavigation.tsx";

import { calculateBill } from "../../utils/billingCalculator";
import MemberPhotoCard from "../../components/member/MemberPhotoCard";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function MemberAdd() {
    const navigate = useNavigate();

    const [photo, setPhoto] = useState<{
        file: File | null;
        preview: string | null;
    }>({
        file: null,
        preview: null,
    });

    const [loading, setLoading] = useState(false);
    // const [received, setReceived] = useState(0);
    const [invoiceType, setInvoiceType] = useState<"Non Tax" | "GST" | "VAT">("Non Tax");

    const [membership, setMembership] = useState<MembershipForm>({
        startDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date().toISOString().split("T")[0],
        enrollmentDate: new Date().toISOString().split("T")[0],
    });

    const [billingSetting] = useState({
        taxPercentage: 18,
    });

    const [currentStep, setCurrentStep] = useState(1);
    const handleMembershipChange = (field: keyof MembershipForm, value: any) => {
        setMembership((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [member, setMember] = useState<MemberForm>({
        name: "",
        mobile: "",
        email: "",
        gender: "Male",
        birthDate: "",
    });

    const [payment, setPayment] = useState<PaymentForm>({
        discount: 0,
        convenienceFee: 0,
        received: 0,
        registrationAmount: 0,
        nextPaymentDate: "",
        payments: [
            {
                method: "Cash",
                amount: 0,
                referenceNumber: "",
            },
        ],

        paymentDate: new Date().toISOString().split("T")[0],
        remark: "",
        soldBy: "",
    });

    const handlePaymentChange = (field: keyof PaymentForm, value: any) => {
        setPayment((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [packages, setPackages] = useState<Package[]>([]);

    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const handleMemberChange = (field: keyof MemberForm, value: string) => {
        setMember((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePackageChange = (packageId: string) => {
        const pkg = packages.find((p) => p._id === packageId);

        if (!pkg) return;
        setSelectedPackage(pkg);

        // Automatically select invoice type based on package
        if (pkg.taxIncluded) {
            setInvoiceType("GST");
        } else {
            setInvoiceType("Non Tax");
        }
    };

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get("/package/getallPackages");
                setPackages(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPackages();
    }, []);

    const calculator = useMemberCalculator({
        selectedPackage,
        payment,
        membership,
    });

    const bill = calculateBill({
        amount: selectedPackage?.amount || 0,

        discount: payment.discount,

        registrationAmount: payment.registrationAmount || 0,

        convenienceFee: payment.convenienceFee,

        invoiceType,

        taxIncluded: selectedPackage?.taxIncluded || false,

        taxPercentage: billingSetting.taxPercentage,
    });

    const received = payment.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const handleEnroll = async () => {
        setLoading(true);
        if (!selectedPackage) {
            alert("Please select a package");
            return;
        }

        try {
            const payload = {
                member,

                package: selectedPackage,

                membership: {
                    ...membership,
                    expiryDate: calculator.expiryDate,
                },

                payment: {
                    ...payment,
                    received,

                    tax: {
                        invoiceType: invoiceType,
                        taxPercentage: billingSetting.taxPercentage,
                        taxIncluded: selectedPackage.taxIncluded,

                        baseAmount: bill.baseAmount,
                        subTotal: bill.subTotal,
                        taxAmount: bill.taxAmount,
                        grandTotal: bill.grandTotal,
                    },
                },
            };

            const formData = new FormData();

            if (photo.file) {
                formData.append("profile", photo.file);
            }

            formData.append("data", JSON.stringify(payload));
            // console.log(formData);

            try {
                const response = await api.post("/member/addMember", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Member added:", response.data);
                setLoading(false);
                navigate(`/dashboard/invoicelist/viewbill/${response.data.data.transaction._id}`);
            } catch (error) {
                console.error("Failed to add member:", error);
                setLoading(false);
                // @ts-ignore
                toast.error(error?.response?.data?.error || "Something went wrong");
            }

            // console.log(response.data);
        } catch (error: any) {
            console.log("Error:", error);
            toast.error(error?.response?.data?.error || "Failed to update general settings");
        }
    };
    return (
        <>
            <PageBreadcrumb pageTitle="Add New Member" />

            <div className="space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 space-y-6 xl:col-span-8">
                        {currentStep === 1 && (
                            <>
                                <MemberInfoCard
                                    member={member}
                                    packages={packages}
                                    selectedPackage={selectedPackage}
                                    onInputChange={handleMemberChange}
                                    onPackageChange={handlePackageChange}
                                />
                                <MemberPhotoCard
                                    photo={photo.file}
                                    preview={photo.preview}
                                    onChange={(file, preview) =>
                                        setPhoto({
                                            file,
                                            preview,
                                        })
                                    }
                                />
                            </>
                        )}

                        {currentStep === 2 && (
                            <MembershipCard
                                membership={{
                                    ...membership,
                                    expiryDate: calculator.expiryDate,
                                }}
                                selectedPackage={selectedPackage}
                                onChange={handleMembershipChange}
                            />
                        )}

                        {currentStep === 3 && (
                            <BillingCard
                                selectedPackage={selectedPackage}
                                payment={payment}
                                bill={bill}
                                invoiceType={invoiceType}
                                billingSetting={billingSetting}
                                onInvoiceTypeChange={setInvoiceType}
                                onChange={handlePaymentChange}
                            />
                        )}

                        <StepNavigation
                            step={currentStep}
                            totalSteps={3}
                            disableNext={
                                (currentStep === 1 &&
                                    (!member.name || !member.mobile || !selectedPackage)) ||
                                (currentStep === 3 && received <= 0)
                            }
                            onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                            onNext={() => {
                                if (currentStep === 3) {
                                    handleEnroll();
                                    return;
                                }

                                setCurrentStep((prev) => Math.min(prev + 1, 3));
                            }}
                            nextLabel={currentStep === 3 ? "Enroll Member" : "Continue"}
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <SummarySidebar
                            member={member}
                            selectedPackage={selectedPackage}
                            payment={payment}
                            membership={{
                                ...membership,
                                expiryDate: calculator.expiryDate,
                            }}
                            invoiceType={invoiceType}
                            bill={bill}
                            billingSetting={billingSetting}
                        />
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 z-99999999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-96 rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">
                        <div className="mb-6 flex justify-center">
                            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                        </div>

                        <h3 className="text-center text-xl font-bold">Adding Member</h3>

                        <p className="mt-2 text-center text-sm text-gray-500">
                            Please wait while we create the member, activate the membership, and
                            generate your invoice.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
