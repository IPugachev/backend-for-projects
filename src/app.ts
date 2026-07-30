import express from "express";
import AuthRouter from "./routes/auth.routes.ts";
import UserRouter from "./routes/user.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import cors from "cors";

const app = express();

const allowedOrigins = [
    `http://localhost:${process.env.FRONTEND_PORT}`,
    `http://10.8.1.4:${process.env.FRONTEND_PORT}`,
];

app.use(
    cors({
        origin: allowedOrigins,
    }),
);

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

// Обработка ошибок

app.use(errorHandler);

export default app;
