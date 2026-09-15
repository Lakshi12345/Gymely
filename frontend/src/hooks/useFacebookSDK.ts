import { useEffect, useState } from "react";

declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: any;
    }
}

const APP_ID = import.meta.env.VITE_META_APP_ID;

export default function useFacebookSDK() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (window.FB) {
            setLoaded(true);
            return;
        }

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: APP_ID,
                cookie: true,
                xfbml: false,
                version: "v23.0",
            });

            setLoaded(true);
        };

        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return {
        loaded,
        fb: window.FB,
    };
}
