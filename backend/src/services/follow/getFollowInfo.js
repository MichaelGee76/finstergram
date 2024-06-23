import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";

export const getFollowInfo = async (userId, authenticatedUserId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User with this id not found");

  const currentUserFollowings = await Follow.find({ userId: authenticatedUserId }).select("followedId");

  const currentUserFollowingIds = currentUserFollowings.map((follow) => follow.followedId.toString());

  const follower = await Follow.find({ followedId: userId }).populate({
    path: "userId",
    select: "_id userName profession profilePicture",
  });

  const FollowerWithFollowStatus = follower.map((follower) => ({
    ...follower.toObject(),
    isFollowed: currentUserFollowingIds.includes(follower.userId._id.toString()),
  }));

  const followed = await Follow.find({ userId: userId }).populate({
    path: "followedId",
    select: "_id userName profession profilePicture",
  });

  const FollowedWithFollowStatus = followed.map((follower) => ({
    ...follower.toObject(),
    isFollowed: currentUserFollowingIds.includes(follower.followedId._id.toString()),
  }));

  return {
    myFollower: FollowerWithFollowStatus,
    iAmFollowing: FollowedWithFollowStatus,
  };
};
