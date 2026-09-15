import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { MenuIcons } from "../icons/MenuIcons.tsx";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: "Dashboard",
        subItems: [
            {
                name: "Overview",
                path: "/dashboard",
                pro: false,
            },
        ],
    },

    {
        icon: <ListIcon />,
        name: "CRM",
        subItems: [
            {
                name: "Lead Directory",
                path: "/dashboard/leadall",
                pro: false,
            },
            {
                name: "Capture Lead",
                path: "/dashboard/leadadd",
                pro: false,
            },
            {
                name: "Engagement",
                path: "/dashboard/leadfollowups",
                pro: false,
            },
        ],
    },

    {
        icon: <UserCircleIcon />,
        name: "Members",
        subItems: [
            {
                name: "New Member",
                path: "/dashboard/memberadd",
            },
            {
                name: "Member List",
                path: "/dashboard/memberall",
            },
            {
                name: "Memberships",
                path: "/dashboard/memberships",
            },
            {
                name: "Follow-ups",
                path: "/dashboard/memberfollowups",
            },
            {
                name: "Absent Members",
                path: "/dashboard/memberabsentees",
            },
            {
                name: "Birthdays",
                path: "/dashboard/memberbirthdays",
            },
            {
                name: "Attendance",
                path: "/dashboard/attendance",
            },
            {
                name: "Active Members",
                path: "/dashboard/livemembers",
            },
        ],
    },

    {
        icon: <TableIcon />,
        name: "Sales & Billing",
        subItems: [
            {
                name: "Invoices List",
                path: "/dashboard/invoicelist",
                pro: false,
            },
            {
                name: "Invoice Settings",
                path: "/dashboard/invoicesettings",
                pro: false,
            },
        ],
    },

    {
        icon: <BoxCubeIcon />,
        name: "Packages",
        subItems: [
            {
                name: "Add Package",
                path: "/dashboard/packageadd",
                pro: false,
            },
            {
                name: "All Packages",
                path: "/dashboard/packageall",
                pro: false,
            },
        ],
    },
    {
        icon: <CalenderIcon />,
        name: "Personal Training",
        subItems: [
            {
                name: "PT Memberships",
                path: "/dashboard/ptmemberships",
                pro: false,
            },
            {
                name: "Session History",
                path: "/dashboard/ptsessions",
                pro: false,
            },
            {
                name: "Claim Reports",
                path: "/dashboard/ptclaims",
                pro: false,
            },
        ],
    },

    {
        icon: <CalenderIcon />,
        name: "Workout",
        subItems: [
            {
                name: "Machines",
                path: "/dashboard/machines",
                pro: false,
            },
            {
                name: "Exercises",
                path: "/dashboard/exercises",
                pro: false,
            },
            {
                name: "Create Workout",
                path: "/dashboard/workoutadd",
                pro: false,
            },
            {
                name: "Workout Library",
                path: "/dashboard/workouts",
                pro: false,
            },
            {
                name: "Workout Groups",
                path: "/dashboard/workoutgroups",
                pro: false,
            },
            {
                name: "Create Workout Group",
                path: "/dashboard/workoutgroupadd",
                pro: false,
            },
            {
                name: "Send Workout",
                path: "/dashboard/sendworkout",
                pro: false,
            },
            {
                name: "Workout History",
                path: "/dashboard/workouthistory",
                pro: false,
            },
        ],
    },

    {
        icon: <CalenderIcon />,
        name: "Diet",
        subItems: [
            {
                name: "Diet Charts",
                path: "/dashboard/diets",
                pro: false,
            },
            {
                name: "Send Diet",
                path: "/dashboard/senddiet",
                pro: false,
            },
            {
                name: "Diet History",
                path: "/dashboard/diethistory",
                pro: false,
            },
            {
                name: "Diet Terms",
                path: "/dashboard/dietterms",
                pro: false,
            },
        ],
    },

    {
        icon: <CalenderIcon />,
        name: "Group Classes",
        subItems: [
            {
                name: "View Classes",
                path: "/dashboard/classes",
                pro: false,
            },
            {
                name: "Create Class",
                path: "/dashboard/classadd",
                pro: false,
            },
        ],
    },

    {
        icon: <BoxCubeIcon />,
        name: "Store",
        subItems: [
            {
                name: "Add Product",
                path: "/dashboard/productadd",
                pro: false,
            },
            {
                name: "Products",
                path: "/dashboard/products",
                pro: false,
            },
            {
                name: "Orders",
                path: "/dashboard/orders",
                pro: false,
            },
        ],
    },

    {
        icon: <UserCircleIcon />,
        name: "Staff",
        subItems: [
            {
                name: "Add Staff",
                path: "/dashboard/staffadd",
                pro: false,
            },
            {
                name: "All Staff",
                path: "/dashboard/staffall",
                pro: false,
            },
            {
                name: "Attendance Report",
                path: "/dashboard/staffattendance",
                pro: false,
            },
        ],
    },
    {
        icon: <PieChartIcon />,
        name: "Finance",
        subItems: [
            {
                name: "Expenses",
                path: "/dashboard/expenses",
                pro: false,
            },
            {
                name: "Expense Manager",
                path: "/dashboard/expensemanager",
                pro: false,
            },
        ],
    },
];

