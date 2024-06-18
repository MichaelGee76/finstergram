import { User } from "../../models/user.js";

export async function showAllUsers(authenticatedUserId) {
    // username _id profession profilePicture, isFollowed true oder false
    const user = await User.find({}, "userName _id profession profilePicture");
    if (!user) {
        throw new Error("user not found");
    }
}
