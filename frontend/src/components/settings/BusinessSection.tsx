import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";

interface BusinessSettings {
    monthlyTarget?: number;
    clientReferral?: number;
    trainerReferral?: number;
    ptEarning?: number;
    paidLeaves?: number;
    redeemPercent?: number;
    pointsExpiry?: number;
}

interface Props {
    data: BusinessSettings;
    onConfigure: () => void;
}

export default function BusinessSection({ data, onConfigure }: Props) {
    return (
        <SettingSection
            id="business"
            title="Business Settings"
            description="Configure business rules, referrals and rewards."
            onConfigure={onConfigure}
        >
            <SettingRow
                label="Monthly Sales Target"
                value={`₹ ${Number(data.monthlyTarget || 0).toLocaleString()}`}
            />

            <SettingRow label="Client Referral" value={`${data.clientReferral ?? 0}%`} />

            <SettingRow label="Trainer Referral" value={`${data.trainerReferral ?? 0}%`} />

            <SettingRow label="Instructor PT Earning" value={`${data.ptEarning ?? 0}%`} />

            <SettingRow label="Paid Leaves" value={`${data.paidLeaves ?? 0} Days / Month`} />

            <SettingRow label="Maximum Redeem" value={`${data.redeemPercent ?? 0}%`} />

            <SettingRow
                label="Gym Points Expiry"
                value={`${data.pointsExpiry ?? 0} Days`}
                border={false}
            />
        </SettingSection>
    );
}
