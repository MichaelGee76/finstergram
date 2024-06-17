import { Save } from "../../models/save.js";
export async function getSavedPosts(userId) {
    const savedPosts = await Save.find({ userId }).populate({
        path: "postId",
        select: "userId location picture description hashtags",
    });
    if (!savedPosts) {
        throw new Error("No saved post");
    }

    return savedPosts;
}
