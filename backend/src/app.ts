import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import packageRoutes from "./routes/package.routes";
import memberRoutes from "./routes/member.routes";
import iclockRoutes from "./routes/iclock.routes";
import serviceRoutes from "./routes/service.routes";
import leadRoutes from "./routes/lead.routes";
import storage from "./routes/storage.routes";
import settingsRoutes from "./routes/setting.routes";
import operatorRoutes from "./routes/operator.routes";
import staffRoutes from "./routes/staff.routes";
const app = express();
import path from "path";
import communicationRoutes from "./modules/communication";
import emailRoutes from "./routes/email.routes";
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://chuck-cozily-sublease.ngrok-free.dev",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// app.use(
//     cors({
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

app.use(
    express.json({
        limit: "50mb",
    })
);

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
        contentSecurityPolicy: false,

        crossOriginEmbedderPolicy: false,

        frameguard: false,
    })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Gym Management API Running",
    });
});

app.use("/uploads/invoices", express.static(path.join(process.cwd(), "uploads/invoices")));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/package", packageRoutes);
app.use("/api/v1/member", memberRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/lead", leadRoutes);
app.use("/api/v1/storage", storage);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/operator", operatorRoutes);

app.use("/iclock", iclockRoutes);

app.use("/api/communication", communicationRoutes);
app.use("/api/email", emailRoutes);

export default app;
