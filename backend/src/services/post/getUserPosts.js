import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { Follow } from "../../models/follow.js";

export async function getUserPosts(userId) {
  const user = await User.findById(userId);
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    profession: user.profession,
    bio: user.bio,
    website: user.website,
  };
  // folge ich:
  const followingNumber = await Follow.find({ userId: userId });
  // folgen mir:
  const followedNumber = await Follow.find({ follwedId: userId });

  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  if (!feed) {
    throw new Error("Oops, something went wrong. We could not load posts.");
  }

  return {
    posts,
    userData,
    followingNumber,
    followedNumber,
  };
}
