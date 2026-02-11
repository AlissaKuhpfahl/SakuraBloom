import { model, Schema } from "mongoose";
import { Types } from "mongoose";
import { required } from "zod/mini";

const profile = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: [true, "User Id is required"] },
    profileName: { type: String, required: [true, "Profile name is required"] },
    avatarUrl: { type: String, default: "default" },
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
    //     toJSON: {
    //   /* Transforms the returned result object into a POJO (Plain Old JavaScript Object) when send as JSON response */
    //   transform(_doc, ret: any) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.__v;
    //   }
    // }
  }
);

const Profile = model("Profile", profile);

export default Profile;
