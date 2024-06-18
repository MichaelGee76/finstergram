import { Save } from "../../models/save.js";

export async function savePost(userId, postId) {
    const existingSavedPost = await Save.findOne({ userId, postId });
    if (existingSavedPost) {
        return { message: "Post already saved" };
    }
    const savedPost = await Save.create({ userId, postId });
    if (!savedPost) {
        throw new Error("Can't save post");
    }

    return savedPost;
}
