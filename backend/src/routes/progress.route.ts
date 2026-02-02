import { Router } from "express";
import { getProgress } from "#controllers";
// import { validateBodyZod } from '#middlewares';
import { loginSchema, registerSchema } from "#schemas";

const progressRouter = Router();

// authRouter.post('/register', validateBodyZod(registerSchema), register);

// authRouter.post('/login', validateBodyZod(loginSchema), login);

// authRouter.post('/refresh', refresh);

// authRouter.delete('/logout', logout);

progressRouter.get("/:id", getProgress);

export default progressRouter;
