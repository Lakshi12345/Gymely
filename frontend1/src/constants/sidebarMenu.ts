export const sidebarMenu = [
    {
        title: "Dashboard",
        path: "/dashboard",
    },

    {
        title: "Members",
        children: [
            {
                title: "Add Member",
                path: "/memberadd",
            },
            {
                title: "Member List",
                path: "/MemberAll",
            },
            {
                title: "Expired Members",
                path: "/members/expired",
            },
        ],
    },{
        title: "Packages",
        children: [
            {
                title: "Add Package",
                path: "/packageAdd",
            },
            {
                title: "Packages List",
                path: "/packageAll",
            },
        ],
    },

    {
        title: "Attendance",
        children: [
            {
                title: "Attendance Logs",
                path: "/attendance",
            },
            {
                title: "Live Attendance",
                path: "/attendance/live",
            },
        ],
    },

    {
        title: "Payments",
        children: [
            {
                title: "Collect Payment",
                path: "/payments/add",
            },
            {
                title: "Payment History",
                path: "/payments",
            },
            {
                title: "Due Payments",
                path: "/payments/due",
            },
        ],
    },

    {
        title: "Workout",
        children: [
            {
                title: "Workout Plans",
                path: "/workouts",
            },
        ],
    },

    {
        title: "Diet",
        children: [
            {
                title: "Diet Plans",
                path: "/diets",
            },
        ],
    },
    {
        title: "Analysis",
        children: [
            {
                title: "Business Analysis",
                path: "/analysis/business",
            },
            {
                title: "Operator Analysis",
                path: "/analysis/operator",
            },
        ],
    },
    {
        title: "Reports",
        children: [
            {
                title: "Revenue Report",
                path: "/reports/revenue",
            },
            {
                title: "Attendance Report",
                path: "/reports/attendance",
            },
        ],
    },

    {
        title: "Settings",
        path: "/settings",
    },
];