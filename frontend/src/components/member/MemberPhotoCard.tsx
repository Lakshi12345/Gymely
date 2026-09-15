import { useRef, useState } from "react";
import Webcam from "react-webcam";
import ComponentCard from "../common/ComponentCard";

interface MemberPhotoCardProps {
    photo: File | null;
    preview: string | null;
    onChange: (photo: File | null, preview: string | null) => void;
}

export default function MemberPhotoCard({ photo, preview, onChange }: MemberPhotoCardProps) {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
    );

    const videoConstraints = {
        width: 400,
        height: 400,
        facingMode: {
            ideal: isMobile ? "environment" : "user",
        },
    };

    const webcamRef = useRef<Webcam>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [cameraOpen, setCameraOpen] = useState(false);

    const resizeImage = (src: string) => {
        const image = new Image();

        image.onload = () => {
            const canvas = document.createElement("canvas");

            canvas.width = 400;
            canvas.height = 400;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            ctx.drawImage(image, 0, 0, 400, 400);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return;

                    const file = new File([blob], `member-${Date.now()}.jpg`, {
                        type: "image/jpeg",
                    });

                    const preview = URL.createObjectURL(blob);

                    onChange(file, preview);
                },
                "image/jpeg",
                0.8
            );
        };

        image.src = src;
    };

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            resizeImage(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const captureImage = () => {
        const image = webcamRef.current?.getScreenshot();

        if (!image) return;

        resizeImage(image);

        setCameraOpen(false);
    };

    return (
        <ComponentCard title="Member Photo">
            <div className="space-y-5">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="flex h-[400px] w-[400px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-100">
                            {cameraOpen ? (
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="h-full w-full object-cover"
                                    videoConstraints={videoConstraints}
                                />
                            ) : preview ? (
                                <img
                                    src={preview}
                                    alt="Member"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="text-center">
                                    <svg
                                        className="mx-auto mb-4 h-16 w-16 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 7.5h2.25l1.5-2.25h3l1.5 2.25h2.25A2.25 2.25 0 0119.5 9.75v6A2.25 2.25 0 0117.25 18h-10.5A2.25 2.25 0 014.5 15.75v-6A2.25 2.25 0 016.75 7.5z"
                                        />

                                        <circle cx="12" cy="12.75" r="3" />
                                    </svg>

                                    <p className="text-gray-500">No Photo Selected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={uploadImage}
                />

                <div className="flex flex-wrap justify-center gap-3">
                    {!cameraOpen ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setCameraOpen(true)}
                                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                📷 Open Camera
                            </button>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-brand-600 hover:bg-brand-700 rounded-lg px-5 py-3 font-medium text-white transition"
                            >
                                📁 Upload Photo
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={captureImage}
                                className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                            >
                                📸 Capture Photo
                            </button>

                            <button
                                type="button"
                                onClick={() => setCameraOpen(false)}
                                className="rounded-lg bg-gray-600 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </>
                    )}

                    {photo && !cameraOpen && (
                        <button
                            type="button"
                            onClick={() => onChange(null, null)}
                            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                        >
                            🗑 Remove Photo
                        </button>
                    )}
                </div>
            </div>
        </ComponentCard>
    );
}
