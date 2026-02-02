import { model, Schema } from "mongoose";
import { Types } from "mongoose";

const progressSchema = new Schema(
  {},
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Progress = model("Progress", progressSchema);

export default Progress;
