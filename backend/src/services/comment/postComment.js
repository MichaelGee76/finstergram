import { Comment } from "../../models/comment.js";

export async function postComment(authenticatedUserId, commentData) {
    // Überprüfen, ob ein identischer Kommentar bereits existiert
    const existingComment = await Comment.findOne({
        userId: authenticatedUserId,
        content: commentData.content,
        postId: commentData.postId,
    });

    if (existingComment) {
        throw new Error("You cannot post the same content twice.");
    }

    // Wenn kein Duplikat gefunden wurde, erstellen wir den neuen Kommentar
    const newComment = await Comment.create({
        ...commentData,
        userId: authenticatedUserId,
    });

    if (!newComment) throw new Error("Posting comment failed");

    return newComment;
}
