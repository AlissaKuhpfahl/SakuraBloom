import { Schema, model } from "mongoose";
import { required } from "zod/mini";

const tipSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    //
    minStars: { type: Number, default: 0 }, // ab wieviel Fortschritt
    moduleId: { type: String, default: null },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Tip = model("Tip", tipSchema);
export default Tip;
