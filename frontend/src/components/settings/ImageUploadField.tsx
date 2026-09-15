import { ChangeEvent } from "react";

interface ImageUploadFieldProps {
    label: string;
    value?: string;
    onChange: (file: File | null) => void;
}

export default function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg border bg-gray-100 dark:bg-gray-800">
                        {value ? (
                            <img src={value} alt={label} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm"
                        />

                        <p className="mt-2 text-xs text-gray-500">PNG, JPG or SVG (Max 2 MB)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
