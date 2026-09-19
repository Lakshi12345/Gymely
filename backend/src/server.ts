import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/db";

const PORT = Number(process.env.PORT) || 5000;

// Create HTTP server
const server = http.createServer(app);

// Socket.IO
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Start server
const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();