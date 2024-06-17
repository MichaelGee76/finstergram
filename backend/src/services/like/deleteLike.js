import { Like } from "../../models/like.js";

export async function deleteLike(userId, postId, commentId) {
    const existingLike = await Like.findOne({ userId, postId, commentId });
    if (!existingLike) {
        throw new Error("Cannot like");
    }
    const deletedLike = await Like.findOneAndDelete(userId, postId, commentId);

    if (!deletedLike) {
        throw new Error("Cannot delete like  ");
    }

    return { message: "Like deleted" };
}
