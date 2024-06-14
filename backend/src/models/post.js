import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        commentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
        picture: { type: String, required: true },
        description: { type: String },
        hashtags: [{ type: String }],
    },
    { collection: "post", timestamps: true }
);
export const Post = mongoose.model("Post", postSchema);
