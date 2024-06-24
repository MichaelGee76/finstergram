import { Follow } from "../../models/follow.js";

export async function postFollow(userId, followedId) {
    // Check if user tries to follow himself
    if (userId === followedId) {
        return { message: "You cannot follow yourself" };
    }

    const existingFollow = await Follow.findOne({ userId, followedId });
    if (existingFollow) {
        return { message: "follow already exist" };
    }

    const follow = await Follow.create({
        userId,
        followedId,
    });
    return follow;
}
