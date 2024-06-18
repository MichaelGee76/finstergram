import { Comment } from "../../models/comment.js";
import { User } from "../../models/user.js";

export async function patchComment(
    authenticatedUserId,
    updatedContent,
    commentId
) {
    const user = await User.findById(authenticatedUserId);
    if (!user) {
        throw new Error("user don't exist");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error("Comment don't exist");
    }
    if (comment.userId.toString() !== user.userId.toString()) {
        throw new Error("No permission to update comment");
    }
    const updateComment = await Comment.findByIdAndUpdate(
        /*  postId, */
        commentId,
        updatedContent,
        {
            new: true,
        }
    );
    if (!updateComment) {
        throw new Error("Could not update comment");
    }
    return updateComment;
}
