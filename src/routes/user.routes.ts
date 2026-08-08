import { Router } from "express";
import {
    createUser,
    deleteUser,
    getMe,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/user.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
} from "../schemas/user.schema.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const UserRouter = Router();

UserRouter.get("/", authMiddleware, getUsers);
UserRouter.get("/me", authMiddleware, getMe);
UserRouter.get(
    "/:id",
    authMiddleware,
    validate({ params: userIdSchema }),
    getUserById,
);
UserRouter.post(
    "/",
    authMiddleware,
    validate({ body: createUserSchema }),
    createUser,
);

UserRouter.patch(
    "/:id",
    authMiddleware,
    validate({
        body: updateUserSchema,
        params: userIdSchema,
    }),
    updateUser,
);

UserRouter.patch(
    "/me/password",
    authMiddleware,
    validate({
        body: updateUserSchema,
        params: userIdSchema,
    }),
    updateUser,
);

UserRouter.delete(
    "/:id",
    authMiddleware,
    validate({ params: userIdSchema }),
    deleteUser,
);

export default UserRouter;
