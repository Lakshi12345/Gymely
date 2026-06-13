import crypto from "crypto";

global.crypto = crypto as any;

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
export const io =
    new Server(

        server,

        {

            cors: {

                origin:
                    "http://localhost:5173",

                methods:
                    ["GET", "POST"]

            }

        }

    );

server.listen(

    PORT,

    () => {

        console.log(

            `Server running on ${PORT}`

        );

    }

);
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();