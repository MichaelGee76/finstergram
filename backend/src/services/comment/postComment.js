import { Comment } from "../../models/comment.js";

export async function postComment(authenticatedUserId, commentData) {
    const newComment = await Comment({
        ...commentData,
        userId: authenticatedUserId,
    });
    if (!newComment) throw new Error("posting comment failed");

    return newComment;
}