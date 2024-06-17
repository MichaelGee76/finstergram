import { Like } from "../../models/like.js";

export async function deleteLike(userId, postId, commentId) {
    const existingLike = await Like.findOne({ userId, postId, commentId });
    if (!existingLike) {
        throw new Error("Cannot like");
    }

    if (commentId) {
        const deletedComment = await Like.findOneAndDelete({
            userId,
            postId,
            userId,
        });
        if (!deletedComment) throw new Error("Could not delete comment");
        return { message: "CommentLike deleted" };
    }

    const deletedLike = await Like.findOneAndDelete({ userId, postId });

    if (!deletedLike) {
        throw new Error("Cannot delete like  ");
    }

    return { message: "PostLike deleted" };
}
