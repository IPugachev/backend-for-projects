import { Router } from "express";
import {
    createUser,
    deleteUser,
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

const UserRouter = Router();

UserRouter.get("/", getUsers);
UserRouter.get(
    "/:id",
    validate({ params: userIdSchema }),
    getUserById,
);
UserRouter.post(
    "/",
    validate({ body: createUserSchema }),
    createUser,
);
UserRouter.patch(
    "/:id",
    validate({
        body: updateUserSchema,
        params: userIdSchema,
    }),
    updateUser,
);
UserRouter.delete(
    "/:id",
    validate({ params: userIdSchema }),
    deleteUser,
);

export default UserRouter;
