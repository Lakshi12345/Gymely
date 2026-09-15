import { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    data: {
        today: number;
        yesterday: number;
        morning: number;
        evening: number;
        peakHour: string;
        chart: number[];
    };
}

export default function AttendanceAnalytics({ data }: Props) {
    const navigate = useNavigate();

    const options: ApexOptions = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
            fontFamily: "Outfit, sans-serif",
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        colors: ["#22C55E"],
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.4,
                opacityTo: 0.05,
            },
        },
        xaxis: {
            categories: ["6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
        },
        grid: {
            borderColor: "#E5E7EB",
        },
    };

    const series = [
        {
            name: "Attendance",
            data: data.chart,
        },
    ];

    const growth = (((data.today - data.yesterday) / data.yesterday) * 100).toFixed(1);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Attendance Analytics
                </h3>

                <p className="text-sm text-gray-500">Today's gym visits</p>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.today}
                    </h2>

                    <p className="text-sm text-green-600">↑ {growth}% from yesterday</p>
                </div>

                <Chart options={options} series={series} type="area" height={250} />

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Morning</p>

                        <h4 className="mt-1 text-lg font-bold">{data.morning}</h4>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Evening</p>

                        <h4 className="mt-1 text-lg font-bold">{data.evening}</h4>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Peak Time</p>

                        <h4 className="mt-1 text-lg font-bold">{data.peakHour}</h4>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate("/dashboard/attendance")}
                className="text-brand-600 flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
            >
                View Attendance
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
