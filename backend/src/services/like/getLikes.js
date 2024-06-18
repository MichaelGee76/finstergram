import { Like } from "../../models/like.js";
import { User } from "../../models/user.js";

export async function getLikes(userId, postId, commentId) {
    const likes = await Like.find({ postId }).populate("userId", "userName");
    const likeCount = await Like.countDocuments({ postId });
    return { likes, likeCount };
}
