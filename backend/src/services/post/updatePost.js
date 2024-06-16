import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";

export async function updatePost(authenticatedUserId, contentToUpdate, postId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("user dont exist");

  const post = await Post.findById(postId);
  if (!post) throw new Error("post dont exist");

  if (post.userId.toString() !== user.userId.toString()) {
    throw new Error("No permission to update post");
  }

  const updatePost = await Post.findByIdAndUpdate(postId, contentToUpdate, {
    new: true,
  });
  if (!updatePost) {
    throw new Error("Could not update post");
  }
  return updatePost;
}
