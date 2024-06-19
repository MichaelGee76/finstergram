import { Follow } from "../../models/follow.js";

export async function deleteFollow(userId, followedId) {
    const existingFollow = await Follow.findOne({ userId, followedId });
    if (!existingFollow) {
        return { message: "follow don't exist" };
    }

    const follow = await Follow.findOneAndDelete({
        userId,
        followedId,
    });
    return follow;
}
