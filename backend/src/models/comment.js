import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    commentId: { type: mongoose.Types.ObjectId, ref: "Comment" },

    content: { type: String, required: true, trim: true },
    inboxSeen: { type: Boolean, default: false },
  },
  { collection: "comment", timestamps: true }
);
export const Comment = mongoose.model("Comment", commentSchema);
