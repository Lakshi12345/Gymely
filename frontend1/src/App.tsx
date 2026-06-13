import AppRoutes from "./routes/AppRoutes";

import {useEffect,useState} from "react";

import {io} from "socket.io-client";

import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export let setGlobalLoader: (loading: boolean) => void;
function App() {

    const [loading, setLoading] = useState(false);

    setGlobalLoader = setLoading;


    useEffect(

        () => {

            const socket =
                io(

                    "http://localhost:5000",

                    {

                        transports:
                            ["websocket"]

                    }

                );

            socket.on(

                "connect",

                () => {

                    console.log(

                        "Socket Connected ✅"

                    );

                }

            );

            socket.on(

                "attendance",

                (
                    data
                ) => {

                    toast.success(

                        `${data.memberName}
Attendance Marked`

                    );

                }

            );

            return () => {

                socket.disconnect();

            };

        },

        []

    );

    return (

        <>

            <AppRoutes />

            {

                loading && (

                    <div className=
                             "fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">

                        <div className=
                                 "bg-white p-5 rounded-xl shadow-lg">

                            <div className=
                                     "animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500">
                            </div>

                        </div>

                    </div>

                )

            }

            <ToastContainer />

        </>

    );

}

export default App;