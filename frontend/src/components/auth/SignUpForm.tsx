import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import api from "../../services/api";

interface RegisterForm {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!form.name.trim()) {
            setError("Please enter your gym name.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!form.mobile.trim()) {
            setError("Please enter your mobile number.");
            return;
        }

        if (!/^[0-9]{10}$/.test(form.mobile)) {
            setError("Please enter a valid 10 digit mobile number.");
            return;
        }

        if (!form.password) {
            setError("Please enter a password.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!isChecked) {
            setError("Please accept the Terms and Conditions.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/register", {
                name: form.name,
                email: form.email,
                mobile: form.mobile,
                password: form.password,
            });

            if (response.data?.success === false) {
                throw new Error(response.data?.message || "Registration failed.");
            }

            setSuccess("Gym account created successfully. Redirecting...");

            // Save JWT
            localStorage.setItem("token", response.data.data.token);

            // Optional: save user
            localStorage.setItem("user", JSON.stringify(response.data.data.user));

            // Directly enter dashboard
            navigate("/dashboard/home");
        } catch (err: any) {
            console.error("Registration error:", err);

            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Unable to create account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="no-scrollbar flex w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
            {/* Back */}

            <div className="mx-auto mb-5 w-full max-w-md sm:pt-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeftIcon className="size-5" />
                    Back to dashboard
                </Link>
            </div>

            {/* Form */}

            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                <div>
                    {/* Heading */}

                    <div className="mb-5 sm:mb-8">
                        <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
                            Create your Gymely account
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Register your gym and start managing your business with Gymely.
                        </p>
                    </div>

                    {/* Error */}

                    {error && (
                        <div className="border-error-200 bg-error-50 text-error-600 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-400 mb-5 rounded-lg border px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Success */}

                    {success && (
                        <div className="border-success-200 bg-success-50 text-success-600 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-400 mb-5 rounded-lg border px-4 py-3 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* Gym Name */}

                            <div>
                                <Label>
                                    Gym Name
                                    <span className="text-error-500">*</span>
                                </Label>

                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your gym name"
                                />
                            </div>

                            {/* Email */}

                            <div>
                                <Label>
                                    Email
                                    <span className="text-error-500">*</span>
                                </Label>

                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Mobile */}

                            <div>
                                <Label>
                                    Mobile
                                    <span className="text-error-500">*</span>
                                </Label>

                                <Input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    maxLength={10}
                                />
                            </div>

                            {/* Password */}

                            <div>
                                <Label>
                                    Password
                                    <span className="text-error-500">*</span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        type={showPassword ? "text" : "password"}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}

                            <div>
                                <Label>
                                    Confirm Password
                                    <span className="text-error-500">*</span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        type={showConfirmPassword ? "text" : "password"}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}

                            <div className="flex items-start gap-3">
                                <Checkbox
                                    className="mt-0.5 h-5 w-5"
                                    checked={isChecked}
                                    onChange={setIsChecked}
                                />

                                <p className="text-sm leading-5 font-normal text-gray-500 dark:text-gray-400">
                                    By creating an account, you agree to our{" "}
                                    <Link
                                        to="/terms"
                                        className="text-gray-800 hover:underline dark:text-white/90"
                                    >
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/privacy"
                                        className="text-gray-800 hover:underline dark:text-white/90"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>

                            {/* Submit */}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="mr-2 h-5 w-5 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />

                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Gym Account"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Sign In */}

                    <div className="mt-5">
                        <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/signin"
                                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
