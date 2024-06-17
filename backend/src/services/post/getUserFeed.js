import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";

export async function getUserFeed(authenticatedUserId) {
  // Find the authenticated user
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  // Find all users followed by the authenticated user
  const followedUsers = await Follow.find({
    userId: authenticatedUserId,
  }).select("followedId");

  // Extract the followed user IDs
  // Die followedIds sind die Ids von den Leuten denen wir folgen
  const followedIds = followedUsers.map((follow) => follow.followedId);

  // Find posts from followed users
  //dekl feed und sagen, gehe in alle posts und gibt uns nur die post zurück vojn den leuten(id)
  // die wir in followedIDs gespeichert haben
  const feed = await Post.find({
    userId: { $in: followedIds, authenticatedUserId },
  })
    .populate({
      path: "userId",
      select: "firstName lastName profilePicture profession",
    })
    .sort({ createdAt: -1 });

  if (!feed) {
    throw new Error("Oops, something went wrong. We could not load feed.");
  }

  return feed;
}

// import { Follow } from "../../models/follow.js";
// import { User } from "../../models/user.js";

// export async function getUserFeed(authenticatedUserId) {
//   const user = await User.findById(authenticatedUserId);
//   if (!user) throw new Error("user not found");

//   const followedUser = await Follow.find({
//     followedId: authenticatedUserId,

//   });

// const user = await User.findById(authenticatedUserId);
// if (!user) throw new Error("User not found");

// const followmentsOfUser = await Followment.find({
//   followerId: authenticatedUserId, // [{ followerId: authenticatedUserId, followedId }]
// });
// const followedIds = followmentsOfUser.map((doc) => doc.toObject().followedId);

// const tweets = await Tweet.find({
//   userId: { $in: [...followedIds, authenticatedUserId] },
// })
//   .populate({
//     path: "userId",
//     select: "_id firstName lastName",
//   })
//   .sort({ createdAt: -1 });

//   export const getUserFeedFromFollowing = async (userId) => {
//     // Get the user and their following list
//     const user = await User.findById(userId).populate('following');
//     if (!user) throw new Error('User not found');

//     // Get posts from users that the current user follows
//     const followedUserIds = user.following.map(followedUser => followedUser._id);
//     return await Post.find({ userId: { $in: followedUserIds } }).sort({ createdAt: -1 });
// };
