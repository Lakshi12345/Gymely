import useFacebookSDK from "../../hooks/useFacebookSDK";

export default function ConnectWhatsAppButton() {
    const { loaded, fb } = useFacebookSDK();

    const handleConnect = () => {
        if (!loaded) {
            alert("Facebook SDK is loading...");
            return;
        }

        fb.login(
            function (response: any) {
                console.log("Meta Response:", response);
            },
            {
                config_id: import.meta.env.VITE_META_CONFIG_ID,
                response_type: "code",
                override_default_response_type: true,
                extras: {
                    feature: "whatsapp_embedded_signup",
                    sessionInfoVersion: 3,
                },
            }
        );
    };

    return <button onClick={handleConnect}>Connect WhatsApp</button>;
    // console.log("ConnectWhatsAppButton rendered");

    // return <div className="bg-red-500 p-4 text-white">Hello WhatsApp</div>;
}
