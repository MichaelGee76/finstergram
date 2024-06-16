import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    location: { type: String },

    picture: { type: String, required: true },
    description: { type: String },
    hashtags: [{ type: String }],
  },
  { collection: "post", timestamps: true }
);
export const Post = mongoose.model("Post", postSchema);
