import { User } from "../../models/user.js";
import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";

async function getCommentsWithReplies(commentId) {
    const comments = await Comment.find({ commentId })
        .sort({ createdAt: -1 })
        .populate({
            path: "userId",
            select: "userName profilePicture",
        })
        .exec();

    return Promise.all(
        comments.map(async (comment) => {
            const likes = await Like.find({ commentId: comment._id });
            const replies = await getCommentsWithReplies(comment._id);

            return {
                ...comment.toObject(),
                likesCount: likes.length,
                replies,
            };
        })
    );
}

export async function getAllCommentsFromPost(postId, authenticatedUserId) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("User not found");

    const comments = await Comment.find({ postId, commentId: null })
        .sort({ createdAt: -1 })
        .populate({
            path: "userId",
            select: "userName profilePicture",
        })
        .exec();

    const commentArr = await Promise.all(
        comments.map(async (comment) => {
            const likes = await Like.find({ commentId: comment._id });
            const replies = await getCommentsWithReplies(comment._id);

            return {
                ...comment.toObject(),
                likesCount: likes.length,
                replies,
            };
        })
    );

    return commentArr;
}
