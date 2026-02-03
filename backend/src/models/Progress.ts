import { model, Schema } from "mongoose";
import { Types } from "mongoose";
import { required } from "zod/mini";

const progress = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: [true, "User Id is required"] },
    memberName: { type: String, required: [true, "Member name is required"] },
    progress: [
      {
        _id: false,
        moduleId: { type: String, default: "1" },
        lectureId: { type: String, default: "1.1" },
        status: { type: String, default: "*" },
        date: { type: Date }
      }
    ]
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Progress = model("Progress", progress);

export default Progress;
