import { Like } from "../../models/like.js";

export async function getLikedPosts(userId) {
  const likes = await Like.find({ userId, commentId: null }).populate("postId");
  if (!likes) throw new Error(" No likes found");

  const likedPosts = likes.map((singleLike) => singleLike.postId);
  if (!likedPosts) throw new Error("No liked posts found yet");

  return likedPosts;
}
