import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";

export async function deletePost(authenticatedUserId, postId) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("User dont exist");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post dont exist");
    if (post.userId.toString() !== user._id.toString()) {
        throw new Error("No permission to delete post");
    }
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
        throw new Error("Could not delete post");
    }
    return deletedPost;
}
