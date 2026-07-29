import express from "express";
import AuthRouter from "./routes/auth.routes.ts";
import UserRouter from "./routes/user.routes.ts";

const app = express();

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

export default app;
