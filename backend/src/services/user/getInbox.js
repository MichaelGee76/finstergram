import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Follow } from "../../models/follow.js";
import { Post } from "../../models/post.js";

export async function getInbox(authenticatedUserId) {
  // Finde alle Posts des authentifizierten Users
  const posts = await Post.find({ userId: authenticatedUserId });
  const postIds = posts.map((post) => post._id);

  // Finde alle Likes zu den Posts des authentifizierten Users
  // ausgenommen die eigenen!
  const postlikes = await Like.find({
    postId: { $in: postIds },
    userId: { $ne: authenticatedUserId },
    commentId: { $exists: false },
  })
    .populate({ path: "userId", select: "userName profilePicture" })
    .populate({ path: "postId", select: "postId picture" });

  //Finde alle Likes zu den Kommentaren der Posts des authentifizierten Users
  const commentLikes = await Like.find({
    postId: { $in: postIds },
    userId: { $ne: authenticatedUserId },
    commentId: { $exists: true },
  })
    .populate({ path: "userId", select: "userName profilePicture" })
    .populate({ path: "postId", select: "postId picture" })
    .populate({ path: "commentId", select: "content" });

  // Finde alle Kommentare zu den Posts des authentifizierten Users
  const comments = await Comment.find({
    postId: { $in: postIds },
    userId: { $ne: authenticatedUserId },
  })
    .populate({ path: "userId", select: "userName profilePicture" })
    .populate({ path: "postId", select: "postId picture" });

  // Finde alle Follower, die den authentifizierten User gefolgt haben
  const follows = await Follow.find({
    followedId: authenticatedUserId,
  }).populate({
    path: "userId",
    select: "userName profilePicture profession",
  });

  // Prüfe, ob der authentifizierte User die Follower zurückfolgt
  const followsWithFollowingBackStatus = await Promise.all(
    follows.map(async (follow) => {
      const isFollowingBack = await Follow.exists({
        userId: authenticatedUserId,
        followedId: follow.userId._id,
      });
      return {
        ...follow.toObject(),
        isFollowed: !!isFollowingBack,
      };
    })
  );

  // Kombiniere alle Aktivitäten in einem Array und sortiere sie nach Datum
  const boxArr = [
    ...comments.map((comment) => ({
      ...comment.toObject(),
      type: "comment",
    })),
    ...postlikes.map((like) => ({
      ...like.toObject(),
      type: "postlikes",
    })),

    ...commentLikes.map((like) => ({
      ...like.toObject(),
      type: "commentLikes",
    })),

    ...followsWithFollowingBackStatus.map((follow) => ({
      ...follow,
      type: "follow",
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Gib die neuesten 15 Elemente zurück
  const latestElements = boxArr.slice(0, 15);
  return latestElements;
}
