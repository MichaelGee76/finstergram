import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { Follow } from "../../models/follow.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";

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
            const likes = await Like.countDocuments({ postId: post._id });
            const comments = await Comment.find({ postId: post._id }).populate({
                path: "userId",
                select: "userName profilePicture",
            });
            const isSaved = await SavedPost.exists({
                userId: authenticatedUserId,
                postId: post._id,
            }); // Prüfe, ob der Beitrag gespeichert wurde

            return {
                ...post.toObject(),
                likes,
                comments,
                isSaved: !!isSaved, // Convert to boolean
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

    console.log(isFollowed);
    return {
        posts: postsWithDetails,
        userData,
        followingNumber: followingNumber.length, // Anzahl der folgenden Benutzer
        followedNumber: followedNumber.length, // Anzahl der Follower
        isFollowed: isFollowed,
    };
}
