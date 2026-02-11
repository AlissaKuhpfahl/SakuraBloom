import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Profile, Tip } from "#models";
import { text } from "node:stream/consumers";

// function hashToIndex(seed: string, length: number){
//     let h =0;
//     for (let i = 0; i <seed.length; i++) h= (h *31 + seed.charCodeAt(i)) >>> 0;
//     return length === 0? 0 : h% length
// } // seed: datum von heute + profileId

//Progress zählen:
function starsFromProgress(progress: any[]): number {
  return Array.isArray(progress) ? progress.length : 0;
}

//// GET --> tips/ bonus/:profilId
export async function getBonusTip(req: Request, res: Response) {
  const { profileId } = req.params;

  // #1 ID prüfen
  if (!mongoose.isValidObjectId(profileId)) {
    return res.status(400).json({ message: "Invalid profile Id" });
  }

  // #2 Profil holen
  const profile = await Profile.findById(profileId).select("progress userId").lean();

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  // #3 Sicherstellen, dass User eingeloggt ist
  if (!req.user?.id) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (profile.userId.toString() !== req.user?.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // #4 Fortschritt zählen
  const stars = starsFromProgress(profile.progress);

  // #5 passende Tipps holen
  const tips = await Tip.find({
    active: true,
    minStars: { $lte: stars }
  })
    .select("title text")
    .lean();
  // #6 Fallback. falls keine Tipps existieren
  if (tips.length === 0) {
    return res.json({
      title: "Bonus-Tipp",
      text: "Teile dein Passwort niemals – auch nicht mit Freundinnen oder Freunden.",
      stars
    });
  }

  // #7 Tipp des Tages
  const index = new Date().getDate() % tips.length;
  const tip = tips[index];
  // #8 Antwort
  res.json({
    title: tip?.title,
    text: tip?.text,
    stars
  });
}
