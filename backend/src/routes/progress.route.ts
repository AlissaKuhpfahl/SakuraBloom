import { Router } from "express";
import { getProgress, addMember, updateProgress, addProgress, getMembers } from "#controllers";
// import { validateBodyZod } from '#middlewares';
import { loginSchema, registerSchema } from "#schemas";

const progressRouter = Router();

/**
 * Endpoint POST /member/add creates a new member progress document and
 * adds a reference of it to the current user "members".
 */
progressRouter.post("/add", addMember);

progressRouter.get("/members", getMembers);

// authRouter.post('/login', validateBodyZod(loginSchema), login);

// authRouter.post('/refresh', refresh);

// authRouter.delete('/logout', logout);

progressRouter.post("progress", addProgress);

progressRouter.get("/progress/:id", getProgress);

progressRouter.put("/progress/:id", updateProgress);

export default progressRouter;
