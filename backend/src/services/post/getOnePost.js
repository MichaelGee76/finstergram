import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
import { Save } from "../../models/save.js";

async function getCommentsWithReplies(commentId, authenticatedUserId) {
  const comments = await Comment.find({ commentId })
    .sort({ createdAt: -1 })
    .populate({
      path: "userId",
      select: "userName profilePicture",
    })
    .exec();

  return Promise.all(
    comments.map(async (comment) => {
      const likes = await Like.find({ commentId: comment._id });
      const likedByUser = likes.some(
        (like) => like.userId.toString() === authenticatedUserId.toString()
      );
      const replies = await getCommentsWithReplies(
        comment._id,
        authenticatedUserId
      );

      return {
        ...comment.toObject(),
        likesCount: likes.length,
        likedByUser,
        replies,
      };
    })
  );
}

async function getAllCommentsFromPost(postId, authenticatedUserId) {
  const comments = await Comment.find({ postId, commentId: null })
    .sort({ createdAt: -1 })
    .populate({
      path: "userId",
      select: "userName profilePicture profession",
    })
    .exec();

  const commentArr = await Promise.all(
    comments.map(async (comment) => {
      const likes = await Like.find({ commentId: comment._id });
      const likedByUser = likes.some(
        (like) => like.userId.toString() === authenticatedUserId.toString()
      );
      const replies = await getCommentsWithReplies(
        comment._id,
        authenticatedUserId
      );

      return {
        ...comment.toObject(),
        likesCount: likes.length,
        likedByUser,
        replies,
      };
    })
  );

  return commentArr;
}

export async function getOnePost(authenticatedUserId, postId) {
  // Find the post by ID
  const post = await Post.findById(postId).populate({
    path: "userId",
    select: "userName profilePicture profession",
  });
  if (!post) throw new Error("Post not found");

  // Get likes for the post and count the number of likes
  const likes = await Like.find({
    postId: postId,
    commentId: null,
  });

  const likeCount = likes.length;

  // Get likes from the authenticated user for the post
  const userLikes = await Like.findOne({
    postId: postId,
    commentId: null,
    userId: authenticatedUserId,
  });

  const likedByUser = !!userLikes;

  // Get all comments with replies for the post
  const comments = await getAllCommentsFromPost(postId, authenticatedUserId);

  // Get saves from the authenticated user for the post
  const userSave = await Save.findOne({
    postId: postId,
    userId: authenticatedUserId,
  });

  const savedByUser = !!userSave;

  // Construct the post details object
  const postDetails = {
    post: post.toObject(),
    likes: likeCount,
    comments: comments.length,
    likedByUser: likedByUser,
    savedByUser: savedByUser,
    commentDetails: comments,
  };

  return postDetails;
}
