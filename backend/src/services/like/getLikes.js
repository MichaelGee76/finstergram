import { Save } from "../../models/save.js";
export async function getLikes(userId) {
    const savedLikes = await Save.find({ userId }).populate({
        path: "postId",
        select: "userId location picture description hashtags",
    });
    if (!savedLikes) {
        throw new Error("No saved post");
    }

    return savedLikes;
}
