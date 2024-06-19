import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { Follow } from "../../models/follow.js";

export async function getUserPosts(userId) {
  const user = await User.findById(userId);
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    userName: user.userName,
    profession: user.profession,
    userBio: user.userBio,
    website: user.website,
    birthday: user.birthday,
    phone: user.phone,
    gender: user.gender,
  };
  // folge ich:
  const followingNumber = await Follow.find({ userId });
  // folgen mir:
  const followedNumber = await Follow.find({ followedId: userId });

  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  if (!posts) {
    throw new Error("Oops, something went wrong. We could not load posts.");
  }

  return {
    posts,
    userData,
    followingNumber,
    followedNumber,
  };
}
