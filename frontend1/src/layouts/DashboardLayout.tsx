import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DashboardLayout({children,}: any) {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">

                <Navbar />

                <main className="flex-1 p-6 bg-gray-100">

                    {children}

                </main>

                <Footer />

            </div>

        </div>
    );
}

export default DashboardLayout;