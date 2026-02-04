import { Router } from "express";
import { getProfiles, addProfile, getProgress, updateProgress, addProgress } from "#controllers";
import { validateBodyZod, authenticate } from "#middlewares";
import { loginSchema, registerSchema } from "#schemas";

const profilesRouter = Router();

profilesRouter.post("/add", authenticate, addProfile);

profilesRouter.get("/", authenticate, getProfiles);

profilesRouter.get("/progress/:id", authenticate, getProgress);

export default profilesRouter;
