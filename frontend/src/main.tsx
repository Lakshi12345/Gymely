// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import "./index.css";
// import "swiper/swiper-bundle.css";
// import "flatpickr/dist/flatpickr.css";
// import App from "./App.tsx";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";
//
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <AppWrapper>
//         <App />
//       </AppWrapper>
//     </ThemeProvider>
//   </StrictMode>,
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
            <BrowserRouter>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration : 3000,
                    }}
                    containerStyle={{
                        zIndex: 99999,
                    }}
                />
            </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);