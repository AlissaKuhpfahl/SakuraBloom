import { Profile, User } from "#models";
import type { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "#config";

/**
 * Endpoint GET /profiles/progress/:id
 * @param req
 * @param res
 * @param next
 */
export async function getProgress(req: Request, res: Response, next: NextFunction) {
  const { id: profileId } = req.params;

  if (!mongoose.isValidObjectId(profileId))
    throw new Error("Invalid id", { cause: { status: 400 } });

  const profile = await Profile.findById(profileId).select("progress userId").lean();

  if (!profile) throw new Error("Profile id not found", { cause: { status: 404 } });

  const { userId, progress } = profile;

  /*
  Ensure caller is authenticated. Should be because middlware "authenticate" 
  catches that before. Also satisfies typescript needs
  */
  if (!req.user?.id) throw new Error("Authorization error", { cause: { status: 401 } });

  if (userId.toString() !== req.user.id) throw new Error("Forbidden", { cause: { status: 403 } });

  res.json({ profileId, progress: progress });
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
  if (!req.user?.id) throw new Error("Authorization error", { cause: { status: 401 } });

  const userId = req.user.id;

  console.log("Add profile for logged in user:", userId);

  if (!mongoose.isValidObjectId(userId)) throw new Error("Invalid id", { cause: { status: 400 } });

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
  if (!user.activeProfile) user.activeProfile = profile._id;

  await user.save();

  res.status(200).json({ message: "Profile added" });
}

/**
 * Endpoint GET /profiles: Get all profiles of logged in user in short form
 * @param req
 * @param res
 * @param next
 */
export async function getProfiles(req: Request, res: Response, next: NextFunction) {
  const profiles = await Profile.find({ userId: req.user?.id }).lean();

  const response = profiles.map(profile => {
    const { _id, progress, __v, createdAt, userId, ...rest } = profile;

    return { id: _id, ...rest };
  });

  res.json(response);
}

/**
 * Endpoint PUT "/profiles/progress/:id": Updates progress of a selected profile of logged in user
 * @param req
 * @param res
 * @param next
 */
export async function updateProgress(req: Request, res: Response, next: NextFunction) {
  const { id: profileId } = req.params;

  const {
    body: { progress }
  } = req;

  console.log("new Progress", progress);

  if (!mongoose.isValidObjectId(profileId))
    throw new Error("Invalid id", { cause: { status: 400 } });

  const profile = await Profile.findById(profileId).select("progress userId");

  if (!profile) throw new Error("Profile id not found", { cause: { status: 404 } });

  const { userId } = profile;

  /*
  Ensure caller is authenticated. Should be because middlware "authenticate" 
  catches that before. Also satisfies typescript needs
  */
  if (!req.user?.id) throw new Error("Authorization error", { cause: { status: 401 } });

  if (userId.toString() !== req.user.id) throw new Error("Forbidden", { cause: { status: 403 } });

  /* Update progress of profile */
  profile.progress = progress;

  try {
    await profile.save();
  } catch (error) {
    console.log("Catched error:", error);
    throw new Error("Saving new progress failed", { cause: { status: 500 } });
  }

  res.json({ message: "Progress updated" });
}

export async function deleteProfile(req: Request, res: Response) {}
