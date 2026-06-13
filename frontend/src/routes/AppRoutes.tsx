import { Routes, Route,Navigate } from "react-router-dom";

import Login from "../pages/AuthPages/SignIn.tsx";
import Dashboard from "../pages/Dashboard/Home.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import PackageAdd from "../pages/packages/packageAdd.tsx";
import Services from "../pages/settings/services.tsx";

function AppRoutes() {


    const token = localStorage.getItem("token");

    return (
        <>
            <ScrollToTop />

            <Routes>
                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/dashboard/home" replace />
                            : <Login />
                    }
                />


                {/* Layout Route */}
                <Route
                    element={<AppLayout />}
                >
                    <Route
                        path="/dashboard/home"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/dashboard/packageadd"
                        element={
                            <PrivateRoute>
                                <PackageAdd />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/dashboard/services"
                        element={
                            <PrivateRoute>
                                <Services />
                            </PrivateRoute>
                        }
                    />



                </Route>

                <Route
                    path="*"
                    element={
                        token
                            ? <Navigate to="/dashboard/home" replace /> :

                            <Login />
                    }
                />

            </Routes>
        </>
    );
}

export default AppRoutes;