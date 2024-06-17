import { Save } from "../../models/save.js";

export async function savePost(userId, post) {
    const existingSavedPost = await Save.findOne({ userId, post });
    if (existingSavedPost) {
        return { message: "Post already saved" };
    }
    const savedPost = await Save.create({ userId, post });
    if (!savedPost) {
        throw new Error("Can't save post");
    }

    return savedPost;
}
