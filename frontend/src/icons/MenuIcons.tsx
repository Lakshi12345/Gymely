import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHouse,
    faUsers,
    faUserTie,
    faUserCheck,
    faMoneyBill,
    faCreditCard,
    faDumbbell,
    faClipboardCheck,
    faUtensils,
    faCalendarDays,
    faChartLine,
    faChartPie,
    faBell,
    faMessage,
    faComments,
    faBullhorn,
    faBoxesStacked,
    faBox,
    faStore,
    faCartShopping,
    faBuilding,
    faLocationDot,
    faFingerprint,
    faDoorOpen,
    faShieldHalved,
    faUserShield,
    faKey,
    faGear,
    faSliders,
    faMobileScreen,
    faGlobe,
    faPlug,
    faRobot,
    faFileInvoiceDollar,
    faReceipt,
    faPercent,
    faTags,
    faWallet,
    faCoins,
    faChartColumn,
    faDatabase,
    faCloudArrowUp,
    faClockRotateLeft,
    faCircleQuestion,
    faHeadset,
    faFileLines,
    faEnvelope,
    faCalendarCheck,
    faAddressBook,
    faUsersGear,
    faArrowTrendUp,
    faListCheck,
    faNotesMedical,
    faHeartbeat,
    faPersonRunning,
    faWeightScale,
    faImages,
    faVideo,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export const MenuIcons = {

    // Dashboard
    dashboard: <FontAwesomeIcon icon={faHouse} />,

    // Members
    members: <FontAwesomeIcon icon={faUsers} />,
    memberProfile: <FontAwesomeIcon icon={faIdCard} />,
    attendance: <FontAwesomeIcon icon={faClipboardCheck} />,
    checkIn: <FontAwesomeIcon icon={faUserCheck} />,

    // Staff & Trainer
    trainers: <FontAwesomeIcon icon={faUserTie} />,
    staff: <FontAwesomeIcon icon={faUsersGear} />,

    // Plans & Billing
    packages: <FontAwesomeIcon icon={faTags} />,
    plans: <FontAwesomeIcon icon={faListCheck} />,
    billing: <FontAwesomeIcon icon={faMoneyBill} />,
    payments: <FontAwesomeIcon icon={faCreditCard} />,
    invoices: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    expenses: <FontAwesomeIcon icon={faReceipt} />,
    payroll: <FontAwesomeIcon icon={faWallet} />,
    subscription: <FontAwesomeIcon icon={faCoins} />,
    coupons: <FontAwesomeIcon icon={faPercent} />,

    // Workout & Diet
    workout: <FontAwesomeIcon icon={faDumbbell} />,
    exercises: <FontAwesomeIcon icon={faPersonRunning} />,
    diet: <FontAwesomeIcon icon={faUtensils} />,
    bmi: <FontAwesomeIcon icon={faWeightScale} />,
    health: <FontAwesomeIcon icon={faHeartbeat} />,
    medical: <FontAwesomeIcon icon={faNotesMedical} />,

    // CRM & Leads
    enquiries: <FontAwesomeIcon icon={faAddressBook} />,
    crm: <FontAwesomeIcon icon={faComments} />,
    reminders: <FontAwesomeIcon icon={faBell} />,
    whatsapp: <FontAwesomeIcon icon={faMessage} />,
    sms: <FontAwesomeIcon icon={faEnvelope} />,

    // Reports
    reports: <FontAwesomeIcon icon={faChartLine} />,
    analytics: <FontAwesomeIcon icon={faChartPie} />,
    growth: <FontAwesomeIcon icon={faArrowTrendUp} />,
    statistics: <FontAwesomeIcon icon={faChartColumn} />,

    // Inventory / POS
    inventory: <FontAwesomeIcon icon={faBoxesStacked} />,
    products: <FontAwesomeIcon icon={faBox} />,
    pos: <FontAwesomeIcon icon={faCartShopping} />,
    store: <FontAwesomeIcon icon={faStore} />,

    // Branch & Access
    branches: <FontAwesomeIcon icon={faBuilding} />,
    location: <FontAwesomeIcon icon={faLocationDot} />,
    biometric: <FontAwesomeIcon icon={faFingerprint} />,
    accessControl: <FontAwesomeIcon icon={faDoorOpen} />,

    // Media
    gallery: <FontAwesomeIcon icon={faImages} />,
    videos: <FontAwesomeIcon icon={faVideo} />,

    // Settings
    settings: <FontAwesomeIcon icon={faGear} />,
    setup: <FontAwesomeIcon icon={faSliders} />,
    roles: <FontAwesomeIcon icon={faUserShield} />,
    permissions: <FontAwesomeIcon icon={faShieldHalved} />,
    security: <FontAwesomeIcon icon={faKey} />,

    // Platform
    website: <FontAwesomeIcon icon={faGlobe} />,
    mobileApp: <FontAwesomeIcon icon={faMobileScreen} />,
    integrations: <FontAwesomeIcon icon={faPlug} />,
    ai: <FontAwesomeIcon icon={faRobot} />,

    // System
    logs: <FontAwesomeIcon icon={faFileLines} />,
    backup: <FontAwesomeIcon icon={faCloudArrowUp} />,
    history: <FontAwesomeIcon icon={faClockRotateLeft} />,
    support: <FontAwesomeIcon icon={faHeadset} />,
    help: <FontAwesomeIcon icon={faCircleQuestion} />,
};