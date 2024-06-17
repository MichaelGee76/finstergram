import { Like } from "../../models/like.js";

export async function postLike(userId, postId, commentId) {
    const existingLike = await Like.findOne({ userId, postId, commentId });
    if (existingLike) {
        return { message: "Already liked" };
    }
    const newLike = await Like.create({ userId, postId, commentId });
    if (!newLike) {
        throw new Error("Cannot like  ");
    }
    return newLike;
}
