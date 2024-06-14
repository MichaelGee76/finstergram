import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        commentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
    },
    { collection: "like", timestamps: true }
);
export const Like = mongoose.model("Like", likeSchema);