const fitnessItems: NavItem[] = [
    {
        icon: <BoxCubeIcon />,
        name: "Marketing",
        subItems: [
            {
                name: "Marketing Templates",
                path: "/dashboard/templates",
                pro: false,
            },
            {
                name: "Email Templates",
                path: "/dashboard/emailtemplates",
                pro: false,
            },
            {
                name: "Bulk Email",
                path: "/dashboard/bulkemail",
                pro: false,
            },
            {
                name: "Email History",
                path: "/dashboard/emailhistory",
                pro: false,
            },
            {
                name: "Reminders History",
                path: "/dashboard/reminders",
                pro: false,
            },
        ],
    },

    {
        icon: <PieChartIcon />,
        name: "Analytics",
        subItems: [
            {
                name: "Business Analysis",
                path: "/dashboard/analysis/business",
                pro: false,
            },
            {
                name: "Attendance Analysis",
                path: "/dashboard/analysis/attendance",
                pro: false,
            },
            {
                name: "Operator Analysis",
                path: "/dashboard/analysis/operator",
                pro: false,
            },
            {
                name: "Business Overview",
                path: "/dashboard/analysis/overview",
                pro: false,
            },
        ],
    },

    {
        icon: <TableIcon />,
        name: "Reports",
        subItems: [
            {
                name: "Billing Report",
                path: "/dashboard/reports/billing",
                pro: false,
            },
            {
                name: "Customer Sales",
                path: "/dashboard/reports/customer-sales",
                pro: false,
            },
            {
                name: "Package Sales",
                path: "/dashboard/reports/package-sales",
                pro: false,
            },
            {
                name: "Operator Sales",
                path: "/dashboard/reports/operator-sales",
                pro: false,
            },
            {
                name: "Day Wise Summary",
                path: "/dashboard/reports/day-summary",
                pro: false,
            },
        ],
    },

    {
        icon: <TableIcon />,
        name: "Settings",
        subItems: [
            {
                name: "Services",
                path: "/dashboard/services",
                pro: false,
            },
            {
                name: "Member Groups",
                path: "/dashboard/settings/groups",
                pro: false,
            },
            {
                name: "Auto Reminder",
                path: "/dashboard/settings/reminders",
                pro: false,
            },
            {
                name: "Invoice Settings",
                path: "/dashboard/settings/invoice",
                pro: false,
            },
            {
                name: "Biometric Setup",
                path: "/dashboard/settings/biometric",
                pro: false,
            },
            {
                name: "Operator Activity",
                path: "/dashboard/settings/operator-activity",
                pro: false,
            },
        ],
    },

    {
        icon: <PlugInIcon />,
        name: "Support",
        subItems: [
            {
                name: "Create Ticket",
                path: "/dashboard/support/create-ticket",
                pro: false,
            },
            {
                name: "Ticket List",
                path: "/dashboard/support/tickets",
                pro: false,
            },
        ],
    },

    {
        icon: <BoxCubeIcon />,
        name: "Logout",
        path: "/dashboard/logout",
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    useEffect(() => {
        let submenuMatched = false;
        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : fitnessItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType as "main" | "others",
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${
                                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? "text-brand-500 rotate-180"
                                            : ""
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? "menu-item-icon-active"
                                            : "menu-item-icon-inactive"
                                    }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 ml-9 space-y-1">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? "menu-dropdown-item-active"
                                                    : "menu-dropdown-item-inactive"
                                            }`}
                                        >
                                            {subItem.name}
                                            <span className="ml-auto flex items-center gap-1">
                                                {subItem.new && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge`}
                                                    >
                                                        new
                                                    </span>
                                                )}
                                                {subItem.pro && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge`}
                                                    >
                                                        pro
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
                isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"
            } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex py-8 ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
            >
                <Link to="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img
                                className="dark:hidden"
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <img
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    "Menu"
                                ) : (
                                    <HorizontaLDots className="size-6" />
                                )}
                            </h2>
                            {renderMenuItems(navItems, "main")}
                        </div>
                        <div className="">
                            <h2
                                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    "Others"
                                ) : (
                                    <HorizontaLDots />
                                )}
                            </h2>
                            {renderMenuItems(fitnessItems, "others")}
                        </div>
                    </div>
                </nav>
                {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
            </div>
        </aside>
    );
};

export default AppSidebar;
