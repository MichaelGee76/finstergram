import { Like } from "../../models/like.js";

export async function deleteLike(userId, postId, commentId) {
    const existingLike = await Like.findOne({ userId, postId, commentId });
    if (!existingLike) {
        throw new Error("Cannot like");
    }
    // abfrage ob , commentId wenn ja dann 3 parameter übergeben
    const deletedLike = await Like.findOneAndDelete({ userId, postId });

    if (!deletedLike) {
        throw new Error("Cannot delete like  ");
    }

    return { message: "Like deleted" };
}
