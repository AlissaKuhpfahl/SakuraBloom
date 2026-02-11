import { Schema, model, Types } from "mongoose";

const lessonSchema = new Schema(
  {
    module: {
      type: Types.ObjectId,
      ref: "Module",
      required: true
    },
    lessonId: {
      type: String, // "1", "2"
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    locked: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number
    }
  },
  { timestamps: true }
);

export default model("Lesson", lessonSchema);
