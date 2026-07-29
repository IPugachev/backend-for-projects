import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/user.controller.ts";

const UserRouter = Router();

UserRouter.get("/", getUsers);
UserRouter.get("/:id", getUserById);
UserRouter.post("/", createUser);
UserRouter.patch("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
