import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <ThemeProvider>
            <BrowserRouter>
                <App />

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                    }}
                    containerStyle={{
                        zIndex: 99999,
                    }}
                />
            </BrowserRouter>
        </ThemeProvider>
    </HelmetProvider>
);
