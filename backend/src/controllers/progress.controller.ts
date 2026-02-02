import { Progress } from "#models";
import type { RequestHandler, Response, Request } from "express";

export async function getProgress(req: Request, res: Response) {
  console.log(req.cookies);
  res.json({ message: `Hello ${req.params.id}` });
}
