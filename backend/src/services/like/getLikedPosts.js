import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
import { Post } from "../../models/post.js";

export async function getLikedPosts(authenticatedUserId) {
  // Finde alle Likes des Benutzers für Posts (keine Kommentare)
  const likes = await Like.find({
    userId: authenticatedUserId,
    commentId: null,
  }).populate("postId");
  if (!likes) throw new Error("No likes found");

  // Extrahiere die Post-IDs aus den Likes
  const postIds = likes.map((like) => like.postId._id);

  // Finde die Posts basierend auf den Post-IDs
  const likedFeed = await Post.find({
    _id: { $in: postIds },
  })
    .populate({
      path: "userId",
      select: "userName profilePicture profession",
    })
    .sort({ createdAt: -1 });

  if (!likedFeed) {
    throw new Error("Oops, something went wrong. We could not load feed.");
  }

  // Likes für die Posts abrufen und die Anzahl der Likes zählen
  const allLikes = await Like.find({
    postId: { $in: postIds },
    commentId: null,
  });

  // Ein Objekt erstellen, das die Anzahl der Likes für jeden Post speichert
  const likeCounts = {};
  allLikes.forEach((like) => {
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

  // Die Anzahl der Likes und den "geliked"-Status zu den Posts hinzufügen
  const feedWithDetails = likedFeed.map((post) => {
    const postObject = post.toObject();
    postObject.likes = likeCounts[postObject._id] || 0;
    postObject.comments = commentCounts[postObject._id] || 0;
    postObject.likedByUser = userLikedPostIds.has(postObject._id.toString());
    return postObject;
  });

  return feedWithDetails;
}
