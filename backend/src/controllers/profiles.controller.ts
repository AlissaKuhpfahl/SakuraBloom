import { Profile, User } from "#models";
import type { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "#config";

/**
 *
 * @param req
 * @param res
 */
export async function getProgress(req: Request, res: Response, next: NextFunction) {
  const { id: profileId } = req.params;

  if (!mongoose.isValidObjectId(profileId)) throw new Error("Invalid id", { cause: 400 });

  const profile = await Profile.findById(profileId).select("progress userId").lean();

  if (!profile) throw new Error("Profile id not found", { cause: 404 });

  const { userId, progress } = profile;

  /*
  Ensure caller is authenticated. Should be because middlware "authenticate" 
  catches that before. Also satisfies typescript needs
  */
  if (!req.user?.id) throw new Error("Authorization error", { cause: 401 });

  if (userId.toString() !== req.user.id) throw new Error("Forbidden", { cause: { status: 403 } });

  // The same as?:
  // if (userId.toString() !== req.user.id) {
  //   return next(new Error("Forbidden", { cause: { status: 403 } }));
  // }
  res.json({ profileId, progress: progress });
}

export async function addProgress(req: Request, res: Response) {
  const { userId, profileName, progress } = req.body;
}

/**
 * Endpoint POST /profiles/add allows to append a new profile to a registered user's account.
 * @param req
 * @param res
 * @param next
 */
export async function addProfile(req: Request, res: Response, next: NextFunction) {
  const { profileName } = req.body;

  /*
  Ensure caller is authenticated. Should be because middlware "authenticate" 
  catches that before. Also satisfies typescript needs
  */
  if (!req.user?.id) throw new Error("Authorization error", { cause: 401 });

  const userId = req.user.id;

  console.log("Add profile for logged in user:", userId);

  if (!mongoose.isValidObjectId(userId)) throw new Error("Invalid id", { cause: 400 });

  const user = await User.findById(userId);

  if (!user) throw new Error("User Id not found", { cause: { status: 404 } });

  const profile = new Profile({
    userId: userId,
    profileName: profileName,
    progress: { moduleId: "1", lectureId: "1", status: "****", date: new Date() }
  });

  await profile.save();

  console.log("new profile", profile);

  user.profiles.push(profile._id);

  await user.save();

  res.status(200).json({ message: "Profile added" });
}

/**
 * Get all profiles of logged in user in short form
 * @param req
 * @param res
 * @param next
 */
export async function getProfiles(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const profiles = await Profile.find({ userId: req.user?.id }).lean();

  const response = profiles.map(profile => {
    const { _id, progress, __v, createdAt, userId, ...rest } = profile;

    return { id: _id, ...rest };
  });

  res.json(response);
}

export async function updateProgress(req: Request, res: Response) {}

export async function deleteProfile(req: Request, res: Response) {}
