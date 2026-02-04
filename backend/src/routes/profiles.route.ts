import { Router } from "express";
import { getProfiles, addProfile, updateProgress, addProgress } from "#controllers";
// import { validateBodyZod } from '#middlewares';
import { loginSchema, registerSchema } from "#schemas";

const profilesRouter = Router();

/**
 * Endpoint POST /member/add creates a new member progress document and
 * adds a reference of it to the current user "members".
 */
profilesRouter.post("/add", addProfile);

profilesRouter.get("/profiles", getProfiles);

// authRouter.post('/login', validateBodyZod(loginSchema), login);

// authRouter.post('/refresh', refresh);

// authRouter.delete('/logout', logout);

// profileRouter.post("progress", addProgress);

// profileRouter.get("/progress/:id", getProgress);

// profileRouter.put("/progress/:id", updateProgress);

export default profilesRouter;
