import { Router } from "express";
import { getProfiles, addProfile, getProgress, updateProgress } from "#controllers";
import { validateBodyZod, authenticate } from "#middlewares";
import { loginSchema, registerSchema } from "#schemas";

const profilesRouter = Router();

profilesRouter.post("/add", authenticate, addProfile);

profilesRouter.get("/", authenticate, getProfiles);

profilesRouter.get("/progress/:id", authenticate, getProgress);

profilesRouter.put("/progress/:id", authenticate, updateProgress);

export default profilesRouter;
