import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { Follow } from "../../models/follow.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
import { Save } from "../../models/save.js"; // Hinzufügen des Save-Modells

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

    // ! alt ohne likes, comments und saved
    // const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    // if (!posts) {
    //     throw new Error("Oops, something went wrong. We could not load posts.");
    // }
    //! neu zum testen
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    if (!posts) {
        throw new Error("Oops, something went wrong. We could not load posts.");
    }

    // Füge Likes, Kommentare und ob der Beitrag gespeichert wurde zu den Posts hinzu
    const postsWithDetails = await Promise.all(
        posts.map(async (post) => {
            const postId = post._id;

            const likes = await Like.countDocuments({ postId });
            const comments = await Comment.find({ postId }).populate({
                path: "userId",
                select: "userName profilePicture",
            });

            // Prüfen, ob der Post vom authentifizierten Benutzer gespeichert wurde
            const isSaved = await Save.exists({
                userId: authenticatedUserId,
                postId,
            });

            // Prüfen, ob der Post vom authentifizierten Benutzer geliked wurde
            const isLiked = await Like.exists({
                userId: authenticatedUserId,
                postId,
            });

            return {
                ...post.toObject(),
                likes,
                comments: comments.length,
                isSaved, // Hinzufügen des isSaved-Status
                isLiked, // Hinzufügen des isLiked-Status
            };
        })
    );

    let isFollowed = false;

    if (userId !== authenticatedUserId) {
        const following = await Follow.findOne({
            userId: authenticatedUserId,
            followedId: userId,
        });
        isFollowed = !!following; // Convert to boolean
    }
    console.log(postsWithDetails);

    return {
        posts: postsWithDetails,
        userData,
        followingNumber: followingNumber.length, // Anzahl der folgenden Benutzer
        followedNumber: followedNumber.length, // Anzahl der Follower
        isFollowed: isFollowed,
    };
}
