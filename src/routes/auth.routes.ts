import { Router } from "express";
import {
    login,
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

export default AuthRouter;
