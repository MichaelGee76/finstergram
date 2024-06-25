import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";

export async function postNewPost(
    authenticatedUserId,
    location,
    picture,
    description,
    hashtags
) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("User not found");
    if (!picture) throw new Error("Please provide image");

    // Überprüfen, ob ein identischer Post bereits existiert
    const existingPost = await Post.findOne({
        userId: authenticatedUserId,
        picture,
        description,
    });

    if (existingPost) {
        throw new Error("You cannot post the same post twice");
    }

    const newPost = await Post.create({
        userId: authenticatedUserId,
        location,
        picture,
        description,
        hashtags,
    });

    return newPost;
}
