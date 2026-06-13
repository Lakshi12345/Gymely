import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes    from "./routes/auth.routes";
import packageRoutes from "./routes/package.routes";
import memberRoutes from "./routes/member.routes";
import iclockRoutes from "./routes/iclock.routes";
import serviceRoutes from "./routes/service.routes";
const app = express();
import path from "path";
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);



app.use(

    helmet({

        crossOriginResourcePolicy: {

            policy:
                "cross-origin"

        },
        contentSecurityPolicy:
            false,

        crossOriginEmbedderPolicy:
            false,

        frameguard:
            false

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



app.use(
    "/uploads",
    express.static(
        path.join(
            process.cwd(),
            "uploads"
        )
    )
);

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/package",packageRoutes);
app.use("/api/v1/member",memberRoutes);
app.use("/api/v1/service",serviceRoutes);

app.use(
    "/iclock",
    iclockRoutes
);
export default app;