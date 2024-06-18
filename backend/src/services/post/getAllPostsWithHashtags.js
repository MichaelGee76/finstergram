import { Post } from "../../models/post.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
import { Save } from "../../models/save.js";

export async function getAllPostsWithHashtags(hashtag) {
    const posts = await Post.find({ hashtag: hashtag })
        .populate("userId", "username profilePicture profession")
        .sort({ createdAt: -1 });

    const postIds = posts.map((post) => post._id);

    // Likes für die Posts abrufen und die Anzahl der Likes zählen
    const likes = await Like.find({
        postId: { $in: postIds },
        commentId: null,
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
        commentCounts[comment.postId] =
            (commentCounts[comment.postId] || 0) + 1;
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
    const feedWithLikes = posts.map((post) => {
        const postObject = post.toObject();
        postObject.likes = likeCounts[postObject._id] || 0;
        postObject.comments = commentCounts[postObject._id] || 0;
        postObject.likedByUser = userLikedPostIds.has(
            postObject._id.toString()
        );
        postObject.savedByUser = userSavedPostIds.has(
            postObject._id.toString()
        );
        return postObject;
    });

    return feedWithLikes;
}
