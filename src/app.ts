import express from "express";
import AuthRouter from "./routes/auth.routes.ts";
import UserRouter from "./routes/user.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

const app = express();

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

// Обработка ошибок

app.use(errorHandler);

export default app;
