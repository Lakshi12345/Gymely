import {Link} from "react-router-dom";
import React, {useState} from "react";
import api from "../services/api.ts";
function Register() {

    const [formData, setFormData] = useState({
        gymName : "",
        email : "",
        mobile : "",
        password : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }


    const handleSubmit = async (e : React.FormEvent)=>{
        e.preventDefault();

        try{
            const response = await api.post('/auth/register', formData);
            console.log(response.data);
            alert(response.data.message);
            setFormData({
                gymName:  "",
                mobile:  "",
                email: "",
                password: "",
            });
        }catch (error:any){
            console.log(error.response?.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Gym Management
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter gym name" name="gymName"
                            value={formData.gymName}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Mobile
                        </label>

                        <input
                            type="number"
                            placeholder="Enter gym mobile" name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email" name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password" name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm mt-5">
                    Don't have an account?{" "}
                    <Link to="/" className="text-blue-600 cursor-pointer" >Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;