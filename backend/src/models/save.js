import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "save", timestamps: true }
);
export const Save = mongoose.model("Save", saveSchema);
