import { Save } from "../../models/save.js";

export async function deleteSavePost(userId, postId) {
    const deletedSavePost = await Save.findOneAndDelete({ userId, postId });
    if (!deleteSavePost) {
        return { message: "Could not delete post" };
    }

    return deletedSavePost;
}
