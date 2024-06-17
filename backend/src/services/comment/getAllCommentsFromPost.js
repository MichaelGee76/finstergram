import { User } from "../../models/user.js";
import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Post } from "../../models/post.js";

export async function getAllCommentsFromPost(
    commentId,
    authenticatedUserId,
    postId
) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("User not found");

    const comments = await Comment.find({ postId, commentId: null }).sort({
        createdAt: -1,
    });
    const commentArr = comments.map((comment) => comment);
}

// der Inder sagt so:

//
// Hauptkommentare (Kommentare ohne übergeordneten Kommentar) abrufen und nach Erstellungsdatum sortieren
// const comments = await Comment.find({ postId, commentId: null }).sort({ createdAt: -1 });

// // Benutzerinformationen und Likes für jeden Kommentar abrufen
// const commentArr = await Promise.all(comments.map(async (comment) => {
//     const populatedComment = await Comment.findById(comment._id).populate({
//         path: "userId",
//         select: "userName profilePicture"
//     }).exec();

//     const likes = await Like.find({ commentId: comment._id });

//     return {
//         ...populatedComment.toObject(),
//         likesCount: likes.length
//     };

/* const getReplies = async (commentId) => {
    const replies = await Comment.find({ commentId }).sort({ createdAt: -1 });
    return Promise.all(replies.map(async (reply) => {
        const nestedReplies = await getReplies(reply._id);
        return { ...reply.toObject(), replies: nestedReplies };
    }));
};

export const getAllCommentsFromPost = async (postId) => {
    const comments = await Comment.find({ postId, commentId: null }).sort({ createdAt: -1 });
    return Promise.all(comments.map(async (comment) => {
        const replies = await getReplies(comment._id);
        return { ...comment.toObject(), replies };
    }));
}; */
