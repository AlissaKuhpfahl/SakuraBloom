import { Router } from "express";
import { getLessonByKey } from "#controllers";
import { authenticate } from "#middlewares";

const lessonRouter = Router();

// GET /lessons/online/2
lessonRouter.get("/:moduleKey/:lessonId", authenticate, getLessonByKey);

export default lessonRouter;
