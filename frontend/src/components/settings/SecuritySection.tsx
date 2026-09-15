import SettingRow from "./SettingRow";
import SettingSection from "./SettingSection";

interface SecuritySettings {
    graceDays?: number;
    autoBlockExpired?: boolean;
    autoBlockDue?: boolean;
    allowManualAttendance?: boolean;
    biometricRequired?: boolean;
    allowFutureJoining?: boolean;
}

interface Props {
    data: SecuritySettings;
    onConfigure: () => void;
}

export default function SecuritySection({ data, onConfigure }: Props) {
    return (
        <SettingSection
            id="security"
            title="Security Settings"
            description="Manage membership rules, attendance and security policies."
            onConfigure={onConfigure}
        >
            <SettingRow label="Grace Period" value={`${data.graceDays ?? 0} Days`} />

            <SettingRow
                label="Auto Block Expired Members"
                value={data.autoBlockExpired ? "Enabled" : "Disabled"}
            />

            <SettingRow
                label="Auto Block Due Members"
                value={data.autoBlockDue ? "Enabled" : "Disabled"}
            />

            <SettingRow
                label="Allow Manual Attendance"
                value={data.allowManualAttendance ? "Enabled" : "Disabled"}
            />

            <SettingRow
                label="Biometric Attendance"
                value={data.biometricRequired ? "Required" : "Optional"}
            />

            <SettingRow
                label="Allow Future Joining"
                value={data.allowFutureJoining ? "Enabled" : "Disabled"}
                border={false}
            />
        </SettingSection>
    );
}
