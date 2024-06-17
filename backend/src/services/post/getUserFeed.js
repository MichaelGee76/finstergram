import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
import { Save } from "../../models/save.js";

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
    userId: { $in: [...followedIds, authenticatedUserId] },
  })
    .populate({
      path: "userId",
      select: "userName profilePicture profession",
    })
    .sort({ createdAt: -1 });

  if (!feed) {
    throw new Error("Oops, something went wrong. We could not load feed.");
  }
  // Freddys Ansatz

  // const postIds = feed.map((post) => post.toObject()._id);

  // const likes = await Like.find({
  //     postId: { $in: postIds },
  // }).map((like) => like.postId.toString());

  // Der Ansatz vom Inder
  // Die IDs der Posts extrahieren
  const postIds = feed.map((post) => post._id);

  // Likes für die Posts abrufen und die Anzahl der Likes zählen
  const likes = await Like.find({
    postId: { $in: postIds },
  });

  // Ein Objekt erstellen, das die Anzahl der Likes für jeden Post speichert
  const likeCounts = {};
  likes.forEach((like) => {
    likeCounts[like.postId] = (likeCounts[like.postId] || 0) + 1;
  });

  // Likes vom authentifizierten Benutzer für die Posts abrufen
  const userLikes = await Like.find({
    postId: { $in: postIds },
    userId: authenticatedUserId,
  }).select("postId");

  // Ein Set erstellen, das die IDs der Posts speichert, die vom Benutzer geliked wurden
  const userLikedPostIds = new Set(
    userLikes.map((like) => like.postId.toString())
  );

  // Comments für die Posts abrufen und die Anzahl der Comments zählen
  const comments = await Comment.find({
    postId: { $in: postIds },
  });

  // Ein Objekt erstellen, das die Anzahl der Comments für jeden Post speichert
  const commentCounts = {};
  comments.forEach((comment) => {
    commentCounts[comment.postId] = (commentCounts[comment.postId] || 0) + 1;
  });

  // Likes vom authentifizierten Benutzer für die Posts abrufen
  const userSaves = await Save.find({
    postId: { $in: postIds },
    userId: authenticatedUserId,
  }).select("postId");

  // Ein Set erstellen, das die IDs der Posts speichert, die vom Benutzer geliked wurden
  const userSavedPostIds = new Set(
    userSaves.map((save) => save.postId.toString())
  );

  // Die Anzahl der Likes und den "geliked"-Status zu den Posts hinzufügen
  const feedWithLikes = feed.map((post) => {
    const postObject = post.toObject();
    postObject.likes = likeCounts[postObject._id] || 0;
    postObject.comments = commentCounts[postObject._id] || 0;
    postObject.likedByUser = userLikedPostIds.has(postObject._id.toString());
    postObject.savedByUser = userSavedPostIds.has(postObject._id.toString());
    return postObject;
  });

  return feedWithLikes;
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
