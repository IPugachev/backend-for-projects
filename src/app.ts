import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import AuthRouter from "./routes/auth.routes.ts";
import UserRouter from "./routes/user.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
    `http://localhost:${process.env.FRONTEND_PORT}`,
    `http://10.8.1.4:${process.env.FRONTEND_PORT}`,
];
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(express.json());

const artificialDelay = (ms: number) => {
    return async (
        _req: Request,
        _res: Response,
        next: NextFunction,
    ) => {
        await new Promise((resolve) =>
            setTimeout(resolve, ms),
        );
        next();
    };
};

if (process.env.MODE === "dev") {
    app.use(artificialDelay(1000));
}
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

// Обработка ошибок

app.use(errorHandler);

export default app;
