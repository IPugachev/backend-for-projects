import { Router } from "express";
import {
    login,
    logout,
    register,
} from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { registerSchema } from "../schemas/auth.schema.ts";

const AuthRouter = Router();
AuthRouter.post(
    "/register",
    validate({ body: registerSchema }),
    register,
);

AuthRouter.post(
    "/login",
    validate({ body: registerSchema }),
    login,
);
AuthRouter.post("/logout", logout);

export default AuthRouter;
