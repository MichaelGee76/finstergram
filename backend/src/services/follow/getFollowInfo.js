import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";

export const getFollowInfo = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User with this id not found");

  const follower = await Follow.find({ followedId: authenticatedUserId });
  const followed = await Follow.find({ userId: authenticatedUserId });

  return { myFollower: follower, iAmFollowing: followed };
};
