import { Router } from "express";
import { test } from "../controllers/auth.controller.ts";

const AuthRouter = Router();

AuthRouter.get("/test", test);

export default AuthRouter;
