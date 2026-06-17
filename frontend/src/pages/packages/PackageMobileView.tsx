import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";

interface Props {
    packages: any[];

    onDelete: (pack: any) => void;
}

export default function PackageMobileView({ packages, onDelete }: Props) {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            {packages.map((pack, index) => (
                <div
                    key={pack._id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
                >
                    {/* Header */}

                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                                {pack.packageName}
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">Package #{index + 1}</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            ₹{pack.amount}
                        </div>
                    </div>

                    {/* Details */}

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-gray-400">Duration : </p>

                            <p className="font-medium">{pack.duration} Days</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Include GST : </p>

                            <p className="font-medium">{pack.isIncludeGst}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400">Maximum Discount Percent : </p>

                        <p className="font-medium">{pack.minimumSalePercent}%</p>
                    </div>

                    {/* Services */}

                    <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-gray-700">Services</p>

                        <div className="flex flex-wrap gap-2">
                            {pack.services.map((ser: any, i: number) => (
                                <div
                                    key={i}
                                    className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-700"
                                >
                                    {ser.name}

                                    {" • "}

                                    {ser.session}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}

                    <div className="mt-5 flex gap-2">
                        <Button
                            children="Edit"
                            className="flex-1 bg-yellow-600 py-2 text-xs"
                            onClick={() => navigate(`/dashboard/PackageEdit/${pack._id}`)}
                        />

                        <Button
                            children="Delete"
                            className="flex-1 bg-red-600 py-2 text-xs"
                            onClick={() => {
                                onDelete(pack);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
