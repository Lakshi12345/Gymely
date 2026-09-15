import { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown.tsx";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";

interface CollectionAnalyticsProps {
    data: {
        today: number;
        yesterday: number;
        week: number;
        month: number;
        growth: number;
        chart: number[];
    };
}

export default function CollectionAnalytics({ data }: CollectionAnalyticsProps) {
    const sales = [
        { day: 1, amount: 12000 },
        { day: 2, amount: 18000 },
        { day: 3, amount: 22000 },
        { day: 5, amount: 15000 },
        { day: 8, amount: 28000 },
        { day: 12, amount: 24000 },
        { day: 15, amount: 18450 },
    ];

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const categories = Array.from({ length: totalDays }, (_, index) => String(index + 1));

    const chartData = Array(totalDays).fill(0);

    sales.forEach((item) => {
        chartData[item.day - 1] = item.amount;
    });

    const [isOpen, setIsOpen] = useState(false);

    const options: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
            fontFamily: "Outfit, sans-serif",
        },

        colors: ["#465FFF"],

        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: "70%",
            },
        },

        dataLabels: {
            enabled: false,
        },

        stroke: {
            show: false,
        },

        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 4,
        },

        xaxis: {
            categories,

            axisBorder: {
                show: false,
            },

            axisTicks: {
                show: false,
            },

            labels: {
                rotate: 0,
                style: {
                    fontSize: "11px",
                },
            },
        },

        yaxis: {
            labels: {
                formatter: (value) => `₹${(value / 1000).toFixed(0)}k`,
            },
        },

        tooltip: {
            y: {
                formatter: (value) => `₹${value.toLocaleString()}`,
            },
        },
    };

    const series = [
        {
            name: "Collection",
            data: data.chart,
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Collection Analytics
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">Monthly collection summary</p>
                </div>

                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <MoreDotIcon className="size-6 text-gray-400 hover:text-gray-700" />
                    </button>

                    <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
                        <DropdownItem onItemClick={() => setIsOpen(false)}>This Week</DropdownItem>

                        <DropdownItem onItemClick={() => setIsOpen(false)}>This Month</DropdownItem>

                        <DropdownItem onItemClick={() => setIsOpen(false)}>This Year</DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="px-3 pt-2">
                <Chart options={options} series={series} type="bar" height={260} />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-gray-200 p-4 lg:grid-cols-4 dark:border-gray-800">
                <div>
                    <p className="text-xs text-gray-500">Today</p>

                    <h4 className="mt-1 text-lg font-bold">₹{data.today.toLocaleString()}</h4>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Yesterday</p>

                    <h4 className="mt-1 text-lg font-bold">₹{data.yesterday.toLocaleString()}</h4>
                </div>

                <div>
                    <p className="text-xs text-gray-500">This Week</p>

                    <h4 className="mt-1 text-lg font-bold">₹{data.week.toLocaleString()}</h4>
                </div>

                <div>
                    <p className="text-xs text-gray-500">This Month</p>

                    <h4 className="mt-1 text-lg font-bold">₹{data.month.toLocaleString()}</h4>

                    <p
                        className={`mt-1 text-sm font-medium ${
                            data.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {data.growth >= 0 ? "▲" : "▼"} {Math.abs(data.growth)}%
                    </p>
                </div>
            </div>
        </div>
    );
}
