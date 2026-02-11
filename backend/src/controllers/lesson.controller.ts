import type { Request, Response } from "express";
import { Lesson, Step, Module } from "#models";

export const getLessonByKey = async (req: Request, res: Response) => {
  try {
    const { moduleKey, lessonId } = req.params;

    // #1 Modul finden
    const module = await Module.findOne({ key: moduleKey });
    console.log("MODULE:", module);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // #2 Lesson finden
    const lesson = await Lesson.findOne({
      module: module._id,
      lessonId
    });
    console.log("LESSON:", lesson);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // #3 Steps holen
    const steps = await Step.find({ lesson: lesson._id }).sort({ order: 1 });

    //
    // #4 Alles zurückgeben
    res.json({
      module: {
        key: module.key,
        title: module.title
      },
      lesson: {
        lessonId: lesson.lessonId,
        title: lesson.title,
        subtitle: lesson.subtitle
      },
      steps
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
