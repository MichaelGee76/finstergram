import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Follow } from "../../models/follow.js";
import { Post } from "../../models/post.js";

export async function getInbox(authenticatedUserId) {
    const posts = await Post.find({ userId: authenticatedUserId });

    const postIds = posts.map((post) => post._id);

    const likes = await Like.find({
        postId: { $in: postIds },
        inboxSeen: false,
    })
        .populate({ path: "userId", select: " userName profilePicture" })
        .populate({ path: "postId", select: "postId picture" });

    const comments = await Comment.find({
        postId: { $in: postIds },
        inboxSeen: false,
    })
        .populate({ path: "userId", select: " userName profilePicture" })
        .populate({ path: "postId", select: "postId picture" });

    const follows = await Follow.find({
        followedId: authenticatedUserId,
        inboxSeen: false,
    }).populate({ path: "userId", select: " userName profilePicture" });

    // wir checken ob user is follwoing the followers
    for (const follow of follows) {
        const isFollowingBack = await Follow.exists({
            userId: authenticatedUserId,
            followedId: follow.userId,
        });
        //!! macht aus der Abfrge einen Boolean
        follow.isFollowingBack = !!isFollowingBack;
    }

    //alle items kombiniert in einem Array und  nach datum sortiert
    const boxArr = [
        ...comments.map((comment) => ({
            ...comment.toObject(),
            type: "comment",
        })),
        ...likes.map((like) => ({ ...like.toObject(), type: "like" })),
        ...follows.map((follow) => ({ ...follow.toObject(), type: "follow" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const latestElements = boxArr.slice(0, 15);
    return latestElements;
}
