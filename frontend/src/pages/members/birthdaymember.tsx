import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import {
    Search,
    Gift,
    Cake,
    CalendarDays,
    Download,
    RefreshCw,
    Phone,
    Mail,
    MessageCircle,
    Users,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

interface BirthdayMember {
    _id: string;
    uid: string;
    name: string;
    mobile: string;
    email: string;
    gender: string;
    birthDate: string;
}

export default function BirthdayMemberAll() {
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [endDate, setEndDate] = useState<Date | null>(null);

    const [members, setMembers] = useState<BirthdayMember[]>([]);

    const fetchBirthdays = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setMembers([
            {
                _id: "1",
                uid: "4260",
                name: "Kishore KK",
                mobile: "8139871734",
                email: "kk@gmail.com",
                gender: "Male",
                birthDate: "05/08/2026",
            },

            {
                _id: "2",
                uid: "4261",
                name: "Nisanth Komal",
                mobile: "7899055512",
                email: "nisanth@gmail.com",
                gender: "Male",
                birthDate: "05/08/2026",
            },

            {
                _id: "3",
                uid: "4262",
                name: "Harshita",
                mobile: "7624991904",
                email: "harshita@gmail.com",
                gender: "Female",
                birthDate: "05/08/2026",
            },
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchBirthdays();
    }, []);

    const filteredMembers = useMemo(() => {
        return members.filter((item) => {
            return (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.mobile.includes(search)
            );
        });
    }, [members, search]);

    const dashboard = {
        total: members.length,

        male: members.filter((x) => x.gender === "Male").length,

        female: members.filter((x) => x.gender === "Female").length,

        today: members.length,
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Birthday Members" />

            <div className="space-y-6">
                {/* =======================================================
========================== HEADER =======================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-600">
                                <Cake size={16} />
                                Birthday Celebration Dashboard
                            </div>

                            <h1 className="text-3xl font-bold">Today's Birthday Stars 🎂</h1>

                            <p className="mt-3 text-sm text-gray-500">
                                Send birthday wishes, coupons, discounts, emails, and WhatsApp
                                messages to members.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                startIcon={<RefreshCw size={16} />}
                                onClick={fetchBirthdays}
                            >
                                Refresh
                            </Button>

                            <Button variant="outline" startIcon={<Download size={16} />}>
                                Export
                            </Button>

                            <Button startIcon={<Gift size={16} />}>Send Wishes</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
======================= DASHBOARD =======================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Birthdays</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.total}</h2>
                                </div>

                                <div className="rounded-2xl bg-pink-100 p-4">
                                    <Cake size={24} className="text-pink-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Male Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.male}</h2>
                                </div>

                                <div className="rounded-2xl bg-blue-100 p-4">
                                    <Users size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Female Members</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.female}</h2>
                                </div>

                                <div className="rounded-2xl bg-purple-100 p-4">
                                    <Gift size={24} className="text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 xl:col-span-3">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Today's Celebrations</p>

                                    <h2 className="mt-3 text-4xl font-bold">{dashboard.today}</h2>
                                </div>

                                <div className="rounded-2xl bg-yellow-100 p-4">
                                    <CalendarDays size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =======================================================
========================= FILTERS =======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-12 gap-5 p-6">
                        {/* SEARCH */}

                        <div className="col-span-12 xl:col-span-4">
                            <label className="mb-2 block text-sm font-medium">Search Member</label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <Input
                                    value={search}
                                    className="pl-11"
                                    placeholder="Search by name, UID or mobile"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* START DATE */}

                        <div className="col-span-12 md:col-span-4">
                            <label className="mb-2 block text-sm font-medium">Start Date</label>

                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select start date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>

                        {/* END DATE */}

                        <div className="col-span-12 md:col-span-4">
                            <label className="mb-2 block text-sm font-medium">End Date</label>

                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select end date"
                                className="h-11 w-full rounded-xl border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-3">
                                <Badge color="primary">{filteredMembers.length} Members</Badge>

                                <Badge color="success">Birthday Wishes</Badge>

                                <Badge color="warning">Coupon Campaign</Badge>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" startIcon={<RefreshCw size={16} />}>
                                    Reset
                                </Button>

                                <Button startIcon={<Download size={16} />}>Export</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =======================================================
========================== TABLE ========================
======================================================= */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left">SN</th>

                                    <th className="px-6 py-4 text-left">Birthday</th>

                                    <th className="px-6 py-4 text-left">UID</th>

                                    <th className="px-6 py-4 text-left">Name</th>

                                    <th className="px-6 py-4 text-left">Mobile</th>

                                    <th className="px-6 py-4 text-left">Email</th>

                                    <th className="px-6 py-4 text-left">Gender</th>

                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading
                                    ? [...Array(8)].map((_, index) => (
                                          <tr key={index}>
                                              <td colSpan={8} className="px-6 py-4">
                                                  <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
                                              </td>
                                          </tr>
                                      ))
                                    : filteredMembers.map((member, index) => (
                                          <tr
                                              key={member._id}
                                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                                          >
                                              {/* SN */}

                                              <td className="px-6 py-5">{index + 1}</td>

                                              {/* BIRTHDAY */}

                                              <td className="px-6 py-5">
                                                  <div className="flex items-center gap-3">
                                                      <div className="rounded-xl bg-pink-100 p-3">
                                                          <Cake
                                                              size={18}
                                                              className="text-pink-600"
                                                          />
                                                      </div>

                                                      <div>
                                                          <p className="font-semibold">
                                                              {member.birthDate}
                                                          </p>

                                                          <p className="text-xs text-gray-500">
                                                              Birthday celebration
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>

                                              {/* UID */}

                                              <td className="px-6 py-5">
                                                  <Link
                                                      to={`/member/${member.uid}`}
                                                      className="text-brand-600 font-medium"
                                                  >
                                                      {member.uid}
                                                  </Link>
                                              </td>

                                              {/* NAME */}

                                              <td className="px-6 py-5">
                                                  <div className="flex items-center gap-4">
                                                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white">
                                                          {member.name.charAt(0)}
                                                      </div>

                                                      <div>
                                                          <h4 className="font-semibold">
                                                              {member.name}
                                                          </h4>

                                                          <p className="text-xs text-gray-500">
                                                              Gym Member
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>

                                              {/* MOBILE */}

                                              <td className="px-6 py-5">{member.mobile}</td>

                                              {/* EMAIL */}

                                              <td className="px-6 py-5">
                                                  <div className="max-w-[220px] truncate">
                                                      {member.email}
                                                  </div>
                                              </td>

                                              {/* GENDER */}

                                              <td className="px-6 py-5">
                                                  {member.gender === "Male" ? (
                                                      <Badge color="info">Male</Badge>
                                                  ) : (
                                                      <Badge color="success">Female</Badge>
                                                  )}
                                              </td>

                                              {/* ACTIONS */}

                                              <td className="px-6 py-5">
                                                  <div className="flex flex-wrap justify-end gap-2">
                                                      <Button
                                                          size="sm"
                                                          startIcon={<Phone size={14} />}
                                                      >
                                                          Call
                                                      </Button>

                                                      <Button
                                                          size="sm"
                                                          variant="outline"
                                                          startIcon={<Mail size={14} />}
                                                      >
                                                          Email
                                                      </Button>

                                                      <Button
                                                          size="sm"
                                                          variant="outline"
                                                          startIcon={<MessageCircle size={14} />}
                                                      >
                                                          WhatsApp
                                                      </Button>

                                                      <Button
                                                          size="sm"
                                                          startIcon={<Gift size={14} />}
                                                      >
                                                          Wish
                                                      </Button>
                                                  </div>
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =======================================================
====================== EMPTY STATE ======================
======================================================= */}

                {!loading && filteredMembers.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-100">
                            <Cake size={42} className="text-pink-500" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">No birthdays found</h2>

                        <p className="mt-3 text-gray-500">
                            Try changing the selected dates or clear the filters.
                        </p>

                        <div className="mt-6">
                            <Button
                                onClick={() => {
                                    setSearch("");
                                    setStartDate(null);
                                    setEndDate(null);
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* =======================================================
======================= PAGINATION ======================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Showing
                                <span className="text-brand-600 mx-2">
                                    {filteredMembers.length}
                                </span>
                                birthday members
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Celebrate your members and build stronger relationships.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline">Previous</Button>

                            <Button>1</Button>

                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>

                {/* =======================================================
==================== CELEBRATION CARDS ==================
======================================================= */}

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-xl">
                            <p className="text-pink-100">Today's Birthdays</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.today}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-xl">
                            <p className="text-purple-100">Birthday Wishes</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.total}</h2>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white shadow-xl">
                            <p className="text-yellow-100">Gift Coupons</p>

                            <h2 className="mt-4 text-4xl font-bold">{dashboard.total}</h2>
                        </div>
                    </div>
                </div>

                {/* =======================================================
========================= FOOTER ========================
======================================================= */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold">Gymely Birthday Centre 🎂</h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Celebrate every member's special day through calls, emails, coupons,
                                gifts, SMS messages, and WhatsApp campaigns.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Badge color="primary">{dashboard.total} Members</Badge>

                            <Badge color="success">Wishes Sent</Badge>

                            <Badge color="warning">Gift Coupons</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
