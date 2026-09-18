import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { upload } from "../lib/multer/upload.ts";
import {
    changeAvatar,
    getProfile,
    updateProfile,
} from "../controllers/profile.controller.ts";
import { updateProfileSchema } from "../schemas/profile.schema.ts";
import { Router } from "express";

const ProfileRouter = Router();

ProfileRouter.get("/", authMiddleware, getProfile);
ProfileRouter.put(
    "/",
    authMiddleware,
    upload.single("avatar"),
    validate({ params: updateProfileSchema }),
    updateProfile,
);

ProfileRouter.put(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    changeAvatar,
);
export default ProfileRouter;
