import { Post } from "../../models/post.js";

export async function getUserPosts(authenticatedUserId) {
  const posts = await Post.find({ authenticatedUserId })
    .populate({
      path: "userId",
      select: "firstName lastName profilePicture bio website",
    })
    .sort({ createdAt: -1 });
  if (!feed) {
    throw new Error("Oops, something went wrong. We could not load posts.");
  }

  return posts;
}
