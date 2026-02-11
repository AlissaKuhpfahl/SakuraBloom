import { Schema, model, Types } from "mongoose";

const stepSchema = new Schema(
  {
    lesson: {
      type: Types.ObjectId,
      ref: "Lesson",
      required: true
    },
    type: {
      type: String,
      enum: ["read", "example", "task", "tip", "check"],
      required: true
    },
    title: String,
    content: String,
    answers: [String],
    correctIndex: Number,
    order: Number
  },
  { timestamps: true }
);

export default model("Step", stepSchema);
