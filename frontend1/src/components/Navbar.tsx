import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/login");
    };

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between">

            <h1 className="font-bold text-xl">
                Dashboard
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;