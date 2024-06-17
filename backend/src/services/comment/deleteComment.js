import { Comment } from "../../models/comment.js";
import { User } from "../../models/user.js";

export async function deleteComment(commentId, authenticatedUserId) {
    const foundCommentToDelete = await Comment.findById(commentId);
    const user = await User.findById(authenticatedUserId);
    if (!user || !foundCommentToDelete) {
        throw new Error("Could not delete comment");
    }

    // so wie oben wie oben, oder so?
    // if (!foundCommentToDelete) {
    //     throw new Error("Comment not found");
    // }

    if (
        authenticatedUserId.toString() !==
        foundCommentToDelete.userId.toString()
    ) {
        throw new Error("No permission to delete comment");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
        throw new Error("Could not delete comment");
    }
    return deletedComment;
}
