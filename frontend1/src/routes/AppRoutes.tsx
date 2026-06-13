import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard/dashboard.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Memberadd from "../pages/member/memberadd.tsx";
import PackageAdd from "../pages/package/packageadd.tsx";
import PackageAll from "../pages/package/packageall.tsx";
import PackageEdit from "../pages/package/packageedit.tsx";
import MemberAll from "../pages/member/memberall.tsx";
import Billings from "../pages/member/billings.tsx";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/memberAdd" element={<PrivateRoute><Memberadd/></PrivateRoute>}/>
                <Route path="/PackageAdd" element={<PrivateRoute><PackageAdd/></PrivateRoute>}/>
                <Route path="/PackageAll" element={<PrivateRoute><PackageAll/></PrivateRoute>}/>
                <Route path="/PackageEdit/:id" element={<PrivateRoute><PackageEdit/></PrivateRoute>}/>
                <Route path="/MemberAll" element={<PrivateRoute><MemberAll/></PrivateRoute>}/>
                <Route path="/billings" element={<PrivateRoute><Billings/></PrivateRoute>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>


        </BrowserRouter>
    );
}

export default AppRoutes;