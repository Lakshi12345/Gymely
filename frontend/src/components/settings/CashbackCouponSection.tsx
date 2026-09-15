import SettingSection from "./SettingSection";

interface CashbackCoupon {
    id: string;
    code: string;
    cashback: number;
    expiry?: string;
    active: boolean;
}

interface Props {
    data?: CashbackCoupon[];
    onConfigure: () => void;
}

export default function CashbackCouponSection({ data = [], onConfigure }: Props) {
    return (
        <SettingSection
            id="coupon"
            title="Cashback Coupons"
            description="Manage cashback offers and promotional coupons."
            onConfigure={onConfigure}
        >
            {data.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No cashback coupons available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total Coupons
                            </p>

                            <h4 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                {data.length}
                            </h4>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.slice(0, 5).map((coupon) => (
                            <div
                                key={coupon.id}
                                className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                            >
                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white">
                                        {coupon.code}
                                    </h5>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Cashback: {coupon.cashback}%
                                    </p>

                                    {coupon.expiry && (
                                        <p className="text-xs text-gray-400">
                                            Expires: {coupon.expiry}
                                        </p>
                                    )}
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        coupon.active
                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                    }`}
                                >
                                    {coupon.active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </SettingSection>
    );
}
