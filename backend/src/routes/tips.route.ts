import { Router } from "express";
import { getBonusTip } from "#controllers";
import { authenticate } from "#middlewares";

const tipsRouter = Router();

tipsRouter.get("/bonus/:profileId", authenticate, getBonusTip);
export default tipsRouter;
