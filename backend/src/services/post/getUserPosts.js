import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { Follow } from "../../models/follow.js";

export async function getUserPosts(userId, authenticatedUserId) {
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
  // alter code nur die länge const followingNumber = await Follow.countDocuments({ userId });
  const followingNumber = await Follow.find({ userId });
  // folgen mir:
  // alter code const followedNumber = await Follow.countDocuments({ followedId: userId });
  const followedNumber = await Follow.find({ followedId: userId });

  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  if (!posts) {
    throw new Error("Oops, something went wrong. We could not load posts.");
  }

  let isFollowed = false;

  // if (userId !== authenticatedUserId) {
  //   const following = await Follow.find({
  //     userId: authenticatedUserId,
  //     followedId: userId,
  //   });
  //   isFollowed = following ? true : false;
  //   return isFollowed;
  // }

  if (userId !== authenticatedUserId) {
    const following = await Follow.findOne({
      userId: authenticatedUserId,
      followedId: userId,
    });
    isFollowed = !!following; // Convert to boolean
  }

  console.log(isFollowed);
  return {
    posts,
    userData,
    followingNumber: followingNumber.length,
    followedNumber: followedNumber.length,
    isFollowed: isFollowed,
  };
}
