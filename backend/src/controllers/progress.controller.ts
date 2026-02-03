import { Progress, User, RefreshToken } from "#models";
import type { RequestHandler, Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "#config";
import bcrypt from "bcrypt";
import { decode } from "node:punycode";

export async function getProgress(req: Request, res: Response) {
  const { id: memberId } = req.params;

  if (!mongoose.isValidObjectId(memberId)) {
    res.status(400).json({ error: "Not a valid member id" });
    return;
  }

  console.log(req.cookies);
  res.json({ message: `Hello ${req.params.id} memberId:${memberId}` });
}

export async function addProgress(req: Request, res: Response) {
  const { userId, memberName, progress } = req.body;
}

/**
 * Endpoint POST /member/add first creates a new Progress document in collection Progresses.
 * Then the current active user's key "member" is added by a new field with the given new
 * member name and a reference ("Progress") to the new created progress document (ObjectId)
 * @param req
 * @param res
 */
export async function addMember(req: Request, res: Response, next: NextFunction) {
  const { userId, memberName } = req.body;

  if (!mongoose.isValidObjectId(userId)) throw new Error("Invalid id", { cause: 400 });

  const user = await User.findById(userId);

  if (!user) throw new Error("User Id not found", { cause: { status: 404 } });

  const member = new Progress({
    userId: userId,
    memberName: memberName,
    progress: { moduleId: "1", lectureId: "1", status: "****", date: new Date() }
  });

  await member.save();

  console.log("new member", member);

  user.members.push(member._id);

  await user.save();

  res.json(user);
}

export async function getMembers(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;

  console.log("members Cookies:", req.cookies);

  if (!accessToken)
    throw new Error("Access token is required", {
      cause: { status: 401 }
    });

  // try {
  const decoded = jwt.verify(accessToken, ACCESS_JWT_SECRET) as jwt.JwtPayload;
  console.log("members jwt:", decoded);
  if (!decoded.sub) throw new Error("Invalid access token", { cause: { status: 401 } });

  const user = await User.findById(decoded.sub);

  if (!user) throw new Error("User not found", { cause: { status: 404 } });

  const member = await user.populate({ path: "members" });
  console.log(member);
  res.status(200).json({ message: "Valid token", user });
  // } catch (error) {
  //   if (error instanceof jwt.TokenExpiredError) {
  //     return next(
  //       new Error("Expired access token", {
  //         cause: { status: 401, code: "ACCESS_TOKEN_EXPIRED" }
  //       })
  //     );
  //   }

  //   return next(new Error("Invalid access token", { cause: { status: 401 } }));
  // }
}

export async function updateProgress(req: Request, res: Response) {}

export async function deleteMember(req: Request, res: Response) {}
